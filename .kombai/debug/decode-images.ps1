# Script to decode base64 images from JSON files
$files = @('waifura.png', 'sensei.png', 'claynosaurz.png', 'pythenians.png', 'veterans.png', 'finalbosu.png')

foreach ($file in $files) {
    Write-Host "Processing $file..."
    
    # Read JSON content
    $json = Get-Content $file -Raw | ConvertFrom-Json
    
    # Extract base64 data from the JSON structure
    $base64Data = $json[1].source.data
    
    # Convert base64 to bytes
    $imageBytes = [Convert]::FromBase64String($base64Data)
    
    # Write to file
    [System.IO.File]::WriteAllBytes($file, $imageBytes)
    
    Write-Host "$file decoded successfully"
}

Write-Host "All images decoded!"
