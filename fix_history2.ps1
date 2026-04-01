# Read the file
$file = "c:\Users\HP\OneDrive\Documents\Kissy\olfu-details.html"
$content = [IO.File]::ReadAllText($file)

# Simple check
Write-Host "File size: $(content.Length)"
Write-Host "Contains H3 History: $(content.Contains('<h3>History</h3>'))"

# Find start and end markers
$start = $content.IndexOf('<h3>History</h3>')
if ($start -ge 0) {
    Write-Host "Found History at index: $start"
    
    $pStart = $content.IndexOf('<p>', $start)
    $pEnd = $content.IndexOf('</p>', $pStart) + 4
    
    if ($pStart -ge 0 -and $pEnd -ge 4) {
        Write-Host "Found paragraph from $pStart to $pEnd"
        
        $before = $content.Substring(0, $pStart)
        $after = $content.Substring($pEnd)
        
        $newP = @"
<p>Our Lady of Fatima University (OLFU) is a prestigious institution founded in 1996. The university began with the Regalado Avenue campus, home to the Fatima Eye and Rehabilitation Center Building, which houses the Physical Therapy program. In 1998, OLFU expanded significantly by establishing new facilities in Hilltop Subdivision, Lagro, Quezon City—a serene location overlooking the beautiful La Mesa reservoir.</p>
                        
                        <p>Today, OLFU's Quezon City campus stands as an inclusive university dedicated to nurturing the academic and emotional environment of every student. Through the Center for Guidance Services (CGS), OLFU has made mental health one of its great highlights. The campus offers a safe, confidential, and supportive space for every student, with comprehensive counseling services including regular mental health seminars and check-in sessions led by professional counselors.</p>
"@
        
        $newContent = $before + $newP + $after
        [IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "File updated!"
    } else {
        Write-Host "Could not find paragraph tags"
    }
} else {
    Write-Host "Could not find History heading"
}
