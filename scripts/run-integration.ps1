# Roda o teste de integração do plugin (tests/integration) contra um Postgres EM MEMÓRIA (PGlite) —
# nenhum banco real é tocado. Usa o vitest e o drizzle-orm do core clonado (default ..\venore-docks).
# Mesmo esquema de venore-plugin-tests/scripts/run-integration.ps1:
#   1. instala @electric-sql/pglite no core SEM gravar em package.json/lock (--no-save);
#   2. cria um junction node_modules -> core (o plugin não tem node_modules próprio);
#   3. roda o vitest; 4. remove o junction.
#
# Uso (PowerShell, na pasta do plugin):  .\scripts\run-integration.ps1 [-Core ..\venore-docks]
param([string]$Core = "")
$ErrorActionPreference = "Stop"
$plugin = Split-Path -Parent $PSScriptRoot
if (-not $Core) { $Core = Join-Path (Split-Path -Parent $plugin) "venore-docks" }
$Core = (Resolve-Path $Core).Path

Push-Location $Core
try {
  npm install --no-save --no-audit --no-fund --loglevel=error @electric-sql/pglite
  $junction = Join-Path $plugin "node_modules"
  if (Test-Path $junction) { throw "$junction já existe — remova antes (é só um junction temporário)." }
  New-Item -ItemType Junction -Path $junction -Target (Join-Path $Core "node_modules") | Out-Null
  try {
    $env:CORE_DIR = $Core
    npx vitest run --config (Join-Path $plugin "tests\integration\vitest.integration.config.ts")
  } finally {
    (Get-Item $junction).Delete()
  }
} finally {
  Pop-Location
}
