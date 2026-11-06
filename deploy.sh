#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🚀 Desplegando Nuvex UI (Registry + Showcase) en VPS"
echo "=========================================================="

# 1. Asegurar cambios más recientes desde Git
if [ -d ".git" ]; then
    echo "📥 Actualizando código desde el repositorio Git..."
    git pull origin main || git pull origin master
fi

# 2. Levantar o recrear los contenedores en producción
echo "🐳 Construyendo y levantando contenedores con Docker Compose..."
docker compose down --remove-orphans
docker compose up -d --build

echo "=========================================================="
echo "✅ Despliegue completado con éxito"
echo "📦 NPM Registry : https://npm.nuvex-tecnologia.com"
echo "🎨 UI Showcase  : https://ui.nuvex-tecnologia.com"
echo "=========================================================="
