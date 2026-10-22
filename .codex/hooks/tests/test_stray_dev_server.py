import importlib.util
from pathlib import Path
import unittest

HOOK = Path(__file__).resolve().parents[1] / 'stray-dev-server.py'
spec = importlib.util.spec_from_file_location('stray', HOOK)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class StrayTests(unittest.TestCase):
    def test_filters_to_repository_next_dev_process_tree(self):
        processes = [
            {'ProcessId': 1, 'ParentProcessId': 0, 'CommandLine': 'node C:/project/node_modules/next/dist/bin/next dev --port 3100'},
            {'ProcessId': 2, 'ParentProcessId': 1, 'CommandLine': 'next-server'},
            {'ProcessId': 3, 'ParentProcessId': 0, 'CommandLine': 'node C:/other/node_modules/next/dist/bin/next dev'},
            {'ProcessId': 4, 'ParentProcessId': 0, 'CommandLine': 'node C:/project/service.js'},
            {'ProcessId': 5, 'ParentProcessId': 0, 'CommandLine': 'node C:/project/node_modules/next/dist/bin/next start'},
            {'ProcessId': 6, 'ParentProcessId': 0, 'CommandLine': 'node C:/project-extra/node_modules/next/dist/bin/next dev'},
        ]
        sockets = [(3000, 1), (3100, 2), (3101, 3), (3102, 4), (3103, 5), (3104, 6), (2000, 1)]
        self.assertEqual(module.find_strays(sockets, processes, 'C:/project'), [(3100, 2)])

    def test_quoted_windows_path_and_duplicate_sockets(self):
        processes = [{'ProcessId': 1, 'ParentProcessId': 0,
            'CommandLine': 'node "C:\\My Project\\node_modules\\next\\dist\\bin\\next" dev --port 3999'}]
        self.assertEqual(module.find_strays([(3999, 1), (3999, 1)], processes, 'c:/my project'), [(3999, 1)])

    def test_parent_loop_does_not_hang(self):
        processes = [{'ProcessId': 1, 'ParentProcessId': 2}, {'ProcessId': 2, 'ParentProcessId': 1}]
        self.assertEqual(module.find_strays([(3100, 1)], processes, 'C:/project'), [])


if __name__ == '__main__':
    unittest.main(verbosity=2)
