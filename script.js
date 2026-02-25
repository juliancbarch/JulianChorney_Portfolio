// Gallery Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('model-photo-gallery');
    const modalContent = modal.querySelector('.modal-content');
    const galleryGrid = modal.querySelector('.gallery-grid');
    const closeBtn = modal.querySelector('.close');
    const modelPhotosLink = document.querySelector('a[href="#model-photos"]');

    // Model photo filenames (you can update these with your actual model photos)
    const modelPhotos = [
        'model-photo-1.jpg',
        'model-photo-2.jpg',
        'model-photo-3.jpg',
        'model-photo-4.jpg',
        'model-photo-5.jpg',
        'model-photo-6.jpg'
    ];

    // Open modal when Model Photos link is clicked
    modelPhotosLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function openModal() {
        // Load gallery images if not already loaded
        if (galleryGrid.children.length === 0) {
            loadGalleryImages();
        }
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }

    function loadGalleryImages() {
        galleryGrid.innerHTML = ''; // Clear existing content
        
        modelPhotos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = `PORTFOLIO/${photo}`;
            img.alt = `Model Photo ${index + 1}`;
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
});
