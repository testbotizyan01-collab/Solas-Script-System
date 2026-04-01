#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = r'c:\Users\HP\OneDrive\Documents\Kissy\olfu-details.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the position of the History section
hist_start = content.find('<h3>History</h3>')
hist_end = content.find('</div>', hist_start) + len('</div>')

# Extract the section to inspect
section = content[hist_start:hist_end]
print("Current section length:", len(section))
print("Section preview:", section[:200])

# Simple approach - find and replace just the p tag content
old_p_start = content.find('<p>', hist_start)
old_p_end = content.find('</p>', hist_start) + len('</p>')

new_p_content = '''<p>Our Lady of Fatima University (OLFU) is a prestigious institution founded in 1996. The university began with the Regalado Avenue campus, home to the Fatima Eye and Rehabilitation Center Building, which houses the Physical Therapy program. In 1998, OLFU expanded significantly by establishing new facilities in Hilltop Subdivision, Lagro, Quezon City—a serene location overlooking the beautiful La Mesa reservoir.</p>
                        
                        <p>Today, OLFU's Quezon City campus stands as an inclusive university dedicated to nurturing the academic and emotional environment of every student. Through the Center for Guidance Services (CGS), OLFU has made mental health one of its great highlights. The campus offers a safe, confidential, and supportive space for every student, with comprehensive counseling services including regular mental health seminars and check-in sessions led by professional counselors.</p>'''

# Replace the content
if old_p_start != -1 and old_p_end != -1:
    new_content = content[:old_p_start] + new_p_content + content[old_p_end:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("File updated successfully!")
else:
    print("Could not find the paragraph tags")
