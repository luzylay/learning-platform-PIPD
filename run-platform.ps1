Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   INICIANDO OIT 1 SMART LEARNING PLATFORM (LOCAL RUN)    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Start C# Backend
Write-Host "[1/3] Iniciando C# Backend (.NET 8 + SQLite)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& './run-backend.ps1'"

# 2. Start Python Microservice
Write-Host "[2/3] Iniciando Python Microservice (FastAPI + ML)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& './run-python.ps1'"

# 3. Start Angular UI
Write-Host "[3/3] Iniciando Frontend UI (Angular 19)..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& './run-frontend.ps1'"

Write-Host "----------------------------------------------------------" -ForegroundColor Yellow
Write-Host "¡Todo listo! Los tres servicios se están ejecutando." -ForegroundColor Green
Write-Host "Las ventanas de registro (logs) se han abierto por separado." -ForegroundColor Green
Write-Host "Acceso a la plataforma web: http://localhost:4200" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
