Write-Host "Iniciando Python Microservice (FastAPI + CV/ML)..." -ForegroundColor Green
cd python-microservice

if (-not (Test-Path .venv)) {
    Write-Host "Creando entorno virtual Python (.venv)..." -ForegroundColor Yellow
    python -m venv .venv
}

Write-Host "Activando entorno virtual..." -ForegroundColor Yellow
# Activate for PowerShell
& .venv\Scripts\Activate.ps1

Write-Host "Instalando / Verificando dependencias (requirements.txt)..." -ForegroundColor Yellow
pip install -r requirements.txt

Write-Host "Iniciando FastAPI con Uvicorn..." -ForegroundColor Green
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
