// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Model photo filenames for both projects
    const projectPhotos = {
        'core-studio-4': {
            name: 'CORE STUDIO IV - LIBRARY',
            folder: 'MODEL PHOTOS/CORE STUDIO IV - LIBRARY',
            photos: [
                'DSC02705-2.jpg',
                'DSC02713.jpg',
                'DSC02714.jpg',
                'DSCF6264.jpg',
                'DSCF6285.jpg',
                'DSCF6301.jpg',
                'DSCF6306-2.jpg',
                'DSCF6336.jpg',
                'DSCF6338-2.jpg',
                'DSCF6346.jpg',
                'DSCF6360.jpg',
                'DSCF6369.jpg',
                'DSCF6373.jpg',
                'DSCF6387.jpg',
                'IMG_6226.jpg'
            ]
        },
        'core-studio-3': {
            name: 'CORE STUDIO III - HOUSE',
            folder: 'MODEL PHOTOS/CORE STUDIO III - HOUSE',
            photos: [
                'Interior 1.jpg',
                'Interior 2.jpg',
                'Overall 1.jpg',
                'Overall 2.jpg',
                'Exterior 1.jpg',
                '4T9A8882.jpg',
                '4T9A8891.jpg',
                'DSC01290-2.jpg',
                'DSC01312.jpg',
                'DSC01326.jpg',
                'Detail 1.jpg',
                'Detail 2.jpg',
                'Detail 3.jpg'
            ]
        }
    };

    let currentProject = 'core-studio-4'; // Default to CORE STUDIO IV

    function loadGalleryImages(projectKey = currentProject) {
        galleryGrid.innerHTML = ''; // Clear existing content
        
        const project = projectPhotos[projectKey];
        if (!project) return;
        
        currentProject = projectKey;
        
        project.photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = `${project.folder}/${photo}`;
            img.alt = `${project.name} - Photo ${index + 1}`;
            img.className = 'gallery-item';
            
            // Add click event for full-screen view
            img.addEventListener('click', function() {
                openFullScreen(img.src);
            });
            
            // Handle image loading errors
            img.addEventListener('error', function() {
                console.warn(`Failed to load image: ${photo}`);
                img.style.display = 'none';
            });
            
            galleryGrid.appendChild(img);
        });
    }

    function openFullScreen(imageSrc) {
        // Create full-screen overlay
        const fullScreenOverlay = document.createElement('div');
        fullScreenOverlay.className = 'full-screen-overlay';
        fullScreenOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;

        const fullScreenImg = document.createElement('img');
        fullScreenImg.src = imageSrc;
        fullScreenImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        `;

        fullScreenOverlay.appendChild(fullScreenImg);
        document.body.appendChild(fullScreenOverlay);

        // Close full-screen on click
        fullScreenOverlay.addEventListener('click', function() {
            document.body.removeChild(fullScreenOverlay);
        });

        // Close full-screen with Escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(fullScreenOverlay);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Check URL hash for project selection
    function loadProjectFromHash() {
        const hash = window.location.hash.substring(1);
        if (hash === 'core-studio-3' || hash === 'core-studio-4') {
            loadGalleryImages(hash);
        } else {
            loadGalleryImages('core-studio-4'); // Default
        }
    }

    // Load gallery images on page load
    loadProjectFromHash();
    
    // Handle hash changes
    window.addEventListener('hashchange', loadProjectFromHash);
    
    // Handle project title clicks for model photos page
    const projectTitleLinks = document.querySelectorAll('.project-title');
    projectTitleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's a local hash link (for model photos)
            if (href.startsWith('#')) {
                e.preventDefault();
                const projectKey = href.substring(1);
                
                // Only handle if it's a project with model photos
                if (projectKey === 'core-studio-4' || projectKey === 'core-studio-3') {
                    window.location.hash = projectKey;
                }
            }
            // Let external links (index.html#project) work normally
        });
    });
    
    // Update active state based on current hash
    function updateActiveProjectLink() {
        const hash = window.location.hash.substring(1);
        projectTitleLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${hash}`) {
                link.style.fontWeight = '700';
            } else if (href.startsWith('#')) {
                link.style.fontWeight = '500';
            }
        });
    }
    
    window.addEventListener('hashchange', updateActiveProjectLink);
    updateActiveProjectLink(); // Initial call
});
