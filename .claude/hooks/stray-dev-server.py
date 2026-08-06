"""Stop hook: warn about Next dev servers left listening on non-default ports.

Twice in one session a `npm run dev -- --port NNNN` I started outlived the
Bash task that launched it, and Next then refused to start the user's own
server ("Another next dev server is already running").

This *reports* rather than kills. The user habitually runs their own dev server
on :3000, and a hook that auto-killed node processes would eventually take that
down mid-work. Naming the PID is enough — stopping it is a decision, not a
cleanup.
"""
import json
import re
import subprocess
import sys

EXPECTED_PORT = 3000  # the user's own long-running server


def listeners():
    """{port: pid} for LISTENING TCP sockets, via netstat (no extra deps)."""
    try:
        out = subprocess.run(
            ["netstat", "-ano", "-p", "TCP"],
            capture_output=True, text=True, timeout=10,
        ).stdout
    except Exception:
        return {}
    found = {}
    for line in out.splitlines():
        m = re.search(r":(\d+)\s+\S+\s+LISTENING\s+(\d+)", line)
        if m:
            found.setdefault(int(m.group(1)), int(m.group(2)))
    return found


def is_node(pid):
    try:
        out = subprocess.run(
            ["tasklist", "/FI", f"PID eq {pid}", "/FO", "CSV", "/NH"],
            capture_output=True, text=True, timeout=10,
        ).stdout
        return "node.exe" in out
    except Exception:
        return False


# Dev-server range we plausibly used; avoids flagging unrelated services.
# The upper bound was 3099, which silently excluded :3100 — the port this hook
# was written for. A server sat there for hours across two sessions and was
# never reported. Keep the ceiling above every port we actually reach for.
# The judge stack (Piston 2000, formatter 2100, LSP 2200) stays below 3000 and
# is deliberately out of range.
stray = [
    (port, pid)
    for port, pid in sorted(listeners().items())
    if 3001 <= port <= 3999 and port != EXPECTED_PORT and is_node(pid)
]

if stray:
    listed = ", ".join(f"port {p} (PID {q})" for p, q in stray)
    json.dump(
        {
            "systemMessage": (
                f"Stray Next dev server still listening: {listed}. "
                f"It will block `npm run dev` on :{EXPECTED_PORT}. "
                f"Stop it with: taskkill /PID {stray[0][1]} /F"
            )
        },
        sys.stdout,
    )

sys.exit(0)
