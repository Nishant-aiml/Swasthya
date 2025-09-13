# Install ImageMagick if not already installed
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host "ImageMagick is required but not installed. Please install it first."
    exit 1
}

$sizes = @(16, 32, 64, 96, 192, 512)
$sourceSvg = "..\public\logo.svg"

foreach ($size in $sizes) {
    $outputFile = "..\public\logo$size.png"
    magick convert -background none -size "$($size)x$($size)" $sourceSvg $outputFile
}

# Create favicon.ico with multiple sizes
magick convert -background none -size "16x16" $sourceSvg -size "32x32" $sourceSvg -size "48x48" $sourceSvg "..\public\favicon.ico"
