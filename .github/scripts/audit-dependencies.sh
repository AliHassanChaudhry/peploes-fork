#!/usr/bin/env bash
set -euo pipefail

report="${RUNNER_TEMP:?}/bun-audit.json"
status=0
bun audit --json > "$report" || status=$?
if [ "$status" -eq 0 ]; then
  exit 0
fi

# Vulnerabilities warn for now; registry, command and malformed-response errors fail.
if [ "$status" -eq 1 ] && jq -e -s '
  length == 1 and (.[0] | type == "object" and length > 0 and
  all(.[]; type == "array") and
  any(.[][]; .severity | IN("low", "moderate", "high", "critical")))
' "$report" > /dev/null; then
  echo "::warning::Dependency vulnerabilities found. Review the full JSON audit artifact."
  exit 0
fi

echo "::error::Dependency audit failed to return a valid vulnerability report."
exit "$status"
