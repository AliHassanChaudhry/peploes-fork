#!/usr/bin/env python3
"""Check warning-only findings without hiding audit infrastructure failures."""
import json
import os
from pathlib import Path
import subprocess
import tempfile

script = Path(__file__).with_name("audit-dependencies.sh").resolve()
with tempfile.TemporaryDirectory() as directory:
    root = Path(directory)
    bun = root / "bun"
    bun.write_text('#!/usr/bin/env bash\nprintf \'%s\' "$AUDIT_RESPONSE"\nexit "$AUDIT_STATUS"\n')
    bun.chmod(0o755)
    cases = [("clean", {}, 0, 0)]
    for severity in ["low", "moderate", "high", "critical"]:
        cases.append((severity, {"example": [{"severity": severity}]}, 1, 0))
    cases += [
        ("registry error", {"error": "unavailable"}, 1, 1),
        ("empty response", "", 1, 1),
        ("invalid JSON", "<html>unavailable</html>", 1, 1),
        ("empty failed report", {}, 1, 1),
        ("command failure", {"example": [{"severity": "high"}]}, 2, 2),
    ]
    for name, response, status, expected in cases:
        payload = response if isinstance(response, str) else json.dumps(response)
        env = dict(os.environ, PATH=str(root) + os.pathsep + os.environ["PATH"],
                   RUNNER_TEMP=str(root), AUDIT_RESPONSE=payload, AUDIT_STATUS=str(status))
        result = subprocess.run(["bash", str(script)], env=env, capture_output=True, text=True)
        assert result.returncode == expected, (name, result)
        assert (root / "bun-audit.json").read_text() == payload, name
        if status == 1 and expected == 0:
            assert "::warning::" in result.stdout, name
        print(f"PASS {name}")
