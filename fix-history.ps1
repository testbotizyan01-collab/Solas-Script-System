$file = 'c:\Users\HP\OneDrive\Documents\Kissy\olfu-details.html'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$oldText = ' A prestigious university originated in 1996 with the following building: Regalado Avenue, Fatima Eye and Rehabilitation Center Building that serves as a Physical Therapy program. Not just that but  in 1998,  a new variety of buildings was established in Hilltop Subdivision, Lagro, Quezon City  in which you can view the scenery and beauty of La Mesa reservoir, perfect to also support your mental stability.

Our Lady of Fatima University (OLFU), Quezon City campus distinguishes itself as an inclusive university that nurtures the academic environment of the students,  where mental health is one the great highlights, through the Center for Guidance Services (CGS).  Embracing the university''s mission by "improving man as man", the campus offers a safe and confidential space for each OLFU student who needs a fulfilling hand for supporting the student''s academic pressure, emotional well-being. The counseling services are designed to offer regular mental health seminars and "Kamustahan" (check-in) sessions with professional counselors.'

$newText = 'Our Lady of Fatima University (OLFU) is a prestigious institution founded in 1996. The university began with the Regalado Avenue campus, home to the Fatima Eye and Rehabilitation Center Building, which houses the Physical Therapy program. In 1998, OLFU expanded significantly by establishing new facilities in Hilltop Subdivision, Lagro, Quezon City—a serene location overlooking the beautiful La Mesa reservoir.

Today, OLFU''s Quezon City campus stands as an inclusive university dedicated to nurturing the academic and emotional environment of every student. Through the Center for Guidance Services (CGS), OLFU has made mental health one of its great highlights. The campus offers a safe, confidential, and supportive space for every student, with comprehensive counseling services including regular mental health seminars and check-in sessions led by professional counselors.'

if ($content -contains $oldText) {
    $newContent = $content -replace [regex]::Escape($oldText), $newText
    [System.IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)
    Write-Output "File updated successfully"
} else {
    Write-Output "Old text not found"
}
