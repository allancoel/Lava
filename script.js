// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.framework-pillar, .result-card, .process-step, .about-text, .philosophy-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// ANIMATED COUNTERS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target === 500 ? target + '%' : target + 'x';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 500 ? '%' : 'x');
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.result-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// ============================================
// PARALLAX EFFECTS
// ============================================

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const hero = document.getElementById('hero');
    
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            const scrolled = scrollTop * 0.5;
            heroContent.style.transform = `translateY(${scrolled}px)`;
            heroContent.style.opacity = 1 - (scrollTop / 800);
        }
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// ============================================
// CITY PINS ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const cityPins = document.querySelectorAll('.city-pin');
    
    cityPins.forEach((pin, index) => {
        pin.style.animationDelay = `${index * 0.1}s`;
        pin.addEventListener('mouseenter', () => {
            pin.style.transform = 'translateX(10px) scale(1.05)';
        });
        pin.addEventListener('mouseleave', () => {
            pin.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// ============================================
// FRAMEWORK PILLARS INTERACTION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const pillars = document.querySelectorAll('.framework-pillar');
    
    pillars.forEach((pillar, index) => {
        pillar.style.animationDelay = `${index * 0.1}s`;
        
        pillar.addEventListener('mouseenter', () => {
            const iconBg = pillar.querySelector('.icon-bg');
            if (iconBg) {
                iconBg.style.animation = 'iconPulse 1s infinite';
            }
        });
    });
});

// ============================================
// LAVA FLOW ENHANCEMENT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const lavaFlows = document.querySelectorAll('.lava-flow');
    
    // Add mouse movement parallax to lava flows
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        lavaFlows.forEach((flow, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            flow.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// ============================================
// GLASSMORPHISM EFFECT ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Adjust glassmorphism intensity based on scroll
    const glassElements = document.querySelectorAll('.global-presence, .framework-pillar, .result-card, .process-step');
    glassElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elementScrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (elementScrollPercentage > 0 && elementScrollPercentage < 1) {
            const opacity = 0.4 + (elementScrollPercentage * 0.2);
            el.style.background = `rgba(0, 0, 0, ${opacity})`;
        }
    });
}, { passive: true });

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const optimizedScrollHandler = throttle(() => {
    // Scroll-based animations here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CURSOR EFFECT (OPTIONAL ENHANCEMENT)
// ============================================

// Create custom cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Add CSS for cursor glow
const style = document.createElement('style');
style.textContent = `
    .cursor-glow {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 69, 0, 0.3), transparent);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: width 0.3s, height 0.3s;
        mix-blend-mode: screen;
    }
    
    a:hover ~ .cursor-glow,
    button:hover ~ .cursor-glow {
        width: 40px;
        height: 40px;
    }
`;
document.head.appendChild(style);

// ============================================
// FORM HANDLING (FOR FUTURE CONTACT FORM)
// ============================================

// Placeholder for contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    // Add form submission logic here
    console.log('Form submission handled');
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🔥 LAVA STVDIO 🔥', 'color: #ff4500; font-size: 20px; font-weight: bold;');
console.log('%cReady to transform your marketing into a predictable revenue engine?', 'color: #999; font-size: 12px;');


