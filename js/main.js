// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Load home module by default
    loadModule('home');
    
    // Add click event listeners to navigation buttons
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var module = this.getAttribute('data-module');
            
            // Update active state
            document.querySelectorAll('.nav-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Load module
            loadModule(module);
        });
    });
});

function loadModule(moduleName) {
    // Show loading state
    var content = document.getElementById('content');
    content.innerHTML = '<div class="text-center"><h2 style="color: var(--primary-red);"><i class="fas fa-sync fa-spin"></i> Đang tải nội dung...</h2></div>';
    
    // Simulate loading time for better UX
    setTimeout(function() {
        fetch('modules/' + moduleName + '.html')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Module not found');
                }
                return response.text();
            })
            .then(function(html) {
                content.innerHTML = html;
                var fadeElement = content.querySelector('.fade-in');
                if (fadeElement) {
                    fadeElement.style.opacity = '0';
                    fadeElement.style.transform = 'translateY(30px)';
                    setTimeout(function() {
                        fadeElement.style.transition = 'all 0.6s ease';
                        fadeElement.style.opacity = '1';
                        fadeElement.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                // Load module-specific script
                loadModuleScript(moduleName);
                
                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(function(error) {
                console.error('Error loading module:', error);
                content.innerHTML = 
                    '<div class="content-section">' +
                        '<h2 style="color: var(--primary-red);"><i class="fas fa-exclamation-triangle"></i> Lỗi tải trang</h2>' +
                        '<p>Không thể tải nội dung. Vui lòng thử lại sau.</p>' +
                        '<button class="btn" onclick="loadModule(\'home\')"><i class="fas fa-home"></i> Về trang chủ</button>' +
                    '</div>';
            });
    }, 300);
}

function loadModuleScript(moduleName) {
    // Remove existing module scripts
    var existingScripts = document.querySelectorAll('script[data-module]');
    for (var i = 0; i < existingScripts.length; i++) {
        existingScripts[i].remove();
    }
    
    // Load new module script
    var script = document.createElement('script');
    script.src = 'js/' + moduleName + '.js';
    script.setAttribute('data-module', moduleName);
    script.onerror = function() {
        console.log('No specific script found for ' + moduleName + ' module');
    };
    document.body.appendChild(script);
}

// Global utility functions
function showSection(sectionName) {
    // Update navigation with animation
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-module') === sectionName) {
            btn.classList.add('active');
        }
    });
    
    // Load module
    loadModule(sectionName);
}

// Enhanced smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Initialize animations on scroll
function initScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations after content loads
setTimeout(initScrollAnimations, 1000);