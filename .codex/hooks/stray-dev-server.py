"""Report non-default Next dev listeners owned by this repository; never kill."""
import json
import os
from pathlib import Path
import re
import subprocess
import sys


def listeners():
    result = subprocess.run(['netstat', '-ano', '-p', 'TCP'], capture_output=True,
                            timeout=5, creationflags=subprocess.CREATE_NO_WINDOW)
    if result.returncode:
        raise RuntimeError('netstat failed')
    pairs = set()
    # The localized Windows header may be CP949 even under PYTHONUTF8.
    # Socket rows use ASCII; decoding the header is unnecessary.
    for line in result.stdout.decode('ascii', errors='replace').splitlines():
        match = re.search(r':(\d+)\s+\S+\s+LISTENING\s+(\d+)', line)
        if match:
            pairs.add((int(match[1]), int(match[2])))
    return pairs


def node_processes():
    script = "[Console]::OutputEncoding=[System.Text.Encoding]::UTF8; Get-CimInstance Win32_Process -Filter \"Name = 'node.exe'\" | Select-Object ProcessId,ParentProcessId,CommandLine | ConvertTo-Json -Compress"
    result = subprocess.run(['powershell.exe', '-NoProfile', '-Command', script],
        capture_output=True, text=True, encoding='utf-8', timeout=7,
        creationflags=subprocess.CREATE_NO_WINDOW)
    if result.returncode:
        raise RuntimeError('process query failed')
    records = json.loads(result.stdout) if result.stdout.strip() else []
    return records if isinstance(records, list) else [records]


def find_strays(sockets, processes, repo):
    records = {int(p['ProcessId']): p for p in processes}
    root = str(repo).replace('\\', '/').rstrip('/').casefold() + '/'
    found = []
    for port, pid in sorted(set(sockets)):
        if not 3001 <= port <= 3999:
            continue
        current, seen = pid, set()
        while current in records and current not in seen:
            seen.add(current)
            process = records[current]
            command = (process.get('CommandLine') or '').replace('\\', '/').casefold()
            if root in command and re.search(r'/next/dist/bin/next(?:\.js)?["\']?\s+dev(?:\s|$)', command):
                found.append((port, pid))
                break
            current = int(process.get('ParentProcessId') or 0)
    return found


def main():
    if os.name != 'nt':
        return  # This detector uses Windows process and socket metadata.
    repo = Path(__file__).resolve().parents[2]
    try:
        sockets = listeners()
        if not any(3001 <= port <= 3999 for port, _ in sockets):
            return
        stray = find_strays(sockets, node_processes(), repo)
    except (OSError, RuntimeError, ValueError, subprocess.TimeoutExpired):
        print(json.dumps({'systemMessage': 'Could not check this repository for leftover Next dev servers.'}))
        return
    if stray:
        listed = ', '.join(f'port {port} (PID {pid})' for port, pid in stray)
        print(json.dumps({'systemMessage': f'Next dev server for this repository still listening: {listed}. Check whether it belongs to this task before stopping it.'}))


if __name__ == '__main__':
    main()
