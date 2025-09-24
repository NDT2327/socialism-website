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

    // Mở popup khi click vào card
    document.querySelectorAll('.open-popup').forEach(card => {
        card.addEventListener('click', () => {
            const popupId = card.getAttribute('data-popup');
            document.getElementById(popupId).style.display = 'block';
        });
    });

    // Đóng popup khi click vào dấu X
    document.querySelectorAll('.popup .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.popup').style.display = 'none';
        });
    });

    // Đóng popup khi click bên ngoài popup-content
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.popup').forEach(popup => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        });
    });
});