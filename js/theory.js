console.log("Theory module loaded");

// Add interactive elements for theory page
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to important terms
    const strongElements = document.querySelectorAll('strong');
    strongElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.title = 'Thuật ngữ quan trọng';
        
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #fff3cd, #ffeaa7)';
            this.style.padding = '2px 4px';
            this.style.borderRadius = '4px';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.padding = '';
            this.style.borderRadius = '';
        });
    });
});