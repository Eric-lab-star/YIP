"""PreToolUse hook: steer `grep -r` to `rg`.

CLAUDE.md asks for ripgrep, but the rule is easy to forget — especially after
`rg -r` misbehaves (that flag is --replace, not recursive). This turns the
written rule into an enforced one.

Only *recursive* greps are blocked. `ls | grep foo` and other pipeline uses are
fine and stay allowed.
"""
import json
import re
import sys

REASON = (
    "CLAUDE.md requires rg instead of grep -r. In this repo grep -r reads all "
    "101k files (~18s) while rg reads the 793 that are not gitignored (~0.06s). "
    "Recursion is rg's default -- just `rg pattern`. Note rg's -r is --replace, "
    "not recursive: `rg -rn pat` silently rewrites matches in the output."
)

# Wrappers that may precede the real command inside a segment.
SKIP = {"sudo", "nohup", "command", "time"}


def is_recursive_grep(segment: str) -> bool:
    toks = segment.strip().split()
    # step past wrappers and env-var assignments
    while toks and (toks[0] in SKIP or re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", toks[0])):
        toks.pop(0)
    if toks and toks[0] == "timeout":
        toks = toks[2:] if len(toks) > 2 else []
    if not toks or toks[0].split("/")[-1] not in {"grep", "egrep", "fgrep"}:
        return False
    for t in toks[1:]:
        if t == "--recursive" or t == "--dereference-recursive":
            return True
        # bundled short flags: -r, -rn, -In, -Rl ... any group containing r/R
        if re.fullmatch(r"-[a-zA-Z]*[rR][a-zA-Z]*", t):
            return True
        if not t.startswith("-"):
            break  # reached the pattern; flags are done
    return False


try:
    payload = json.load(sys.stdin)
except Exception:
    sys.exit(0)  # unparseable input is not this hook's problem

command = (payload.get("tool_input") or {}).get("command") or ""

if any(is_recursive_grep(seg) for seg in re.split(r"\|\||&&|[|;]", command)):
    json.dump(
        {
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": REASON,
            }
        },
        sys.stdout,
    )

sys.exit(0)
