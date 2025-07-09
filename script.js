// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Add animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and step elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .about-text, .sustainability-graphic, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeEffect = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeEffect);
            }
        }, 100);
    }
    
    // Add simple fade-in animation for stats instead of counter
    const stats = document.querySelectorAll('.stat');
    const animateStats = () => {
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };
    
    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    if (heroSection) {
        statsObserver.observe(heroSection);
    }
});

// Download Functions
function downloadAPK() {
    // Show download notification
    showNotification('Preparing APK download...', 'info');
    
    // Simulate download delay
    setTimeout(() => {
        // Your APK file ID from Google Drive
        const googleDriveFileId = '15y36Zh3w9i7-L5eK2NZtrRB5bn1bCoGg';
        const apkUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;
        
        try {
            // For large files, open in new tab instead of direct download
            window.open(apkUrl, '_blank');
            
            showNotification('APK download started! Check your downloads folder.', 'success');
            
            // Track download event (you can integrate with analytics)
            trackDownload('APK');
            
        } catch (error) {
            console.error('Download error:', error);
            showNotification('Download failed. Please try again.', 'error');
        }
    }, 1000);
}

function downloadZIP() {
    // Show download notification
    showNotification('Preparing ZIP download...', 'info');
    
    // Simulate download delay
    setTimeout(() => {
        // Your ZIP file ID from Google Drive
        const googleDriveFileId = '1kcJN4X9Ooqil-Is41EuH3HyYEKIm1ZBV';
        const zipUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;
        
        try {
            // For large files, open in new tab instead of direct download
            window.open(zipUrl, '_blank');
            
            showNotification('ZIP download started! Check your downloads folder.', 'success');
            
            // Track download event (you can integrate with analytics)
            trackDownload('ZIP');
            
        } catch (error) {
            console.error('Download error:', error);
            showNotification('Download failed. Please try again.', 'error');
        }
    }, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.8';
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(closeButton);
    }, 5000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Analytics/Tracking (placeholder - integrate with your preferred analytics service)
function trackDownload(type) {
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'App Download',
            'event_label': type,
            'value': 1
        });
    }
    
    // Example: Custom analytics
    console.log(`Download tracked: ${type} at ${new Date().toISOString()}`);
    
    // You can also send to your own analytics endpoint
    // fetch('/api/track-download', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ type, timestamp: Date.now() })
    // });
}

// Loading Animation for Buttons
function addButtonLoading(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    return function removeLoading() {
        button.innerHTML = originalContent;
        button.disabled = false;
    };
}

// Mobile Menu Toggle (if you decide to add mobile menu later)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('mobile-open');
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close notifications with Escape key
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            const closeButton = notification.querySelector('.notification-close');
            if (closeButton) {
                closeNotification(closeButton);
            }
        });
    }
    
    // Download shortcuts
    if (e.ctrlKey || e.metaKey) {
        if (e.key === '1') {
            e.preventDefault();
            downloadAPK();
        } else if (e.key === '2') {
            e.preventDefault();
            downloadZIP();
        }
    }
});

// Performance optimization: Lazy load images when implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add some fun Easter eggs
let clickCount = 0;
document.querySelector('.nav-logo').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        showNotification('🎉 You found an Easter egg! Thanks for exploring PassOnBits!', 'success');
        clickCount = 0;
    }
});

// Simple feature detection and graceful degradation
function checkFeatureSupport() {
    // Check for intersection observer support
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all animated elements immediately
        const animatedElements = document.querySelectorAll('.feature-card, .step, .about-text, .sustainability-graphic');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // Check for local storage support (for future features)
    if (!('localStorage' in window)) {
        console.warn('LocalStorage not supported. Some features may be limited.');
    }
}

// Run feature detection on load
document.addEventListener('DOMContentLoaded', checkFeatureSupport);
