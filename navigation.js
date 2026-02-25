// Smooth Scroll Navigation for Portfolio Page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation script loaded');
    
    // Get all project title links
    const projectLinks = document.querySelectorAll('.project-title');
    console.log('Found project links:', projectLinks.length);
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('Project link clicked:', href);
            
            // Only handle hash links for smooth scrolling
            if (href && href.startsWith('#')) {
                console.log('Hash link detected, handling smooth scroll');
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    console.log('Target element found:', targetId);
                    // Get the left scroll container
                    const leftScroll = document.querySelector('.left-scroll');
                    
                    if (leftScroll) {
                        console.log('Left scroll container found');
                        // Calculate position relative to the scroll container
                        const elementPosition = targetElement.offsetTop;
                        const scrollPosition = elementPosition - 32; // 2rem offset
                        
                        console.log('Scrolling to position:', scrollPosition);
                        
                        // Smooth scroll within the left scroll container
                        leftScroll.scrollTo({
                            top: scrollPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active state styling
                        projectLinks.forEach(l => l.style.fontWeight = '500');
                        this.style.fontWeight = '700';
                    } else {
                        console.log('Left scroll container NOT found');
                    }
                } else {
                    console.log('Target element NOT found:', targetId);
                }
            } else {
                // For all other links, let them work normally
                console.log('Non-hash link, allowing default behavior');
            }
        });
    });
    
    // Handle hash navigation on page load
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        console.log('Hash navigation:', hash);
        if (hash) {
            const targetElement = document.getElementById(hash);
            const leftScroll = document.querySelector('.left-scroll');
            if (targetElement && leftScroll) {
                setTimeout(() => {
                    const elementPosition = targetElement.offsetTop;
                    const scrollPosition = elementPosition - 32;
                    console.log('Hash scroll to position:', scrollPosition);
                    leftScroll.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }
    
    // Check for hash on page load
    handleHashNavigation();
});
