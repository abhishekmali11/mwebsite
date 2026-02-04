// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Update active link
            updateActiveLink(this);
        }
    });
});

// Carousel Auto-slide Dots Animation
function createCarouselDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    const numberOfSlides = 6;
    const dots = [];
    
    for (let i = 0; i < numberOfSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            background: var(--primary-color);
            border-radius: 50%;
            transition: all 0.3s ease;
            cursor: pointer;
        `;
        dots.push(dot);
        dotsContainer.appendChild(dot);
    }
    
    // Update active dot every 4 seconds
    let currentDot = 0;
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentDot) {
                dot.style.transform = 'scale(1.5)';
                dot.style.opacity = '1';
            } else {
                dot.style.transform = 'scale(1)';
                dot.style.opacity = '0.3';
            }
        });
        currentDot = (currentDot + 1) % numberOfSlides;
    }
    
    updateDots();
    setInterval(updateDots, 4000);
}

// Initialize carousel dots on page load
window.addEventListener('load', () => {
    createCarouselDots();
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
    
    // Update active navigation link based on scroll position
    updateActiveNavOnScroll();
});

// Update Active Navigation Link Based on Scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update Active Link on Click
function updateActiveLink(clickedLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and elements for animation
const animateElements = document.querySelectorAll('.product-card, .service-card, .location-card, .stat-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling


// Add smooth reveal animation to sections on load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
});

// Prevent default form submission for better UX
document.querySelectorAll('form').forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});

// Add loading animation for images (if you add images later)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Scroll to top button (optional - can be added to HTML)
let scrollTopBtn;

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('id', 'scrollTopBtn');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
createScrollTopButton();

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social Media Cards Animation
const socialCards = document.querySelectorAll('.social-card');

socialCards.forEach((card, index) => {
    // Hover effect with 3D tilt
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
    
    // Add click animation
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'social-ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS animation for ripple
const socialStyle = document.createElement('style');
socialStyle.textContent = `
    @keyframes social-ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
            margin-left: -150px;
            margin-top: -150px;
        }
    }
