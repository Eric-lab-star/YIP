"""Claude entry point for the shared, tested repository hook."""
from pathlib import Path
import runpy


if __name__ == '__main__':
    hook = Path(__file__).resolve().parents[2] / '.codex' / 'hooks' / Path(__file__).name
    runpy.run_path(str(hook), run_name='__main__')
