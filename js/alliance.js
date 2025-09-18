console.log("Alliance module loaded");

// Add interactive elements for alliance page
document.addEventListener('DOMContentLoaded', function() {
    // Add progressive disclosure for detailed information
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3');
        if (title) {
            title.style.cursor = 'pointer';
            title.addEventListener('click', function() {
                const content = this.nextElementSibling;
                if (content) {
                    const isCollapsed = content.style.display === 'none';
                    content.style.display = isCollapsed ? 'block' : 'none';
                    this.style.color = isCollapsed ? '#20c997' : '#28a745';
                }
            });
        }
    });
    
    // Add highlighting for key statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = '';
        });
    });
});