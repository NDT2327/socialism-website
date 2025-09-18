console.log("Practice module loaded");

// Add interactive timeline effects
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Add click to expand functionality
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        content.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '10';
            } else {
                this.style.transform = '';
                this.style.zIndex = '';
            }
        });
    });
});