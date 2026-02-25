// BOOK Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Model photo filenames for BOOK - BOOK PHOTOS first, then LAUNCH PHOTOS
    const bookPhotos = [
        // BOOK PHOTOS (first 16)
        'DSC04864.jpg',
        'DSC04867.jpg',
        'DSC04869.jpg',
        'DSC04891.jpg',
        'DSC04896.jpg',
        'DSC04910.jpg',
        'DSC04923.jpg',
        'DSC05348.jpg',
        'DSC05355.jpg',
        'DSC05362.jpg',
        'DSC05380.jpg',
        'DSC05387.jpg',
        'DSC05414.jpg',
        'DSC05416.jpg',
        'DSC05430.jpg',
        'DSC05443.jpg',
        // LAUNCH PHOTOS (last 8)
        '4U0A2088.jpg',
        '4U0A2125.jpg',
        '4U0A2129.jpg',
        '4U0A2131.jpg',
        '4U0A2149.jpg',
        '4U0A2157.jpg',
        '4U0A2183.jpg',
        '4U0A2185.jpg'
    ];

    function loadGalleryImages() {
        galleryGrid.innerHTML = ''; // Clear existing content
        
        bookPhotos.forEach((photo, index) => {
            const img = document.createElement('img');
            
            // Determine folder based on photo name
            let folder;
            if (photo.startsWith('DSC')) {
                folder = 'MODEL PHOTOS/BOOK/BOOK PHOTOS';
            } else if (photo.startsWith('4U0A')) {
                folder = 'MODEL PHOTOS/BOOK/LAUNCH PHOTOS';
            }
            
            img.src = `${folder}/${photo}`;
            img.alt = `BOOK - Photo ${index + 1}`;
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
