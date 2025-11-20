// services.js - Services page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize service cards interaction
    initServiceCards();
    
    // Initialize resource download tracking
    initResourceDownloads();
});

// Service Cards Interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add click event to service cards
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking a link
            if (e.target.tagName !== 'A') {
                this.classList.toggle('expanded');
                
                if (this.classList.contains('expanded')) {
                    this.style.transform = 'scale(1.02)';
                } else {
                    this.style.transform = 'scale(1)';
                }
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Resource Download Tracking
function initResourceDownloads() {
    const downloadLinks = document.querySelectorAll('a[href="#"]');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const resourceType = this.closest('.resource-card').querySelector('h3').textContent;
            
            // In a real application, you would send this data to your analytics
            console.log(`Resource downloaded: ${resourceType}`);
            
            // Show success message
            showNotification(`Thank you for downloading our ${resourceType.toLowerCase()}!`, 'success');
            
            // Simulate download (in a real app, this would be an actual download)
            setTimeout(() => {
                // This would typically redirect to the actual download URL
                // window.location.href = 'path/to/actual/resource.pdf';
            }, 1000);
        });
    });
}