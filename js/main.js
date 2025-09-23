// Enhanced Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Load home module by default
    loadModule('home');
    
    // Initialize enhancements
    initScrollToTop();
    initAnimations();
    initParticleEffect();
    
    // Add click event listeners to navigation buttons
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var module = this.getAttribute('data-module');
            
            // Update active state with enhanced animation
            document.querySelectorAll('.nav-btn').forEach(function(b) {
                b.classList.remove('active');
                b.style.transform = '';
            });
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Load module
            loadModule(module);
        });
    });
});

function loadModule(moduleName) {
    // Show enhanced loading state
    var content = document.getElementById('content');
    content.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <h2 style="color: var(--primary-red);">
                <i class="fas fa-sync fa-spin"></i> Đang tải nội dung ${getModuleName(moduleName)}...
            </h2>
        </div>
    `;
    
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
                
                // Reinitialize animations for new content
                initAnimations();
                
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
    }, 500);
}

function getModuleName(module) {
    var names = {
        'home': 'Trang chủ',
        'theory': 'Lý thuyết',
        'practice': 'Thực tiễn VN',
        'alliance': 'Liên minh giai cấp',
        'quiz': 'Quiz'
    };
    return names[module] || module;
}

function loadModuleScript(moduleName) {
    console.log("Loading script for module:", moduleName);
    
    // Remove existing module scripts
    var existingScripts = document.querySelectorAll('script[data-module]');
    existingScripts.forEach(function(script) {
        console.log("Removing existing script:", script.src);
        script.remove();
    });
    
    // Load new module script
    var script = document.createElement('script');
    script.src = 'js/' + moduleName + '.js';
    script.setAttribute('data-module', moduleName);
    
    script.onload = function() {
        console.log('✅ Script successfully loaded for', moduleName, 'module');
        
        // For quiz module, no need for complex initialization
        // The script will auto-initialize with event delegation
        if (moduleName === 'quiz') {
            console.log("ℹ️ Quiz module loaded with event delegation - no manual init needed");
        }
    };
    
    script.onerror = function() {
        console.log('ℹ️ No specific script found for', moduleName, 'module (this is ok for some modules)');
    };
    
    document.body.appendChild(script);
    console.log("Script element added to body for:", moduleName);
}

// Global utility functions
function showSection(sectionName) {
    // Update navigation with enhanced animation
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.classList.remove('active');
        btn.style.transform = '';
        if (btn.getAttribute('data-module') === sectionName) {
            btn.classList.add('active');
            btn.style.transform = 'scale(1.05)';
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

// Initialize scroll to top functionality
function initScrollToTop() {
    var scrollBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize animations on scroll
function initScrollAnimations() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all content sections and cards
    document.querySelectorAll('.content-section, .card, .stat-card').forEach(function(section) {
        if (!section.style.transition) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.6s ease';
        }
        observer.observe(section);
    });
}

// Initialize animations with enhanced effects
function initAnimations() {
    // Delay to ensure content is loaded
    setTimeout(function() {
        initScrollAnimations();
        
        // Add hover effects to cards
        document.querySelectorAll('.card').forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add click effects to buttons
        document.querySelectorAll('.btn, .cta-button').forEach(function(btn) {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
    }, 100);
}

// Initialize particle effect
function initParticleEffect() {
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.98) { // Reduced frequency for better performance
            createParticle(e.clientX, e.clientY);
        }
    });
}

function createParticle(x, y) {
    var particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--random-x', (Math.random() * 100 - 50) + 'px');
    particle.style.setProperty('--random-y', (Math.random() * 100 - 50) + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(function() {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 2000);
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    var timeout;
    return function executedFunction() {
        var later = function() {
            clearTimeout(timeout);
            func.apply(this, arguments);
        };
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
    };
}

// Apply throttling to scroll events
var throttledScroll = throttle(function() {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Preload critical resources
function preloadResources() {
    var criticalImages = [
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1609690127419-df9e88ac15fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    ];
    
    criticalImages.forEach(function(src) {
        var img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadResources();

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey) {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            showSection('home');
        }
    }
    
    // Press 'T' for theory
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.altKey) {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            showSection('theory');
        }
    }
    
    // Press Escape to scroll to top
    if (e.key === 'Escape') {
        scrollToTop();
    }
});

// Initialize all enhancements after DOM is ready
setTimeout(function() {
    initScrollAnimations();
    
    // Add subtle animation to navigation on load
    document.querySelectorAll('.nav-btn').forEach(function(btn, index) {
        setTimeout(function() {
            btn.style.transform = 'translateY(-10px)';
            setTimeout(function() {
                btn.style.transform = '';
            }, 200);
        }, index * 100);
    });
}, 1000);