// ORDINARY BREAKS Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Model photo filenames for ORDINARY BREAKS
    const ordinaryBreaksPhotos = [
        '3X6A2588.jpg',
        '3X6A2600.jpg',
        '3X6A2607.jpg',
        '3X6A2616.jpg',
        '3X6A2617.jpg',
        '3X6A2632.jpg',
        '3X6A2637-2.jpg',
        '3X6A2637.jpg',
        '3X6A2661.jpg'
    ];

    function loadGalleryImages() {
        galleryGrid.innerHTML = ''; // Clear existing content
        
        ordinaryBreaksPhotos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = `MODEL PHOTOS/ORDINARY BREAKS/${photo}`;
            img.alt = `ORDINARY BREAKS - Photo ${index + 1}`;
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
