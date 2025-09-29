// =============================================
// MOBILE NAVIGATION FUNCTIONALITY
// =============================================

// Mobile Navigation Toggle
// Select necessary DOM elements for mobile menu functionality
const hamburgerButton = document.querySelector('.hamburger-button'); // Hamburger menu button
const mobileMenu = document.querySelector('.mobile-menu'); // Mobile menu container
const hamburgerLines = document.querySelectorAll('.hamburger-line'); // Individual lines in hamburger icon

// Add click event listener to hamburger button for toggling mobile menu
hamburgerButton.addEventListener('click', () => {
    // Toggle 'active' class to show/hide mobile menu
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger icon - transform to X when menu is open
    hamburgerLines[0].classList.toggle('active'); // Rotate first line
    hamburgerLines[1].classList.toggle('active'); // Hide middle line
    hamburgerLines[2].classList.toggle('active'); // Rotate third line
});

// Close mobile menu when clicking on links
// Select all links within mobile menu
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

// Add click event listener to each mobile menu link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu when a link is clicked
        mobileMenu.classList.remove('active');
        
        // Reset hamburger icon to original state
        hamburgerLines[0].classList.remove('active');
        hamburgerLines[1].classList.remove('active');
        hamburgerLines[2].classList.remove('active');
    });
});

// =============================================
// NAVBAR SCROLL EFFECTS
// =============================================

// Navbar scroll effect - change navbar appearance on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    // Check if page has been scrolled more than 100 pixels
    if (window.scrollY > 100) {
        // Add semi-transparent background and blur effect when scrolled
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        // Reset to original state when at top of page
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// =============================================
// SMOOTH SCROLLING FUNCTIONALITY
// =============================================

// Smooth scrolling for anchor links (links starting with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor link behavior
        
        const targetId = this.getAttribute('href'); // Get target section ID
        if (targetId === '#') return; // Skip if href is just '#'
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate scroll position, accounting for fixed navbar height
            const offsetTop = targetElement.offsetTop - 80;
            
            // Smooth scroll to target section
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// SCROLL ANIMATIONS
// =============================================

// Animation on scroll - animate elements when they come into viewport
function animateOnScroll() {
    // Select all elements that should animate on scroll
    const elements = document.querySelectorAll('.feature-card, .class-card, .trainer-card, .pricing-card');
    
    elements.forEach(element => {
        // Get element's position relative to viewport
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Check if element is within 100px of the viewport bottom
        if (elementTop < windowHeight - 100) {
            // Make element visible and reset transform
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations - set initial state for animated elements
function initAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .class-card, .trainer-card, .pricing-card');
    
    animatedElements.forEach(element => {
        // Set initial hidden state (below and transparent)
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check in case elements are already in viewport
    animateOnScroll();
}

// =============================================
// FORM HANDLING
// =============================================

// Form submission handling for contact form
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        
        // Get form data using FormData API or direct value access
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        
        // Simple validation - check if required fields are filled
        if (!name || !email) {
            alert('Please fill in all required fields.');
            return; // Stop execution if validation fails
        }
        
        // Simulate form submission process
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            // Show success message
            alert(`Thank you, ${name}! Your free pass request has been received. We'll contact you at ${email} shortly.`);
            
            // Reset form and button state
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000); // 2 second delay to simulate network request
    });
}

// =============================================
// PRICING CARD INTERACTIONS
// =============================================

// Pricing card hover interactions
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    // Add hover effect on mouse enter
    card.addEventListener('mouseenter', () => {
        // Only apply hover effect to non-featured cards
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    // Reset position on mouse leave
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

// =============================================
// STATS COUNTER ANIMATION
// =============================================

// Counter animation for statistics in hero section
function animateStats() {
    const stats = document.querySelectorAll('.stat h3'); // All stat number elements
    const duration = 2000; // Total animation duration in milliseconds (2 seconds)
    const interval = 50;   // Update interval in milliseconds (50ms = 20fps)
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent); // Target number to count to
        let current = 0; // Starting number
        const increment = target / (duration / interval); // Calculate increment per interval
        
        // Set up interval for counting animation
        const timer = setInterval(() => {
            current += increment; // Increase current value
            if (current >= target) {
                current = target; // Ensure we don't exceed target
                clearInterval(timer); // Stop animation when target is reached
            }
            // Update displayed number, preserve '+' symbol if present
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, interval);
    });
}

// Intersection Observer for stats animation - only animate when stats are visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    // Create Intersection Observer to detect when stats section enters viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animation when section is 50% visible
                animateStats();
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of element is visible
    
    observer.observe(statsSection); // Start observing stats section
}

// =============================================
// INITIALIZATION
// =============================================

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations(); // Set up initial animation states
    
    // Add scroll event listener for scroll-triggered animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Add loaded class to body for CSS-based initial animations
    document.body.classList.add('loaded');
});

// =============================================
// DYNAMIC CSS FOR HAMBURGER ANIMATION
// =============================================

// Add CSS for hamburger animation dynamically
// This ensures the animation styles are available even if CSS loads slowly
const style = document.createElement('style');
style.textContent = `
    /* Transform first hamburger line to form X */
    .hamburger-line.active:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    /* Hide middle hamburger line when menu is open */
    .hamburger-line.active:nth-child(2) {
        opacity: 0;
    }
    
    /* Transform third hamburger line to form X */
    .hamburger-line.active:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    /* Smooth transition for hamburger lines */
    .hamburger-line {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style); // Add styles to document head