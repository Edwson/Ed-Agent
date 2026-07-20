#!/usr/bin/env bash
# build-mcpb.sh — package Ed Agent as a self-contained Claude Desktop extension (.mcpb).
# The .mcpb is a zip of manifest.json + the runtime files + bundled node_modules
# (only @modelcontextprotocol/sdk + zod are declared, so the tree stays small).
# Usage: bash scripts/build-mcpb.sh   → writes ./ed-agent.mcpb
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$(mktemp -d)"
OUT="$ROOT/ed-agent.mcpb"

cd "$ROOT"
# Fresh production dependency tree (installs optionalDependencies: the MCP SDK + zod).
npm install --omit=dev --ignore-scripts --silent

# Stage only what the MCP server needs at runtime.
for item in manifest.json package.json mcp src knowledge bin node_modules \
            AGENTS.md Ed_agents_Claude.md README.md LICENSE; do
  cp -R "$ROOT/$item" "$STAGE/"
done
mkdir -p "$STAGE/img" && cp "$ROOT/img/ed_agent.png" "$STAGE/img/"

# Zip → .mcpb (manifest.json must be at the archive root).
( cd "$STAGE" && zip -r -q -X "$OUT" . -x '*.DS_Store' '*/.git/*' )
rm -rf "$STAGE"
echo "Built $OUT ($(du -h "$OUT" | cut -f1))"
