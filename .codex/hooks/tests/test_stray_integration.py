import contextlib
import io
import json
import os
from pathlib import Path
import runpy
import subprocess
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[3]
HOOKS = [ROOT / directory / 'hooks/stray-dev-server.py'
         for directory in ('.codex', '.claude')]


@unittest.skipUnless(os.name == 'nt', 'Windows process and socket integration')
class StrayIntegrationTests(unittest.TestCase):
    def run_hook(self, hook, command, parent_command=None, port=3100):
        records = [{'ProcessId': 123, 'ParentProcessId': 456 if parent_command else 0,
                    'CommandLine': command}]
        if parent_command:
            records.append({'ProcessId': 456, 'ParentProcessId': 0,
                            'CommandLine': parent_command})

        def process_info(args, **kwargs):
            if args[0] == 'netstat':
                output = f'활성 연결\nTCP    127.0.0.1:{port}   0.0.0.0:0   LISTENING   123\n'
                if not kwargs.get('text'):
                    output = output.encode('cp949')
            elif args[0] == 'tasklist':
                output = '"node.exe","123","Console","1","1,000 K"'
            elif args[0] == 'powershell.exe':
                output = json.dumps(records)
            else:
                raise AssertionError(args)
            return subprocess.CompletedProcess(args, 0, stdout=output, stderr='')
        output = io.StringIO()
        with patch('subprocess.run', side_effect=process_info), contextlib.redirect_stdout(output):
            try:
                runpy.run_path(str(hook), run_name='__main__')
            except SystemExit as e:
                self.assertEqual(e.code, 0)
        return output.getvalue()

    def test_unrelated_node_listener_is_not_reported_as_next(self):
        for hook in HOOKS:
            for command in ['node C:/other/service.js',
                            'node C:/other/node_modules/next/dist/bin/next dev',
                            f'node "{ROOT.as_posix()}/service.js"',
                            f'node "{ROOT.as_posix()}/node_modules/next/dist/bin/next" start']:
                with self.subTest(hook=hook, command=command):
                    self.assertEqual(self.run_hook(hook, command), '')

    def test_repository_next_child_is_reported_without_kill_instruction(self):
        parent = f'node "{ROOT.as_posix()}/node_modules/next/dist/bin/next" dev --port 3100'
        for hook in HOOKS:
            with self.subTest(hook=hook):
                output = self.run_hook(hook, 'next-server', parent_command=parent)
                message = json.loads(output)['systemMessage']
                self.assertIn('3100', message)
                self.assertIn('123', message)
                self.assertNotIn('taskkill', message)

    def test_default_port_is_ignored(self):
        command = f'node "{ROOT.as_posix()}/node_modules/next/dist/bin/next" dev'
        for hook in HOOKS:
            with self.subTest(hook=hook):
                self.assertEqual(self.run_hook(hook, command, port=3000), '')


if __name__ == '__main__':
    unittest.main(verbosity=2)
