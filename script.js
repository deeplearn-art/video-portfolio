// Video portfolio data - loaded from videodata.json
let videoData = [];

// DOM elements
const videoGrid = document.getElementById('videoGrid');
const navLinks = document.querySelectorAll('.nav-link');

// Load video data from JSON file
async function loadVideoData() {
    // Check if running from file:// protocol
    if (window.location.protocol === 'file:') {
        showErrorMessage(
            'CORS Error: This page must be served from a web server.<br><br>' +
            '<strong>Quick Solutions:</strong><br>' +
            '1. Use Python: <code>python -m http.server 8000</code> then open <code>http://localhost:8000</code><br>' +
            '2. Use Node.js: <code>npx http-server</code> then open the provided URL<br>' +
            '3. Use VS Code: Install "Live Server" extension and click "Go Live"<br><br>' +
            'Or use the included <code>start-server.bat</code> file.'
        );
        return [];
    }
    
    try {
        const response = await fetch('videodata.json');
        if (!response.ok) {
            throw new Error(`Failed to load video data: ${response.statusText}`);
        }
        videoData = await response.json();
        return videoData;
    } catch (error) {
        console.error('Error loading video data:', error);
        showErrorMessage('Failed to load video data. Please check that videodata.json exists and is valid.');
        return [];
    }
}

// Show error message in the video grid
function showErrorMessage(message) {
    if (videoGrid) {
        videoGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-tertiary); max-width: 800px; margin: 0 auto;">
                <h3 style="color: var(--text-dark); margin-bottom: 1rem;">Error Loading Videos</h3>
                <div style="text-align: left; background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; border: 2px solid var(--border-light);">
                    ${message}
                </div>
            </div>
        `;
    }
}

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', async function() {
    setupNavigation();
    setupSmoothScrolling();
    setupThemeToggle();
    loadThemePreference();
    setCurrentYear();

    // Load video data first, then display videos
    await loadVideoData();
    
    // Check which page we're on and load appropriate content
    const isVideosPage = window.location.pathname.includes('videos.html') || 
                         window.location.pathname.endsWith('videos.html');
    const isShortsPage = window.location.pathname.includes('shorts.html') || 
                         window.location.pathname.endsWith('shorts.html');
    
    if (isVideosPage) {
        loadAllVideos();
    } else if (isShortsPage) {
        loadAllShorts();
    } else {
        // Home page - load featured videos and shorts
        loadVideos(); // Featured videos (top 3)
        loadShorts(); // Featured shorts (top 3)
    }
});

// Load and display videos (featured - top 3 by ID, type: "video")
function loadVideos() {
    // Filter by type "video"
    const videos = videoData.filter(item => item.type === 'video');
    
    if (videos.length === 0) {
        showNoVideosMessage();
        return;
    }

    // Sort by ID descending (highest first) and get top 3
    const sortedVideos = [...videos].sort((a, b) => {
        const idA = Number(a.id);
        const idB = Number(b.id);
        return idB - idA; // Descending order
    });
    const featuredVideos = sortedVideos.slice(0, 3);

    videoGrid.innerHTML = '';
    
    featuredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
    
    // Add "More videos" link if there are more than 3 videos
    if (sortedVideos.length > 3) {
        const moreLink = document.createElement('a');
        moreLink.href = 'videos.html';
        moreLink.textContent = 'More videos';
        moreLink.className = 'more-videos-link';
        moreLink.style.cssText = 'grid-column: 1 / -1; text-align: center; margin-top: 2rem; color: var(--text-primary, #ffffff); text-decoration: underline; font-size: 1rem;';
        videoGrid.appendChild(moreLink);
    }
}

// Load and display shorts (featured - top 3 by ID, type: "short")
function loadShorts() {
    // Filter by type "short"
    const shorts = videoData.filter(item => item.type === 'short');
    
    if (shorts.length === 0) {
        showNoShortsMessage();
        return;
    }

    // Sort by ID descending (highest first) and get top 3
    const sortedShorts = [...shorts].sort((a, b) => {
        const idA = Number(a.id);
        const idB = Number(b.id);
        return idB - idA; // Descending order
    });
    const featuredShorts = sortedShorts.slice(0, 3);

    const shortsGrid = document.getElementById('shortsGrid');
    if (!shortsGrid) return;
    
    shortsGrid.innerHTML = '';
    
    featuredShorts.forEach(short => {
        const videoCard = createVideoCard(short);
        shortsGrid.appendChild(videoCard);
    });
    
    // Add "More shorts" link if there are more than 3 shorts
    if (sortedShorts.length > 3) {
        const moreLink = document.createElement('a');
        moreLink.href = 'shorts.html';
        moreLink.textContent = 'More shorts';
        moreLink.className = 'more-shorts-link';
        moreLink.style.cssText = 'grid-column: 1 / -1; text-align: center; margin-top: 2rem; color: var(--text-primary, #ffffff); text-decoration: underline; font-size: 1rem;';
        shortsGrid.appendChild(moreLink);
    }
}

// Load and display all videos (for videos page, type: "video")
function loadAllVideos() {
    // Filter by type "video"
    const videos = videoData.filter(item => item.type === 'video');
    
    if (videos.length === 0) {
        showNoVideosMessage();
        return;
    }

    videoGrid.innerHTML = '';
    
    // Sort by ID descending (highest first)
    const sortedVideos = [...videos].sort((a, b) => {
        const idA = Number(a.id);
        const idB = Number(b.id);
        return idB - idA; // Descending order
    });
    
    sortedVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoGrid.appendChild(videoCard);
    });
}

// Load and display all shorts (for shorts page, type: "short")
function loadAllShorts() {
    // Filter by type "short"
    const shorts = videoData.filter(item => item.type === 'short');
    
    if (shorts.length === 0) {
        showNoShortsMessage();
        return;
    }

    videoGrid.innerHTML = '';
    
    // Sort by ID descending (highest first)
    const sortedShorts = [...shorts].sort((a, b) => {
        const idA = Number(a.id);
        const idB = Number(b.id);
        return idB - idA; // Descending order
    });
    
    sortedShorts.forEach(short => {
        const videoCard = createVideoCard(short);
        videoGrid.appendChild(videoCard);
    });
}

// Truncate description text to a character limit
function truncateDescription(text, maxLength = 150) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength).trim() + '...';
}

// Create a video card element
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.cursor = 'pointer';
    
    // Streamable embed URL format: https://streamable.com/e/{videoId}
    const embedUrl = `https://streamable.com/e/${video.streamableId}`;
    
    // Truncate description for card display
    const truncatedDescription = truncateDescription(video.description, 150);
    
    card.innerHTML = `
        <div class="video-embed">
            <iframe 
                src="${embedUrl}" 
                frameborder="0" 
                allowfullscreen
                loading="lazy"
                class="video-iframe">
            </iframe>
            <div class="video-overlay">
                <div class="play-button-overlay">
                    <svg class="play-icon" viewBox="0 0 24 24" fill="white" width="64" height="64">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${truncatedDescription}</p>
        </div>
    `;
    
    // Add click event to open video in modal
    const overlay = card.querySelector('.video-overlay');
    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openVideoModal(video);
    });
    
    // Also make the card clickable for the info section
    const videoInfo = card.querySelector('.video-info');
    videoInfo.addEventListener('click', () => {
        openVideoModal(video);
    });
    
    return card;
}

