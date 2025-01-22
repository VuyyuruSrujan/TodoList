# PowerShell script to install dependencies

Write-Host "Starting dependency installation..." -ForegroundColor Green

# Navigate to frontend and install dependencies
Write-Host "Installing frontend dependencies..."
Set-Location -Path "frontend"
npm install
Set-Location -Path ".."

# Navigate to backend and install dependencies
Write-Host "Installing backend dependencies..."
Set-Location -Path "backend"
npm install
Set-Location -Path ".."

Write-Host "All dependencies installed successfully!" -ForegroundColor Green
