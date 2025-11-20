// enquiry.js - Enquiry page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize involvement options
    initInvolvementOptions();
    
    // Initialize donation form
    initDonationForm();
    
    // Initialize volunteer form
    initVolunteerForm();
    
    // Initialize partnership form
    initPartnershipForm();
});

// Involvement Options Interaction
function initInvolvementOptions() {
    const involvementCards = document.querySelectorAll('.involvement-card');
    
    involvementCards.forEach(card => {
        card.addEventListener('click', function() {
            // Scroll to the corresponding form
            const link = this.querySelector('a');
            if (link) {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}

// Donation Form Handling
function initDonationForm() {
    const donationForm = document.querySelector('#donation-form form');
    
    if (donationForm) {
        // Add donation amount options
        const amountInput = document.getElementById('donation-amount');
        const amountOptions = document.createElement('div');
        amountOptions.className = 'donation-options';
        amountOptions.style.display = 'flex';
        amountOptions.style.gap = '10px';
        amountOptions.style.marginBottom = '15px';
        amountOptions.style.flexWrap = 'wrap';
        
        const presetAmounts = [50, 100, 250, 500, 1000];
        
        presetAmounts.forEach(amount => {
            const option = document.createElement('button');
            option.type = 'button';
            option.textContent = `R${amount}`;
            option.className = 'btn btn-outline';
            option.style.flex = '1';
            option.style.minWidth = '80px';
            
            option.addEventListener('click', function() {
                amountInput.value = amount;
            });
            
            amountOptions.appendChild(option);
        });
        
        amountInput.parentNode.insertBefore(amountOptions, amountInput);
        
        // Form submission
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    const amount = document.getElementById('donation-amount').value;
                    
                    // In a real application, you would process the payment here
                    console.log(`Donation of R${amount} processed`);
                    
                    // Show success message
                    showNotification(`Thank you for your donation of R${amount}!`, 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// Volunteer Form Handling
function initVolunteerForm() {
    const volunteerForm = document.querySelector('#volunteer-form form');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    const formData = new FormData(this);
                    const formObject = {};
                    
                    for (let [key, value] of formData.entries()) {
                        formObject[key] = value;
                    }
                    
                    console.log('Volunteer application submitted:', formObject);
                    
                    // Show success message
                    showNotification('Thank you for your volunteer application! We will contact you soon.', 'success');
                    
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

// Partnership Form Handling
function initPartnershipForm() {
    const partnershipForm = document.querySelector('#partner-form form');
    
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    const formData = new FormData(this);
                    const formObject = {};
                    
                    for (let [key, value] of formData.entries()) {
                        formObject[key] = value;
                    }
                    
                    console.log('Partnership inquiry submitted:', formObject);
                    
                    // Show success message
                    showNotification('Thank you for your partnership inquiry! We will contact you soon.', 'success');
                    
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