// Show message when no videos are available
function showNoVideosMessage() {
    if (videoGrid) {
        videoGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-tertiary);">
                <h3 style="color: var(--text-dark); margin-bottom: 1rem;">No videos available</h3>
                <p>Please add your Streamable video IDs to videodata.json</p>
            </div>
        `;
    }
}

// Show message when no shorts are available
function showNoShortsMessage() {
    const shortsGrid = document.getElementById('shortsGrid');
    if (shortsGrid) {
        shortsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-tertiary);">
                <h3 style="color: var(--text-dark); margin-bottom: 1rem;">No shorts available</h3>
                <p>Please add your Streamable video IDs to videodata.json</p>
            </div>
        `;
    }
}

// Setup navigation functionality
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Allow normal navigation for external links (not starting with #)
            if (href && !href.startsWith('#')) {
                return; // Let the browser handle the navigation
            }
            
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup smooth scrolling for all internal links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position (only on index.html)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}` || (href === 'index.html' && sectionId === 'home')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Add loading animation for videos
function showLoadingState() {
    videoGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Utility function to add a new video
function addVideo(title, description, streamableId) {
    const newVideo = {
        id: `video-${Date.now()}`,
        title: title,
        description: description,
        streamableId: streamableId
    };
    
    videoData.push(newVideo);
    loadVideos();
}

// Utility function to remove a video
function removeVideo(videoId) {
    const index = videoData.findIndex(video => video.id === videoId);
    if (index > -1) {
        videoData.splice(index, 1);
        loadVideos();
    }
}

// Example of how to add videos programmatically
// addVideo('My New Video', 'Description of the video', 'your-streamable-video-id');

// Video Modal Functions
function openVideoModal(video) {
    // Create modal overlay if it doesn't exist
    let modal = document.getElementById('videoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'videoModal';
        modal.className = 'video-modal';
        document.body.appendChild(modal);
    }
    
    // Streamable embed URL format: https://streamable.com/e/{videoId}
    const embedUrl = `https://streamable.com/e/${video.streamableId}`;
    
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-video-container">
                <iframe 
                    src="${embedUrl}" 
                    frameborder="0" 
                    allowfullscreen
                    class="modal-video">
                </iframe>
            </div>
            <div class="modal-info">
                <input type="text" class="modal-title-field" value="${escapeHtml(video.title)}" readonly>
                <textarea class="modal-description-field" readonly>${escapeHtml(video.description)}</textarea>
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeVideoModal);
    overlay.addEventListener('click', closeVideoModal);
    
    // Close on Escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Clear modal content after animation
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.innerHTML = '';
            }
        }, 300);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Theme Toggle Functions
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        setTheme(newTheme);
        saveThemePreference(newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function getThemePreference() {
    return localStorage.getItem('theme') || 'dark';
}

function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

function loadThemePreference() {
    const savedTheme = getThemePreference();
    setTheme(savedTheme);
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Console helper functions for easy video management
console.log('Video Portfolio loaded!');
console.log('Use addVideo(title, description, streamableId) to add videos');
console.log('Use removeVideo(videoId) to remove videos');
console.log('Current videos:', videoData);

