"""PreToolUse guardrail for recursive grep; respects shell literals and options.

This recognizes ordinary Bash/PowerShell commands, not arbitrary code executed
by interpreters. Quoted scripts and here-documents are data, not shell commands.
"""
import json
import re
import sys

REASON = (
    "AGENTS.md requires rg for recursive searches because it honors .gitignore "
    "and skips dependencies, caches, and build output. "
    "Recursion is rg's default -- just `rg pattern`. Note rg's -r is --replace, "
    "not recursive: `rg -rn pat` silently rewrites matches in the output."
)


def heredoc_delimiter(command, start):
    """Read a complete heredoc word with shell quote removal."""
    i = start + 2
    strip_tabs = command[i:i + 1] == '-'
    i += int(strip_tabs)
    while command[i:i + 1] in (' ', '\t'):
        i += 1
    word, quote, started = [], None, False
    while i < len(command):
        char = command[i]
        if quote is None and (char.isspace() or char in ';|&()<>'):
            break
        started = True
        if char in ('"', "'") and quote in (None, char):
            quote = char if quote is None else None
        elif char == '\\' and quote != "'" and i + 1 < len(command):
            following = command[i + 1]
            if quote is None or following in '\\"$`\n':
                i += 1
                if following != '\n':
                    word.append(following)
            else:
                word.append(char)
        else:
            word.append(char)
        i += 1
    return (''.join(word), strip_tabs, i) if started and quote is None else None


def shell_segments(command):
    """Split only unquoted shell operators; keep embedded program text opaque."""
    tokens, word, heredocs = [], [], []
    word_started = False
    i = 0
    while i < len(command):
        char = command[i]
        if command[i:i + 2] in ("@'", '@"') and command[i + 2:i + 3] in ('\n', '\r'):
            quote = command[i + 1]
            end = re.search(r'(?m)^' + re.escape(quote + '@'), command[i + 2:])
            if end is None:
                break
            word.append('<here-string>')
            word_started = True
            i += 2 + end.end()
            continue
        if command.startswith('<<<', i):
            if word_started:
                tokens.append(''.join(word))
                word, word_started = [], False
            i += 3
            continue
        if command.startswith('<<', i):
            delimiter = heredoc_delimiter(command, i)
            if delimiter:
                heredocs.append(delimiter[:2])
                i = delimiter[2]
                continue
        if char in ('"', "'"):
            word_started = True
            quote = char
            i += 1
            while i < len(command):
                char = command[i]
                if char == quote:
                    i += 1
                    break
                if quote == '"' and char in ('\\', '`') and command[i + 1:i + 2] in ('"', '\\', '`'):
                    i += 1
                word.append(command[i])
                i += 1
            continue
        if char == '#' and not word_started:
            end = command.find('\n', i)
            i = end if end >= 0 else len(command)
            continue
        if char in ('\\', '`') and i + 1 < len(command) and command[i + 1] in ' \t\n;|&()':
            if command[i + 1] != '\n':
                word.append(command[i + 1])
                word_started = True
            i += 2
            continue
        if char.isspace() or char in ';|&()':
            if word_started:
                tokens.append(''.join(word))
                word = []
                word_started = False
            if char in '\n;|&()':
                if tokens:
                    yield tokens
                tokens = []
            i += 1
            if char == '\n' and heredocs:
                for delimiter, strip_tabs in heredocs:
                    while i < len(command):
                        end = command.find('\n', i)
                        end = len(command) if end < 0 else end
                        line = command[i:end].rstrip('\r')
                        i = min(end + 1, len(command))
                        if (line.lstrip('\t') if strip_tabs else line) == delimiter:
                            break
                heredocs = []
            continue
        word.append(char)
        word_started = True
        i += 1
    if word_started:
        tokens.append(''.join(word))
    if tokens:
        yield tokens


def executable_name(token):
    return token.replace('\\', '/').rsplit('/', 1)[-1].removesuffix('.exe')


def is_recursive_grep(tokens):
    tokens = list(tokens)
    wrappers = {'sudo', 'env', 'timeout', 'command', 'builtin', 'nohup', 'time', 'exec'}
    wrapper_values = {'-u', '--unset', '--user', '-g', '--group', '-C', '--chdir', '-s', '--signal', '-k', '--kill-after'}
    while tokens:
        name = executable_name(tokens[0])
        if re.match(r'^[A-Za-z_][A-Za-z0-9_]*=', tokens[0]) or name in {'if', 'then', 'do', 'while', 'until', '!'}:
            tokens.pop(0)
            continue
        if name not in wrappers:
            break
        tokens.pop(0)
        while tokens and tokens[0].startswith('-'):
            option = tokens.pop(0)
            if option == '--':
                break
            if option in wrapper_values and tokens:
                tokens.pop(0)
        if name == 'timeout' and tokens:
            tokens.pop(0)  # duration
    if not tokens or executable_name(tokens[0]) not in {'grep', 'egrep', 'fgrep'}:
        return False
    values = {'--regexp', '--file', '--max-count', '--after-context', '--before-context', '--context',
              '--binary-files', '--directories', '--devices', '--exclude', '--include',
              '--exclude-dir', '--exclude-from', '--label', '--group-separator'}
    value_for = None
    for token in tokens[1:]:
        if value_for:
            if value_for in {'d', '--directories'} and token == 'recurse':
                return True
            value_for = None
            continue
        if token == '--':
            break
        if token in {'--recursive', '--dereference-recursive'}:
            return True
        if token == '--directories=recurse':
            return True
        if token.startswith('--'):
            value_for = token if token in values else None
        elif token.startswith('-'):
            for offset, flag in enumerate(token[1:], 1):
                if flag in 'rR':
                    return True
                if flag in 'efmABCdD':
                    if flag == 'd' and token[offset + 1:] == 'recurse':
                        return True
                    value_for = flag if offset == len(token) - 1 else None
                    break
    return False


def main():
    try:
        payload = json.load(sys.stdin)
        command = (payload.get('tool_input') or {}).get('command') or ''
        if not isinstance(command, str):
            return
    except (ValueError, AttributeError):
        return
    if any(is_recursive_grep(tokens) for tokens in shell_segments(command)):
        json.dump({'hookSpecificOutput': {
            'hookEventName': 'PreToolUse', 'permissionDecision': 'deny',
            'permissionDecisionReason': REASON,
        }}, sys.stdout)


if __name__ == '__main__':
    main()
