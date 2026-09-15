import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import unittest

HOOK = Path(__file__).resolve().parents[1] / 'no-recursive-grep.py'


class SearchHookTests(unittest.TestCase):
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
            ("@'\nimport sys\ns = 'a; grep -r needle .'\n'@ | python -", False),
            ("cat <<'EOF'\ngrep -r needle .\nEOF", False),
            ('# grep -r needle .\nrg needle .', False),
        ]
        for command, expected in cases:
            with self.subTest(command=command):
                result = subprocess.run([sys.executable, '-X', 'utf8', str(HOOK)],
                    input=json.dumps({'tool_name': 'Bash', 'tool_input': {'command': command}}),
                    capture_output=True, text=True, timeout=5)
                self.assertEqual(result.returncode, 0, result.stderr)
                decision = json.loads(result.stdout).get('hookSpecificOutput', {}).get('permissionDecision') if result.stdout else None
                self.assertEqual(decision == 'deny', expected)


if __name__ == '__main__':
    unittest.main(verbosity=2)
