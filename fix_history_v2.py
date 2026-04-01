import sys

file_path = r'c:\Users\HP\OneDrive\Documents\Kissy\olfu-details.html'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Old text - the messy paragraph
old_text = ' A prestigious university originated in 1996 with the following building: Regalado Avenue, Fatima Eye and Rehabilitation Center Building that serves as a Physical Therapy program. Not just that but  in 1998,  a new variety of buildings was established in Hilltop Subdivision, Lagro, Quezon City  in which you can view the scenery and beauty of La Mesa reservoir, perfect to also support your mental stability.\n\nOur Lady of Fatima University (OLFU), Quezon City campus distinguishes itself as an inclusive university that nurtures the academic environment of the students,  where mental health is one the great highlights, through the Center for Guidance Services (CGS).  Embracing the university\'s mission by "improving man as man", the campus offers a safe and confidential space for each OLFU student who needs a fulfilling hand for supporting the student\'s academic pressure, emotional well-being. The counseling services are designed to offer regular mental health seminars and "Kamustahan" (check-in) sessions with professional counselors.'

# New text - clean and structured
new_text = '''Our Lady of Fatima University (OLFU) is a prestigious institution founded in 1996. The university began with the Regalado Avenue campus, home to the Fatima Eye and Rehabilitation Center Building, which houses the Physical Therapy program.</p>
                        
                        <p>In 1998, OLFU expanded significantly by establishing new facilities in Hilltop Subdivision, Lagro, Quezon City. This serene location overlooks the beautiful La Mesa reservoir, an environment designed to support student mental stability and well-being.</p>
                        
                        <p>Today, OLFU's Quezon City campus stands as an inclusive university dedicated to nurturing the academic and emotional environment of every student. Mental health is one of the university's greatest institutional highlights, supported through the Center for Guidance Services (CGS).</p>
                        
                        <p>Embracing the mission of "improving man as man," the campus offers a safe and confidential space for every OLFU student. The university provides comprehensive counseling services, including regular mental health seminars and "Kamustahan" (check-in) sessions led by professional counselors.'''

# Try replacing
if old_text in content:
    print("Found the old text!")
    content = content.replace(old_text, new_text)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("File successfully updated!")
else:
    print("Old text not found. Trying alternative search...")
    # Try shorter matching
    if 'A prestigious university originated' in content:
        print("Found partial match - text is in file")
        # Find the position
        idx = content.find('A prestigious university originated')
        print(f"Found at index: {idx}")
        print(f"Context: {content[idx-50:idx+200]}")
    else:
        print("Could not find text to replace")
