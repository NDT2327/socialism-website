console.log("Home module loaded");

// Add event listeners for home page interactions
document.addEventListener('DOMContentLoaded', function() {
    // CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            showSection('theory');
        });
    }
    
    // Card click interactions
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});