Write-Host "Setting up database..." -ForegroundColor Cyan

# Generate Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Prisma client generated" -ForegroundColor Green
    
    # Push schema to database
    Write-Host "Creating database schema..." -ForegroundColor Yellow
    npx prisma db push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database schema created" -ForegroundColor Green
        
        # Start the application
        Write-Host "Starting NestJS application..." -ForegroundColor Yellow
        npx nest start --watch
    } else {
        Write-Host "✗ Failed to create database schema" -ForegroundColor Red
    }
} else {
    Write-Host "✗ Failed to generate Prisma client" -ForegroundColor Red
}