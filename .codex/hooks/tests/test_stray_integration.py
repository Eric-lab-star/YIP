import contextlib
import io
import json
from pathlib import Path
import runpy
import subprocess
import unittest
from unittest.mock import patch

HOOK = Path(__file__).resolve().parents[1] / 'stray-dev-server.py'


class StrayIntegrationTests(unittest.TestCase):
    def test_unrelated_node_listener_is_not_reported_as_next(self):
        def process_info(args, **kwargs):
            if args[0] == 'netstat':
                output = '활성 연결\nTCP    127.0.0.1:3100   0.0.0.0:0   LISTENING   123\n'.encode('cp949')
            elif args[0] == 'tasklist':
                output = '"node.exe","123","Console","1","1,000 K"'
            elif args[0] == 'powershell.exe':
                output = json.dumps([{'ProcessId': 123, 'ParentProcessId': 0,
                                      'CommandLine': 'node C:/other/service.js'}])
            else:
                raise AssertionError(args)
            return subprocess.CompletedProcess(args, 0, stdout=output, stderr='')
        output = io.StringIO()
        with patch('subprocess.run', side_effect=process_info), contextlib.redirect_stdout(output):
            try:
                runpy.run_path(str(HOOK), run_name='__main__')
            except SystemExit as e:
                self.assertEqual(e.code, 0)
        self.assertEqual(output.getvalue(), '')


if __name__ == '__main__':
    unittest.main(verbosity=2)
