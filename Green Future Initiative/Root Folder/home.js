// home.js - Home page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tree counter animation
    initTreeCounter();
    
    // Initialize news carousel if exists
    initNewsCarousel();
    
    // Initialize image gallery if exists
    initImageGallery();
});

// Tree Counter Animation
function initTreeCounter() {
    const treeCounter = document.querySelector('.tree-counter .counter-number');
    
    if (treeCounter) {
        const target = 15237;
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                treeCounter.textContent = Math.ceil(current).toLocaleString();
                setTimeout(updateCounter, 20);
            } else {
                treeCounter.textContent = target.toLocaleString();
            }
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(treeCounter);
    }
}

// News Carousel
function initNewsCarousel() {
    const newsContainer = document.querySelector('.news-grid');
    
    if (newsContainer && window.innerWidth < 768) {
        // Only initialize on mobile devices
        let currentIndex = 0;
        const newsCards = Array.from(newsContainer.children);
        const totalCards = newsCards.length;
        
        // Set initial state
        newsCards.forEach((card, index) => {
            if (index !== 0) {
                card.style.display = 'none';
            }
        });
        
        // Create navigation buttons if needed
        const navContainer = document.createElement('div');
        navContainer.style.textAlign = 'center';
        navContainer.style.marginTop = '20px';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '‹';
        prevBtn.className = 'btn btn-outline';
        prevBtn.style.marginRight = '10px';
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '›';
        nextBtn.className = 'btn btn-outline';
        
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
        
        newsContainer.parentNode.appendChild(navContainer);
        
        // Navigation functions
        function showCard(index) {
            newsCards.forEach(card => {
                card.style.display = 'none';
            });
            
            newsCards[index].style.display = 'block';
            currentIndex = index;
        }
        
        prevBtn.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = totalCards - 1;
            showCard(newIndex);
        });
        
        nextBtn.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= totalCards) newIndex = 0;
            showCard(newIndex);
        });
    }
}

// Image Gallery with Lightbox
function initImageGallery() {
    const imageCards = document.querySelectorAll('.image-card');
    
    imageCards.forEach(card => {
        card.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.image-caption h3').textContent;
            
            openLightbox(imgSrc, caption);
        });
    });
    
    function openLightbox(imgSrc, caption) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.style.cursor = 'pointer';
        
        // Create image element
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '8px';
        
        // Create caption
        const captionElement = document.createElement('div');
        captionElement.textContent = caption;
        captionElement.style.color = 'white';
        captionElement.style.position = 'absolute';
        captionElement.style.bottom = '20px';
        captionElement.style.textAlign = 'center';
        captionElement.style.width = '100%';
        captionElement.style.padding = '10px';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '2rem';
        closeBtn.style.cursor = 'pointer';
        
        // Append elements to lightbox
        lightbox.appendChild(img);
        lightbox.appendChild(captionElement);
        lightbox.appendChild(closeBtn);
        
        // Add to document
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === closeBtn) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
}