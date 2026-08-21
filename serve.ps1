# SFI DK Local Web Server Runner
# Uses native .NET HttpListener in PowerShell to serve index.html, style.css, and app.js on port 8000.

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

Write-Host "--------------------------------------------------------" -ForegroundColor Green
Write-Host "SFI Dakshina Kannada Web Portal local server runner" -ForegroundColor Green
Write-Host "Starting native PowerShell server on http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C in this terminal window to stop the server." -ForegroundColor Yellow
Write-Host "--------------------------------------------------------" -ForegroundColor Green

try {
    $listener.Start()
    Write-Host "Server is active. Listening for requests..." -ForegroundColor Gray
    
    # Launch browser automatically
    Start-Process "http://localhost:$port/"
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        # Default routing to index.html
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }
        
        # Clean up path separators
        $urlPath = $urlPath.Replace("/", "\")
        $localFile = Join-Path $PSScriptRoot $urlPath
        
        if (Test-Path $localFile -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            
            # Content Type detection
            $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
            $contentType = "application/octet-stream"
            if ($ext -eq ".html" -or $ext -eq ".htm") { $contentType = "text/html; charset=utf-8" }
            elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
            elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
            elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
            elseif ($ext -eq ".png") { $contentType = "image/png" }
            elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            Write-Host "404 Not Found: $urlPath" -ForegroundColor Red
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("File Not Found - SFI DK Local Server")
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
}
catch {
    Write-Host "Server encountered an error: $_" -ForegroundColor Red
}
finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Yellow
}
