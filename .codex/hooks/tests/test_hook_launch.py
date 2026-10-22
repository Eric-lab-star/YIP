"""Exercise registered commands in a linked checkout, not just script paths."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[3]


@unittest.skipUnless(os.name == 'nt' and all(shutil.which(name) for name in ('git', 'bash', 'pwsh')),
                     'Windows, Git Bash, and PowerShell launch integration')
class HookLaunchTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temporary = tempfile.TemporaryDirectory(prefix='yip hook launch ')
        cls.fixture = Path(cls.temporary.name).resolve()
        cls.addClassCleanup(cls.clean_fixture)
        primary = cls.fixture / 'primary checkout'
        primary.mkdir()
        cls.checkout = cls.fixture / 'linked checkout'
        cls.run_process(['git', 'init', '-q', str(primary)])
        for relative in ['.codex/hooks.json', '.claude/settings.json',
                         '.codex/hooks/no-recursive-grep.py', '.codex/hooks/stray-dev-server.py',
                         '.claude/hooks/no-recursive-grep.py', '.claude/hooks/stray-dev-server.py']:
            target = primary / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / relative, target)
        cls.run_process(['git', '-C', str(primary), 'add', '.'])
        cls.run_process(['git', '-C', str(primary), '-c', 'user.name=Hook Test',
                         '-c', 'user.email=hook-test@example.invalid', 'commit', '-qm', 'Fixture'])
        cls.run_process(['git', '-C', str(primary), 'worktree', 'add', '-q', '--detach', str(cls.checkout)])
        # The primary checkout has a different hook revision. Running it is a bug.
        for directory in ('.codex', '.claude'):
            for script in ('no-recursive-grep.py', 'stray-dev-server.py'):
                (primary / directory / 'hooks' / script).write_text(
                    "raise SystemExit('Wrong checkout hook was launched')\n", encoding='utf-8')
        cls.cwd = cls.checkout / 'nested directory'
        cls.cwd.mkdir()

    @classmethod
    def clean_fixture(cls):
        assert cls.fixture.parent == Path(tempfile.gettempdir()).resolve()
        assert cls.fixture.name.startswith('yip hook launch ')
        cls.temporary.cleanup()

    @staticmethod
    def run_process(argv, **kwargs):
        return subprocess.run(argv, check=True, capture_output=True, text=True, timeout=25,
                              creationflags=subprocess.CREATE_NO_WINDOW, **kwargs)

    def check_manifest(self, manifest, shell, key, recursive_command):
        hooks = json.loads((self.checkout / manifest).read_text(encoding='utf-8'))['hooks']
        for event in ('PreToolUse', 'Stop'):
            command = hooks[event][0]['hooks'][0][key]
            argv = [shell, '-NoProfile', '-Command', command] if shell == 'pwsh' else [shell, '-c', command]
            cases = [('rg needle .', False), (recursive_command, True)] if event == 'PreToolUse' else [('', False)]
            for tool_command, denied in cases:
                with self.subTest(event=event, command=tool_command):
                    payload = {'hook_event_name': event, 'tool_name': 'Bash',
                               'tool_input': {'command': tool_command}, 'cwd': str(self.cwd)}
                    result = subprocess.run(argv, cwd=self.cwd, input=json.dumps(payload),
                                            capture_output=True, text=True, timeout=25,
                                            creationflags=subprocess.CREATE_NO_WINDOW)
                    self.assertEqual(result.returncode, 0, result.stderr)
                    self.assertEqual(result.stderr, '')
                    output = json.loads(result.stdout) if result.stdout else {}
                    decision = output.get('hookSpecificOutput', {}).get('permissionDecision')
                    self.assertEqual(decision == 'deny', denied)

    def test_codex_windows_command_uses_current_checkout_and_powershell(self):
        self.check_manifest('.codex/hooks.json', 'pwsh', 'commandWindows',
                            'Write-Output "\\$(grep -r needle .)"')

    def test_claude_command_uses_current_checkout_and_bash(self):
        self.check_manifest('.claude/settings.json', 'bash', 'command',
                            'echo "`grep -r needle .`"')


if __name__ == '__main__':
    unittest.main(verbosity=2)
