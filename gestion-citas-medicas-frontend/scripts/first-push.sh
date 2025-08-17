#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="gestion-citas-medicas-frontend"
GITHUB_USER="${1:-}"

if ! command -v git >/dev/null; then
  echo "git no está instalado."
  exit 1
fi

if ! command -v gh >/dev/null; then
  echo "GitHub CLI (gh) no está instalado. Instálalo desde https://cli.github.com/"
  exit 1
fi

git init
git add .
git commit -m "chore: bootstrap frontend (React + Vite)"
# Crea repo privado (cámbialo a public si prefieres)
gh repo create "$REPO_NAME" --private --source=. --push
echo "Repositorio creado y código subido a GitHub ✅"
