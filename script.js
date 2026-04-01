 
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const mood = this.dataset.mood;
        console.log(`User selected mood: ${mood}`);
   
        const msg = document.createElement('div');
        msg.textContent = `Thank you for checking in. You're doing great! 💚`;
        msg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #9db4a0, #b8d4e8);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(msg);
        
        setTimeout(() => msg.remove(), 2000);
        
       
        const moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
        moodLog.push({
            mood: mood,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('moodLog', JSON.stringify(moodLog));
    });
});

 
document.querySelector('.save-btn')?.addEventListener('click', function() {
    const text = document.getElementById('diary-text').value;
    const moodSelect = document.getElementById('mood-select').value;
    const fontSelect = document.getElementById('font-select').value;
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const accentColor = document.getElementById('accent-color').value;
    
    if (!text.trim()) {
        alert('Please write something to save.');
        return;
    }
    
    if (!moodSelect) {
        alert('Please select a mood.');
        return;
    }
    
    
    const now = new Date();
    const entryId = Date.now();
    const entry = {
        id: entryId,
        text: text,
        mood: moodSelect,
        font: fontSelect,
        bgColor: bgColor,
        textColor: textColor,
        accentColor: accentColor,
        timestamp: now.toISOString(),
        dateFormatted: formatDateAndTime(now)
    };
    
 
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    diaryEntries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    
 
    showSaveSuccess(entry);
    
 
    document.getElementById('diary-text').value = '';
    document.getElementById('mood-select').value = '';
    document.getElementById('font-select').value = 'arial';
    document.getElementById('bg-color').value = '#d4e8d4';
    document.getElementById('text-color').value = '#333333';
    document.getElementById('accent-color').value = '#b8d4e8';
    
 
    updatePreview();
    
 
    loadSavedEntries();
    
     
    showMentalHealthResources(moodSelect);
});

 
function formatDateAndTime(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

 
function showSaveSuccess(entry) {
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #9db4a0, #b8d4e8);
        color: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        z-index: 1500;
        animation: slideInLeft 0.3s ease;
        max-width: 300px;
    `;
    
    msg.innerHTML = `
        <div style="margin-bottom: 0.5rem;">✨ Your entry has been saved safely!</div>
        <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">${entry.dateFormatted}</div>
        <div style="display: flex; gap: 0.5rem;">
            <button onclick="downloadDiaryEntry(${entry.id})" style="
                background: white;
                color: #9db4a0;
                border: none;
                padding: 0.5rem 0.8rem;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                font-weight: bold;
            ">⬇️ Download</button>
        </div>
    `;
    
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 5000);
}

 
function downloadDiaryEntry(entryId) {
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    const entry = diaryEntries.find(e => e.id === entryId);
    
    if (!entry) return;
    
    const content = `DIARY ENTRY
Date & Time: ${entry.dateFormatted}
Mood: ${entry.mood.toUpperCase()}
Font: ${entry.font}
---

${entry.text}

---
Saved via Solas Script`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `diary-${entry.dateFormatted.replace(/[^a-zA-Z0-9]/g, '-')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

 
function deleteDiaryEntry(entryId) {
    if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
        const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        const filteredEntries = diaryEntries.filter(e => e.id !== entryId);
        localStorage.setItem('diaryEntries', JSON.stringify(filteredEntries));
        
        
        const msg = document.createElement('div');
        msg.textContent = `🗑️ Entry deleted successfully.`;
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #d9534f;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            z-index: 1500;
            animation: slideInLeft 0.3s ease;
        `;
        document.body.appendChild(msg);
        
        setTimeout(() => msg.remove(), 3000);
        
 
        loadSavedEntries();
    }
}

 
function updatePreview() {
    const text = document.getElementById('diary-text').value;
    const font = document.getElementById('font-select').value;
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const accentColor = document.getElementById('accent-color').value;
    
    const previewDiv = document.getElementById('diary-preview');
    
    if (text.trim()) {
        previewDiv.style.fontFamily = font;
        previewDiv.style.backgroundColor = bgColor;
        previewDiv.style.color = textColor;
        previewDiv.style.borderLeft = `4px solid ${accentColor}`;
        previewDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    } else {
        previewDiv.innerHTML = '<p class="preview-placeholder">Your entry will appear here...</p>';
        previewDiv.style.fontFamily = 'Arial';
        previewDiv.style.backgroundColor = '#f5f5f5';
        previewDiv.style.color = '#999';
        previewDiv.style.borderLeft = 'none';
    }
}

 
function loadSavedEntries() {
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    const savedEntriesSection = document.getElementById('saved-entries-section');
    const savedEntriesList = document.getElementById('saved-entries-list');
    
    if (diaryEntries.length === 0) {
        savedEntriesSection.style.display = 'none';
        return;
    }
    
    savedEntriesSection.style.display = 'block';
    savedEntriesList.innerHTML = '';
    
    diaryEntries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.style.cssText = `
            background: white;
            color: #333;
            padding: 1rem;
            margin: 0.8rem 0;
            border: 2px solid #e0e0e0;
            border-left: 6px solid ${entry.accentColor};
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        `;
        
        const textPreview = entry.text.substring(0, 80) + (entry.text.length > 80 ? '...' : '');
        
        entryDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <div style="font-weight: bold; font-size: 1rem; margin-bottom: 0.3rem;">Entry #${diaryEntries.length - index}</div>
                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 0.3rem;">
                        <strong>Mood:</strong> ${entry.mood.toUpperCase()} | <strong>Font:</strong> ${entry.font}
                    </div>
                    <div style="font-size: 0.8rem; color: #999; margin-bottom: 0.5rem;">${entry.dateFormatted}</div>
                    <div style="color: #555; font-size: 0.95rem; font-style: italic;">"${textPreview}"</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-left: 1rem;">
                    <button onclick="viewFullDiaryEntry(${entry.id})" style="
                        background: #9db4a0;
                        color: white;
                        border: none;
                        padding: 0.5rem 0.8rem;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        white-space: nowrap;
                    ">👁️ View</button>
                    <button onclick="downloadDiaryEntry(${entry.id})" style="
                        background: #b8d4e8;
                        color: white;
                        border: none;
                        padding: 0.5rem 0.8rem;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        white-space: nowrap;
                    ">⬇️ Download</button>
                    <button onclick="showRecommendedVideos('${entry.mood}')" style="
                        background: #f0ad4e;
                        color: white;
                        border: none;
                        padding: 0.5rem 0.8rem;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        white-space: nowrap;
                    ">🎥 Videos</button>
                    <button onclick="deleteDiaryEntry(${entry.id})" style="
                        background: #d9534f;
                        color: white;
                        border: none;
                        padding: 0.5rem 0.8rem;
                        border-radius: 3px;
                        cursor: pointer;
                        font-size: 0.8rem;
                        white-space: nowrap;
                    ">🗑️ Delete</button>
                </div>
            </div>
        `;
        
        savedEntriesList.appendChild(entryDiv);
    });
}

 
function viewFullDiaryEntry(entryId) {
    const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    const entry = diaryEntries.find(e => e.id === entryId);
    
    if (!entry) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: ${entry.bgColor};
        color: ${entry.textColor};
        padding: 2rem;
        border-radius: 10px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        font-family: ${entry.font};
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
                <h3 style="margin: 0; font-size: 1.3rem;">Your Entry</h3>
                <p style="margin: 0.5rem 0 0; font-size: 0.9rem; opacity: 0.8;">Mood: <strong>${entry.mood.toUpperCase()}</strong></p>
                <p style="margin: 0.3rem 0 0; font-size: 0.85rem; opacity: 0.8;">${entry.dateFormatted}</p>
            </div>
            <button onclick="this.closest('div').parentElement.parentElement.remove()" style="
                background: ${entry.accentColor};
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1.2rem;
            ">✕</button>
        </div>
        <div style="border-top: 2px solid ${entry.accentColor}; padding-top: 1rem;">
            <p>${entry.text.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="margin-top: 1rem; font-size: 0.85rem; opacity: 0.7; font-style: italic;">This entry cannot be edited. You can download it or create a new entry.</p>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
 
function showMentalHealthResources(mood) {
    const resourcesSection = document.getElementById('resources-section');
    const resourceIntro = document.getElementById('resource-intro');
    const resourcesList = document.getElementById('resources-list');
    
    const resources = {
        anxiety: {
            title: 'Resources for Anxiety',
            videos: [
                { title: 'How to Manage Anxiety - Psychology Explained', url: 'https://www.youtube.com/results?search_query=anxiety+management+psychology' },
                { title: 'Breathing Techniques for Anxiety Relief', url: 'https://www.youtube.com/results?search_query=breathing+techniques+anxiety' },
                { title: 'Understanding Anxiety Disorders', url: 'https://www.youtube.com/results?search_query=anxiety+disorders+explained' }
            ]
        },
        depression: {
            title: 'Resources for Depression',
            videos: [
                { title: 'Understanding Depression - Mental Health Matters', url: 'https://www.youtube.com/results?search_query=depression+mental+health' },
                { title: 'Coping Strategies for Depression', url: 'https://www.youtube.com/results?search_query=coping+depression+strategies' },
                { title: 'Building Resilience During Depression', url: 'https://www.youtube.com/results?search_query=resilience+depression' }
            ]
        },
        stress: {
            title: 'Resources for Stress Management',
            videos: [
                { title: 'Stress Management Techniques', url: 'https://www.youtube.com/results?search_query=stress+management+techniques' },
                { title: 'Mindfulness and Meditation for Stress', url: 'https://www.youtube.com/results?search_query=mindfulness+meditation+stress' },
                { title: 'Understanding Stress Response', url: 'https://www.youtube.com/results?search_query=stress+response+psychology' }
            ]
        },
        happy: {
            title: 'Celebrate Your Happiness!',
            videos: [
                { title: 'The Psychology of Happiness', url: 'https://www.youtube.com/results?search_query=psychology+of+happiness' },
                { title: 'How to Maintain Positive Mental Health', url: 'https://www.youtube.com/results?search_query=positive+mental+health' },
                { title: 'Gratitude and Well-being', url: 'https://www.youtube.com/results?search_query=gratitude+well-being' }
            ]
        },
        calm: {
            title: 'Resources for Calmness',
            videos: [
                { title: 'Meditation for Calmness', url: 'https://www.youtube.com/results?search_query=meditation+relaxation' },
                { title: 'Progressive Muscle Relaxation', url: 'https://www.youtube.com/results?search_query=progressive+muscle+relaxation' },
                { title: 'How to Find Inner Peace', url: 'https://www.youtube.com/results?search_query=inner+peace+meditation' }
            ]
        }
    };
    
    if (resources[mood]) {
        resourcesSection.style.display = 'block';
        const resource = resources[mood];
        resourceIntro.innerHTML = `<p>Based on your mood of <strong>${mood.toUpperCase()}</strong>, here are some helpful resources:</p>`;
        
        resourcesList.innerHTML = '';
        resource.videos.forEach(video => {
            const link = document.createElement('a');
            link.href = video.url;
            link.target = '_blank';
            link.style.cssText = `
                display: block;
                padding: 0.8rem;
                margin: 0.5rem 0;
                background: linear-gradient(135deg, #9db4a0, #b8d4e8);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: transform 0.2s;
            `;
            link.textContent = `🎥 ${video.title}`;
            link.onmouseover = () => link.style.transform = 'translateX(5px)';
            link.onmouseout = () => link.style.transform = 'translateX(0)';
            resourcesList.appendChild(link);
        });
    }
}
 
function showRecommendedVideos(mood) {
    const videos = {
        anxiety: [
            { title: 'Anxiety Management & Relief - Expert Guide', url: 'https://youtu.be/PxjxY9VilCs?si=loLUuczdruGXSD6c' },
            { title: 'How to Manage Anxiety - Psychology Explained', url: 'https://www.youtube.com/results?search_query=anxiety+management+psychology' },
            { title: 'Breathing Techniques for Anxiety Relief', url: 'https://www.youtube.com/results?search_query=breathing+techniques+anxiety' },
            { title: 'Understanding Anxiety Disorders', url: 'https://www.youtube.com/results?search_query=anxiety+disorders+explained' }
        ],
        depression: [
            { title: 'Understanding Depression - Mental Health Matters', url: 'https://www.youtube.com/results?search_query=depression+mental+health' },
            { title: 'Coping Strategies for Depression', url: 'https://www.youtube.com/results?search_query=coping+depression+strategies' },
            { title: 'Building Resilience During Depression', url: 'https://www.youtube.com/results?search_query=resilience+depression' }
        ],
        stress: [
            { title: 'Stress Management Techniques', url: 'https://www.youtube.com/results?search_query=stress+management+techniques' },
            { title: 'Mindfulness and Meditation for Stress', url: 'https://www.youtube.com/results?search_query=mindfulness+meditation+stress' },
            { title: 'Understanding Stress Response', url: 'https://www.youtube.com/results?search_query=stress+response+psychology' }
        ],
        happy: [
            { title: 'The Psychology of Happiness', url: 'https://www.youtube.com/results?search_query=psychology+of+happiness' },
            { title: 'How to Maintain Positive Mental Health', url: 'https://www.youtube.com/results?search_query=positive+mental+health' },
            { title: 'Gratitude and Well-being', url: 'https://www.youtube.com/results?search_query=gratitude+well-being' }
        ],
        calm: [
            { title: 'Meditation for Calmness', url: 'https://www.youtube.com/results?search_query=meditation+relaxation' },
            { title: 'Progressive Muscle Relaxation', url: 'https://www.youtube.com/results?search_query=progressive+muscle+relaxation' },
            { title: 'How to Find Inner Peace', url: 'https://www.youtube.com/results?search_query=inner+peace+meditation' }
        ]
    };
    
    if (!videos[mood]) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2500;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="margin: 0; color: #9db4a0; font-size: 1.3rem;">📺 Recommended Videos</h3>
            <button onclick="this.closest('div').parentElement.parentElement.remove()" style="
                background: #f0ad4e;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: bold;
            ">✕</button>
        </div>
        <p style="color: #666; margin-bottom: 1rem; font-size: 0.95rem;">For your mood: <strong style="color: #9db4a0;">${mood.toUpperCase()}</strong></p>
        <div id="videos-container"></div>
    `;
    
    const videosContainer = content.querySelector('#videos-container');
    videos[mood].forEach(video => {
        const link = document.createElement('a');
        link.href = video.url;
        link.target = '_blank';
        link.style.cssText = `
            display: block;
            padding: 1rem;
            margin: 0.8rem 0;
            background: linear-gradient(135deg, #9db4a0, #b8d4e8);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.2s;
            border-left: 4px solid #f0ad4e;
        `;
        link.textContent = `🎥 ${video.title}`;
        link.onmouseover = () => {
            link.style.transform = 'translateX(5px)';
            link.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        };
        link.onmouseout = () => {
            link.style.transform = 'translateX(0)';
            link.style.boxShadow = 'none';
        };
        videosContainer.appendChild(link);
    });
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
 
document.getElementById('diary-text')?.addEventListener('input', updatePreview);
document.getElementById('font-select')?.addEventListener('change', updatePreview);
document.getElementById('bg-color')?.addEventListener('change', updatePreview);
document.getElementById('text-color')?.addEventListener('change', updatePreview);
document.getElementById('accent-color')?.addEventListener('change', updatePreview);

 
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = button.querySelector('.faq-toggle');
    
 
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            const itemAnswer = item.querySelector('.faq-answer');
            const itemToggle = item.querySelector('.faq-toggle');
            itemAnswer.style.display = 'none';
            itemToggle.textContent = '+';
            item.classList.remove('active');
        }
    });
     
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
        toggle.textContent = '−';
        faqItem.classList.add('active');
    } else {
        answer.style.display = 'none';
        toggle.textContent = '+';
        faqItem.classList.remove('active');
    }
}

 
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
 
window.addEventListener('scroll', () => {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});
 
window.addEventListener('load', () => {
    loadSavedEntries();
    updatePreview();
});

 
document.querySelector('.quick-exit')?.addEventListener('click', function() {
    
    alert('Taking you to a safe place. Make sure you come back and check on yourself later! 💚');
    window.location.href = 'https://www.google.com';
});

 
document.querySelectorAll('.game-card').forEach(card => {
    const description = card.getAttribute('data-description');
    if (description) {
        card.querySelector('.card-description').textContent = description;
    }
});

 
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', function() {
       
    });
});

 
function setActiveNavLink() {
 
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
     
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
      
        if (href === currentPage || 
            (currentPage === 'index.html' && href === 'index.html#mission') ||
            (currentPage === '' && href === 'index.html#mission')) {
            link.classList.add('active');
        }
    });
}
 
window.addEventListener('load', setActiveNavLink);
 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

 
let audioPlayed = false;
document.addEventListener('click', function playAudio() {
    if (!audioPlayed) {
        const audio = document.getElementById('bg-audio');
        if (audio) {
            audio.volume = 0.1; 
            audio.play().catch(() => {
                console.log('Audio autoplay not allowed');
            });
            audioPlayed = true;
        }
    }
}, { once: true });

 
document.querySelectorAll('.value-card[data-description]').forEach(card => {
    const description = card.getAttribute('data-description');
    const descDiv = card.querySelector('.value-description');
    if (descDiv) {
        descDiv.textContent = description;
    }
});
 
document.querySelectorAll('.attribute-card[data-description]').forEach(card => {
    const description = card.getAttribute('data-description');
    const descDiv = card.querySelector('.attr-description');
    if (descDiv) {
        descDiv.textContent = description;
    }
});

console.log('Solas Script loaded - Your safe space is ready 💚');
