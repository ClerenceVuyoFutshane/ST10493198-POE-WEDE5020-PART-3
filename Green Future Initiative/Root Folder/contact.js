// contact.js - Contact page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
    
    // Initialize map if available
    initMap();
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('form[action="submit_contact_form.html"]');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // In a real application, you would send the form data to a server
                    const formData = new FormData(this);
                    const formObject = {};
                    
                    for (let [key, value] of formData.entries()) {
                        formObject[key] = value;
                    }
                    
                    console.log('Form submitted:', formObject);
                    
                    // Show success message
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
}

// Map Initialization (Google Maps API)
function initMap() {
    // Check if map container exists
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // In a real application, you would initialize Google Maps here
        // For now, we'll just show a placeholder
        
        mapContainer.innerHTML = `
            <div style="width: 100%; height: 100%; background-color: #f0f0f0; 
                        display: flex; justify-content: center; align-items: center; 
                        border-radius: 8px;">
                <p style="color: #666;">Map would be displayed here</p>
            </div>
        `;
        
        console.log('Map container found. In a real application, Google Maps would be initialized here.');
    }
}