`;
document.head.appendChild(socialStyle);

// Observe social cards for scroll animation
const socialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            socialObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

socialCards.forEach(card => {
    card.style.animationPlayState = 'paused';
    socialObserver.observe(card);
});

// Contact Section Animations
const contactCards = document.querySelectorAll('.contact-card-3d');

contactCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        const iconCircle = this.querySelector('.icon-circle');
        if (iconCircle) {
            iconCircle.style.transform = 'scale(1.2) rotate(360deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        const iconCircle = this.querySelector('.icon-circle');
        if (iconCircle) {
            iconCircle.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add click to copy functionality
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(37, 99, 235, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple-expand 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-expand {
        from {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animate visual elements on scroll into view
const contactVisual = document.querySelector('.contact-visual-wrapper');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const floatItems = entry.target.querySelectorAll('.float-item');
            floatItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0)';
                setTimeout(() => {
                    item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 100);
            });
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (contactVisual) {
    contactObserver.observe(contactVisual);
}

// Add parallax effect to floating elements
document.addEventListener('mousemove', (e) => {
    const floatItems = document.querySelectorAll('.float-item');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    floatItems.forEach((item, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 0.5) * 30 * speed;
        const yOffset = (y - 0.5) * 30 * speed;
        item.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Location Cards Timeline Animation
const locationBlocks = document.querySelectorAll('.location-block');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

locationBlocks.forEach(block => {
    timelineObserver.observe(block);
});

// Auto-flip card hint after a few seconds
setTimeout(() => {
    const firstCard = document.querySelector('.location-card');
    if (firstCard) {
        firstCard.classList.add('hint-flip');
        firstCard.querySelector('.card-front').style.transform = 'rotateY(-20deg)';
        
        setTimeout(() => {
            firstCard.querySelector('.card-front').style.transform = 'rotateY(0deg)';
        }, 800);
    }
}, 2000);

// Console message for developers
console.log('%cMahakali Enterprises', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cSafety First, Quality Always', 'color: #f59e0b; font-size: 14px;');
console.log('Website developed for construction safety net solutions');

// Performance optimization - lazy load sections
if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.05
    });
    
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Stats Counter Animation - Simplified and Fixed
let statsAnimated = false;

function animateCounters() {
    if (statsAnimated) return;
    
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((counter, index) => {
        setTimeout(() => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100; // 100 steps
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        }, index * 150);
    });
    
    statsAnimated = true;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 300 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Check on scroll
function checkStats() {
    const statsShowcase = document.querySelector('.stats-showcase');
    if (statsShowcase && isInViewport(statsShowcase)) {
        animateCounters();
        window.removeEventListener('scroll', checkStats);
    }
}

// Initialize
window.addEventListener('scroll', checkStats);
window.addEventListener('load', checkStats);



// Milestone sections fade-in animation
const milestoneObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 200);
            milestoneObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

const milestoneSections = document.querySelectorAll('.milestone-section');
milestoneSections.forEach(section => {
    milestoneObserver.observe(section);
});

// Quality cards stagger animation
const qualityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.quality-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
            qualityObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

const qualitySection = document.querySelector('.quality-section');
if (qualitySection) {
    qualityObserver.observe(qualitySection);
}

// Product Data
const productData = {
    '1.1': {
        name: 'Safety Net',
        image: 'assets/products/1.1.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Sona / Kohinoor 4 mm (4" X 4" Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.2': {
        name: 'Monofilament Safety Net',
        image: 'assets/products/1.2.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Sona / Kohinoor 4 mm (4" X 4" Square)',
            'Second Layer ': '120 GSM Overlay HDPE Monofilament Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.3': {
        name: 'Three Layer Safety Net',
        image: 'assets/products/1.3.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Sona / Kohinoor 4 mm (4" X 4" Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Net',
            'Third Layer ': 'Monofilament UV Stabilized Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.4': {
        name: 'Braided Single Layer Safety Net - 30 mm',
        image: 'assets/products/1.4.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (30 mm X 30 mm Square)',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.5': {
        name: 'Braided With Fish Net - 30 mm',
        image: 'assets/products/1.5.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (30 mm X 30 mm Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.6': {
        name: 'Braided With Monofilament Safety Net - 30 mm',
        image: 'assets/products/1.6.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (30 mm X 30 mm Square)',
            'Second Layer ': '120 GSM Overlay HDPE Monofilament Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.7': {
        name: 'Three Layer Braided Net - 30 mm',
        image: 'assets/products/1.7.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (30 mm X 30 mm Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Blue Net',
            'Third Layer ': 'Overlay HDPE Monofilament Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.8': {
        name: 'Braided Single Layer Safety Net - 35 mm',
        image: 'assets/products/1.8.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (35 mm X 35 mm Square)',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.9': {
        name: 'Braided With Fish Net - 35 mm',
        image: 'assets/products/1.9.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (35 mm X 35 mm Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.10': {
        name: 'Braided With Monofilament Safety Net - 35 mm',
        image: 'assets/products/1.10.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (35 mm X 35 mm Square)',
            'Second Layer ': '120 GSM Overlay HDPE Monofilament Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.11': {
        name: 'Three Layer Braided Net - 35 mm',
        image: 'assets/products/1.11.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (35 mm X 35 mm Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Blue Net',
            'Third Layer ': 'Overlay HDPE Monofilament Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.12': {
        name: 'Braided Single Layer Safety Net - 50 mm',
        image: 'assets/products/1.12.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (50 mm X 50 mm Square)',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.13': {
        name: 'Braided With Fish Net - 50 mm',
        image: 'assets/products/1.13.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (50 mm X 50 mm Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.14': {
        name: 'Braided With Monofilament Safety Net - 50 mm',
        image: 'assets/products/1.14.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (50 mm X 50 mm Square)',
            'Second Layer ': '120 GSM Overlay HDPE Monofilament Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.15': {
        name: 'Three Layer Braided Net - 50 mm',
        image: 'assets/products/1.15.jpg',
        specs: {
            'Standards': 'As per IS:11057',
            'Inner Rope': 'Kohinoor 2.5 mm (50 mm X 50 mm Square)',
            'Second Layer ': 'Overlay Containment Net of HDPE UV Stabilized Blue Net',
            'Third Layer ': 'Overlay HDPE Monofilament Net',
            'Border Rope': 'Sona / Kohinoor 12 mm',
            'Taping': 'PVC',
            'Standard Size': '6X10 / 5X10 / Custom Size',
        }
    },
    '1.16': {
        name: 'Sport Net',
        image: 'assets/products/1.16.jpg',
        specs: {
            'Application': 'As per IS:5815 (Part-4) 2018',
            'Standards': 'As per IS:14929',
            'Inner Rope': '2.5 mm Rope (50mm X 50 mm Square)',
        }
    },
    '1.17': {
        name: 'Safety Net Column Bracket',
        image: 'assets/products/1.17.jpg',
        specs: {
            'Application': 'Construction Site / Building Outer Side Column Use',
            'Standards': 'As per IS:14929',
            'Material': 'MS High Quality Material',
            'Degree': '45°',
            'Specification': '2.5" Centre Square Tube (12"),1" Centre Tube Support (6"),C-Channel Side Support (12"),35 X 35 Angle Top & Bottom Support (12"),30 X 3 Patti',
            'Color': 'Green (Powder Coating)',
        }
    },
    '1.18': {
        name: 'Safety Net Slab Bracket',
        image: 'assets/products/1.18.jpg',
        specs: {
            'Application': 'Construction Site / Building Outer Side Slab Use',
            'Standards': 'As per IS:14929',
            'Material': 'MS High Quality Material',
            'Degree': '20°',
            'Specification': '2.5" Centre Square Tube (12"),1" Centre Tube Support (6"),C-Channel Side Support (12"),35 X 35 Angle Top & Bottom Support (12"),30 X 3 Patti',
            'Color': 'Green (Powder Coating)',
        }
    },
    '1.19': {
        name: 'Green Shed Safety Net (Cover Net)',
        image: 'assets/products/1.19.jpg',
        specs: {
            'Application': 'Construction Site',
            'Size': '3mx50m , 5mx50m , 6mx50m',
            'Thickness': '50%, 75%, 90%',
        }
    },
    '2.1': {
        name: 'PP Rope',
        image: 'assets/products/2.1.jpg',
        specs: {
            'Application': 'Construction Site',
            'Standards': 'As per IS:5175-2022',
            'Rope': '12 / 16 / 18 / 20 mm Rope',
            'Barricade Rope': 'Sona / Kohinoor 12 mm',
        }
    },
    '2.2': {
        name: 'Pipe',
        image: 'assets/products/2.2.jpg',
        specs: {
            'Application': 'Construction Site Safety Net Installation Use',
            'Size': '2" Circumsize',
            'Standards': 'As per IS:14929',
            'Material': 'G.I.',
            'Specification': 'Thickness 12 Guage/14 Guage',
            'Standard Size': '18 Feet/20 Feet',
        }
    },
    '2.3': {
        name: 'Pipe',
        image: 'assets/products/2.3.jpg',
        specs: {
            'Application': 'Construction Site Safety Net Installation Use',
            'Size': '2" Circumsize',
            'Standards': 'As per IS:14929',
            'Material': 'G.I.',
            'Specification': 'B-Class',
            'Standard Size': '18 Feet/20 Feet',
        }
    },
    '2.4': {
        name: 'Fastener',
        image: 'assets/products/2.4.jpg',
        specs: {
            'Application': 'Construction Site Safety Net Installation Use',
            'Size': 'Diameter 8 mm X Length 75 mm',
            'Standards': 'As per IS:14929',
            'Material': 'MS Rod Half Threading',
            'Standard Size': '8 X 75',
        }
    },
    '2.5': {
        name: 'D-Clamp',
        image: 'assets/products/2.5.jpg',
        specs: {
            'Application': 'Construction Site Safety Net Installation Use',
            'Size': '2" D-Clamp',
            'Standards': 'As per IS:14929',
            'Material': 'MS Strip',
            'Specification': '1" Width X 8" Length, 1.5 MM Thickness, 8 mm Hole',
            'Standard Size': '2 Inch',
        }
    },
    '2.6': {
        name: 'Footing & Wall Compound M.S. Safety Net',
        image: 'assets/products/2.6.jpg',
        specs: {
            'Application': 'Construction Site',
            'Mesh Size': '2" X 2" Square',
            'Standards': 'As per IS:14929',
            'Inner': '12 Guage GI Wire',
        }
    },
    '2.7': {
        name: 'Footing & Wall Compound M.S. Safety Net',
        image: 'assets/products/2.7.jpg',
        specs: {
            'Application': 'Construction Site',
            'Mesh Size': '3" X 3" Square',
            'Standards': 'As per IS:14929',
            'Inner': '12 Guage GI Wire',
        }
    },
    '2.8': {
        name: 'Footing & Wall Compound M.S. Safety Net',
        image: 'assets/products/2.8.jpg',
        specs: {
            'Application': 'Construction Site',
            'Mesh Size': '4" X 4" Square',
            'Standards': 'As per IS:14929',
            'Inner': '12 Guage GI Wire',
        }
    },
    '3.1': {
        name: 'Horizontal Safety Net Installation & Removing',
        image: 'assets/products/3.1.jpg',
        specs: {
            'Application': 'Construction Site',
            'Size': 'All',
            'Standards': 'As per IS:11057',
        }
    },
    '3.2': {
        name: 'Vertical Safety Net Installation & Removing',
        image: 'assets/products/3.2.jpg',
        specs: {
            'Application': 'Construction Site',
            'Size': 'All',
            'Standards': 'As per IS:11057',
        }
    },
    '3.3': {
        name: 'Construction Site Road Safety Installation',
        image: 'assets/products/3.3.jpg',
        specs: {
            'Application': 'Construction Site Road',
            'Size': 'All',
            'Standards': 'As per IS:14929',
        }
    },
    '3.4': {
        name: 'Green Cover Net Installation & Removing',
        image: 'assets/products/3.4.jpg',
        specs: {
            'Application': 'Construction Site',
            'Size': '3mx50m , 5mx50m , 6mx50m',
            'Thickness': '50%, 75%, 90%',
        }
    },
    '3.5': {
        name: 'Sport Net Installation & Removing',
        image: 'assets/products/3.5.jpg',
        specs: {
            'Application': 'Sports Grounds / Sports Courts / Turfs',
            'Standards': 'As per IS:14929',
            'Inner Rope': '2.5 mm Rope (50mm X 50 mm Square)',
        }
    },
    '3.6': {
        name: 'Rockfall Protection Safety Net Installation & Removing',
        image: 'assets/products/3.6.jpg',
        specs: {
            'Application': 'Construction Site',
            'Size': 'MS Footing Net Of All Sizes',
            'Standards': 'As per IS:14929',
            'Material': 'Net Joining Rope 8 mm, Clamp, Fastener',
        }
    },
};

// Product Tab Functionality
// Product Tabs Logic
const productTabs = document.querySelectorAll('.product-tab');
const productsContainer = document.querySelector('.products-container');
const productGrids = document.querySelectorAll('.products-grid');

productTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        // Show products container on first click
        productsContainer.style.display = 'block';

        // Remove active class from all tabs
        productTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show only matching category
        productGrids.forEach(grid => {
            if (grid.dataset.category === category) {
                grid.style.display = 'grid';
            } else {
                grid.style.display = 'none';
            }
        });
    });
});


// Product Modal Functionality
const productItems = document.querySelectorAll('.product-item');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalTitle = document.getElementById('modalTitle');
const modalSpecs = document.getElementById('modalSpecs');

function openModal(productId) {
    const product = productData[productId];
    if (!product) return;
    
    // Set modal content
    modalTitle.textContent = product.name;
    
    // Build specs HTML
    let specsHTML = '';
    for (const [label, value] of Object.entries(product.specs)) {
        specsHTML += `
            <div class="spec-row">
                <div class="spec-label">${label}</div>
                <div class="spec-value">${value}</div>
            </div>
        `;
    }
    modalSpecs.innerHTML = specsHTML;
    
    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click listeners to product items
productItems.forEach(item => {
    item.addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        openModal(productId);
    });
});

// Close modal listeners
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Close on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && productModal.classList.contains('active')) {
        closeModal();
    }
});

// Prevent modal content click from closing
document.querySelector('.modal-content').addEventListener('click', function(e) {
    e.stopPropagation();
});

