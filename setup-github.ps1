# GitHub Repository Setup Script for Windows

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if repository exists
Write-Host "Checking if repository exists..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://api.github.com/repos/dycomic123/movie-utopia-v2" -Method Get -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Repository already exists!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Pushing code..." -ForegroundColor Yellow
        git push -u origin main
        exit 0
    }
} catch {
    Write-Host "Repository not found. Let's create it!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Instructions:" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "A browser window has opened to create a GitHub token." -ForegroundColor White
Write-Host ""
Write-Host "On the GitHub page:" -ForegroundColor White
Write-Host "1. Note: 'Movie Utopia Deployment'" -ForegroundColor White
Write-Host "2. Expiration: 30 days (or your preference)" -ForegroundColor White
Write-Host "3. Select scopes: ☑ repo" -ForegroundColor White
Write-Host "4. Click 'Generate token'" -ForegroundColor Green
Write-Host "5. COPY the token (won't be shown again!)" -ForegroundColor Red
Write-Host ""

$token = Read-Host "Paste your GitHub token here"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host "❌ No token provided. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Creating repository..." -ForegroundColor Yellow

$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = "movie-utopia-v2"
    description = "AI Film Creation Platform - Movie Utopia v2"
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $createResponse = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    
    Write-Host "✓ Repository created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "=========================================" -ForegroundColor Green
        Write-Host "✓ SUCCESS! Deployment Complete!" -ForegroundColor Green
        Write-Host "=========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your repository is live at:" -ForegroundColor White
        Write-Host "https://github.com/dycomic123/movie-utopia-v2" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "❌ Push failed. Please check authentication." -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Failed to create repository." -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternative: Create manually at https://github.com/new" -ForegroundColor Yellow
}
