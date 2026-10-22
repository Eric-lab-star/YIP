import json
from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[3]
HOOKS = [ROOT / directory / 'hooks/no-recursive-grep.py'
         for directory in ('.codex', '.claude')]


class SearchHookTests(unittest.TestCase):
    def check_commands(self, cases, shell='bash'):
        for hook in HOOKS:
            for command, expected in cases:
                with self.subTest(hook=hook.parent.parent.name, command=command):
                    result = subprocess.run([sys.executable, '-B', '-X', 'utf8', str(hook), '--shell', shell],
                        input=json.dumps({'tool_name': 'Bash', 'tool_input': {'command': command}}),
                        capture_output=True, text=True, timeout=5)
                    self.assertEqual(result.returncode, 0, result.stderr)
                    decision = json.loads(result.stdout).get('hookSpecificOutput', {}).get('permissionDecision') if result.stdout else None
                    self.assertEqual(decision == 'deny', expected)

    def test_executable_substitutions_are_checked(self):
        self.check_commands([
            ('echo "$(grep -r needle .)"', True),
            ('echo "prefix $(grep -r "two words" .) suffix"', True),
            ('echo "$(echo "$(grep -r needle .)")"', True),
            ('echo "$(printf ")"; grep -r needle .)"', True),
            ('echo "$( (grep -r needle .) )"', True),
            ('echo "$(rg needle .)"; grep -r needle .', True),
            ('echo "$(rg needle .)"', False),
            ("echo '$(grep -r needle .)'", False),
            ('echo "\\$(grep -r needle .)"', False),
            ('cat <<EOF\n$(grep -r needle .)\nEOF', True),
            ('cat <<EOF\n"$(grep -r needle .)"\nEOF', True),
            ("cat <<EOF\n'$(grep -r needle .)'\nEOF", True),
            ('cat <<-EOF\n\t$(grep -r needle .)\n\tEOF', True),
            ('cat <<EOF\ngrep -r needle .\nEOF', False),
            ('cat <<EOF\n\\$(grep -r needle .)\nEOF', False),
            ("cat <<'EOF'\n$(grep -r needle .)\nEOF", False),
            ('cat <<\\EOF\n$(grep -r needle .)\nEOF', False),
            ("cat <<E'OF'\n$(grep -r needle .)\nEOF", False),
            ('cat <<"EOF"\n$(grep -r needle .)\nEOF', False),
        ])

    def test_bash_escapes_and_backtick_substitutions(self):
        self.check_commands([
            ('echo "`grep -r needle .`"', True),
            ('echo `grep -r needle .`', True),
            ("echo '`grep -r needle .`'", False),
            (r'echo "\`grep -r needle .\`"', False),
            (r'echo \"; grep -r needle .; echo \"', True),
            (r"echo \'; grep -r needle .; echo \'", True),
            (r'echo "$(printf %s \"; grep -r needle .; printf %s \")"', True),
            ('cat <<EOF\n`grep -r needle .`\nEOF', True),
            ("cat <<'EOF'\n`grep -r needle .`\nEOF", False),
            ('cat <<EOF\n\\`grep -r needle .\\`\nEOF', False),
            (r'echo "`printf %s \"a; grep -r needle .\"`"', False),
            (r'echo `printf %s \"a; grep -r needle .; printf %s \"`', True),
            (r'echo "`printf %s \$(grep -r needle .)`"', True),
            (r'echo "`echo \`grep -r needle .\``"', True),
        ])

    def test_powershell_uses_backtick_not_backslash_as_escape(self):
        self.check_commands([
            ('Write-Output "\\$(grep -r needle .)"', True),
            ('Write-Output "`$(grep -r needle .)"', False),
            ('Write-Output "`grep -r needle .`n"', False),
            ('Write-Output `"; grep -r needle .; Write-Output `"', True),
            ('Write-Output "a ""$(grep -r needle .)"" b"', True),
            ('@"\n$(grep -r needle .)\n"@ | Write-Output', True),
            ("@'\n$(grep -r needle .)\n'@ | Write-Output", False),
            ("@'\nimport sys\ns = 'a; grep -r needle .'\n'@ | python -", False),
        ], shell='powershell')

    def test_shell_commands(self):
        cases = [
            ('cat <<< "text"\ngrep -r needle .', True),
            ('cat <<< "grep -r needle ."\nrg needle .', False),
            ("grep -e '' -r .", True),
            ('grep -e "" --recursive .', True),
            ("grep -e ''#pattern -r .", True),
            ('grep -d recurse needle .', True),
            ('grep -drecurse needle .', True),
            ('grep -ndrecurse needle .', True),
            ('grep --directories=recurse needle .', True),
            ('grep --directories recurse needle .', True),
            ('grep -d skip needle .', False),
            ('grep --directories=skip -e recurse file.txt', False),
            ('cat <<\\EOF\ngrep -r needle .\nEOF', False),
            ("cat <<'PY-END'\nliteral\nPY-END\ngrep -r needle .", True),
            ("cat <<'PY-END'\ngrep -r needle .\nPY-END", False),
            ('cat <<"END OF DATA"\ngrep -r needle .\nEND OF DATA', False),
            ('cat <<-EOF\n\tgrep -r needle .\n\tEOF\ngrep -r needle .', True),
            ('cat <<\\EOF\nliteral\nEOF\ngrep -r needle .', True),
            ('grep -rn needle .', True),
            ('grep --recursive needle .', True),
            ('grep --dereference-recursive needle .', True),
            ('grep needle -r .', True),
            ('grep -e needle -r .', True),
            ('grep -f patterns.txt -R .', True),
            ('grep --regexp needle --include=*.py -r .', True),
            ('env LC_ALL=C grep -r needle .', True),
            ('sudo -u someone grep -r needle .', True),
            ('timeout 5s grep -r needle .', True),
            ('pwd\ngrep -r needle .', True),
            ('git status && grep -R needle .', True),
            ('(grep -r needle .)', True),
            ('& "C:\\Tools\\grep.exe" -r needle .', True),
            ('if grep -r needle .; then echo yes; fi', True),
            ('grep -- -r file.txt', False),
            ('grep -e -r file.txt', False),
            ('grep -f -r file.txt', False),
            ('grep --regexp=-r file.txt', False),
            ('rg needle .', False),
            ('ls | grep needle', False),
            ('echo "grep -r needle ."', False),
            ('printf "a; grep -r needle ."', False),
            ("python -c 's = \"a; grep -r needle .\"'", False),
            ("cat <<'EOF'\ngrep -r needle .\nEOF", False),
            ('# grep -r needle .\nrg needle .', False),
        ]
        self.check_commands(cases)


if __name__ == '__main__':
    unittest.main(verbosity=2)
