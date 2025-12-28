# Redirect Validation Script
# Checks if redirects point to actual files

$contentPath = "src/content"
$redirectsFile = "public\_redirects"

Write-Host "🔍 VALIDATING ALL REDIRECTS..."
Write-Host "===============================`n"

# Get all markdown files
$allMarkdownFiles = Get-ChildItem -Path $contentPath -Recurse -Filter "*.md" -ErrorAction SilentlyContinue

# Create lookup: slug -> (category, fullPath)
$fileLookup = @{}
foreach ($file in $allMarkdownFiles) {
    $slug = $file.BaseName
    $category = $file.Directory.Name
    $fileLookup[$slug] = @{
        Category = $category
        FullPath = $file.FullName
    }
}

# Read redirects
$redirects = Get-Content $redirectsFile
$blogRedirects = $redirects | Where-Object { $_ -match '^/blog/[^/]+\s+/blog/[^/]+/[^/]+\s+301$' }

Write-Host "Checking $($blogRedirects.Count) blog post redirects...`n"

$validCount = 0
$invalidCount = 0
$invalidRedirects = @()

foreach ($line in $blogRedirects) {
    if ($line -match '^/blog/([^/\s]+)\s+/blog/([^/]+)/([^/\s]+)\s+301$') {
        $fromSlug = $matches[1]
        $toCategory = $matches[2]
        $toSlug = $matches[3]
        
        # Check 1: Does the destination file exist?
        if ($fileLookup.ContainsKey($toSlug)) {
            $actualCategory = $fileLookup[$toSlug].Category
            $actualPath = $fileLookup[$toSlug].FullPath
            
            # Check 2: Is the category correct?
            if ($actualCategory -eq $toCategory) {
                $validCount++
                Write-Host "✅ $fromSlug → $toCategory/$toSlug"
            } else {
                $invalidCount++
                $invalidRedirects += @{
                    Line = $line
                    Issue = "Wrong category. Should be: $actualCategory (not $toCategory)"
                    Actual = $actualPath
                }
                Write-Host "❌ $fromSlug → WRONG CATEGORY: $toCategory (should be $actualCategory)"
            }
        } else {
            $invalidCount++
            $invalidRedirects += @{
                Line = $line
                Issue = "Destination file not found: $toSlug.md"
                Actual = "File does not exist"
            }
            Write-Host "❌ $fromSlug → FILE NOT FOUND: $toSlug.md"
        }
    }
}

Write-Host "`n==============================="
Write-Host "RESULTS:"
Write-Host "  ✅ Valid: $validCount"
Write-Host "  ❌ Invalid: $invalidCount"
Write-Host "===============================`n"

if ($invalidCount -gt 0) {
    Write-Host "INVALID REDIRECTS NEEDING FIX:"
    foreach ($invalid in $invalidRedirects) {
        Write-Host "`n---"
        Write-Host "Redirect: $($invalid.Line)"
        Write-Host "Issue: $($invalid.Issue)"
        Write-Host "Actual: $($invalid.Actual)"
    }
    
    # Generate corrected redirects
    Write-Host "`n`n🛠️  CORRECTED REDIRECTS:"
    foreach ($invalid in $invalidRedirects) {
        if ($invalid.Actual -notmatch "File does not exist") {
            $path = $invalid.Actual
            $slug = [System.IO.Path]::GetFileNameWithoutExtension($path)
            $category = (Get-Item $path).Directory.Name
            
            if ($invalid.Line -match '^/blog/([^/\s]+)\s+/blog/') {
                $fromSlug = $matches[1]
                Write-Host "/blog/$fromSlug /blog/$category/$slug 301"
            }
        }
    }
}
