// CORE STUDIO V - INCREMENTAL HOUSING Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Model photo filenames for CORE STUDIO V - INCREMENTAL HOUSING
    const coreStudio5Photos = [
        'DSC04149.jpg',
        'DSC04183.jpg',
        'DSC04194.jpg',
        'DSC04219-2.jpg',
        'DSC04228.jpg',
        'DSC04236.jpg',
        'DSC04255.jpg',
        'DSC04258.jpg',
        'DSC04266.jpg',
        'DSC04267.jpg',
        'DSC04275.jpg',
        'DSC04290.jpg',
        'DSC04305.jpg',
        'DSC04318.jpg',
        'DSC04322.jpg',
        'DSC04324.jpg',
        'DSC04328.jpg',
        'DSC04337.jpg',
        'DSC04342.jpg',
        'DSC04343.jpg',
        'DSC04357.jpg',
        'DSC04358.jpg',
        'DSC04360.jpg',
        'DSC04367.jpg',
        'DSC04371.jpg',
        'DSC04394.jpg',
        'DSC04397.jpg',
        'DSC04413.jpg',
        'DSC04415.jpg',
        'DSC04435.jpg',
        'DSC04447.jpg'
    ];

    function loadGalleryImages() {
        galleryGrid.innerHTML = ''; // Clear existing content
        
        coreStudio5Photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = `MODEL PHOTOS/CORE STUDIO V - INCREMENTAL HOUSING/${photo}`;
            img.alt = `CORE STUDIO V - INCREMENTAL HOUSING - Photo ${index + 1}`;
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

    // Load gallery images on page load
    loadGalleryImages();
});
