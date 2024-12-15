document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Get loader elements
    const loaderWrapper = document.querySelector('.loader-wrapper');
    
    // Function to animate elements sequentially
    function animateElements() {
        const elements = document.querySelectorAll('.animate-element');
        let delay = 0;
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('show');
            }, delay);
            delay += 200; // Add 200ms delay between each element
        });
    }
    
    // Start animations after loader is complete
    setTimeout(() => {
        loaderWrapper.classList.add('fade-out');
        document.body.classList.remove('loading');
        
        // Start element animations after loader fades out
        setTimeout(animateElements, 500);
    }, 3000);
    
    const dockItems = document.querySelectorAll('.dock-item');
    
    // Handle click events with smooth scrolling
    dockItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all items
            dockItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Get the section id from the tooltip text
            const targetSection = item.querySelector('.tooltip').textContent.toLowerCase().replace(' ', '-');
            
            // Find the corresponding section
            const section = document.getElementById(targetSection);
            
            if (section) {
                // Prevent default behavior
                e.preventDefault();
                
                // Smooth scroll to section
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100; // Offset for better accuracy

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.id;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all items
                dockItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const correspondingNavItem = document.querySelector(`.dock-item .tooltip[data-section="${sectionId}"]`)?.parentElement;
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    });

    // Handle mouse move for dock magnification
    const dock = document.querySelector('.dock-nav');
    
    dock.addEventListener('mousemove', (e) => {
        const items = document.querySelectorAll('.dock-item');
        const dockRect = dock.getBoundingClientRect();
        
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            
            // Calculate distance from mouse to item center
            const distance = Math.abs(e.clientY - itemCenter);
            const maxDistance = 100; // Maximum distance for the effect
            
            if (distance < maxDistance) {
                // Calculate scale based on distance
                const scale = 1 + (0.5 * (1 - distance / maxDistance));
                item.style.transform = `scale(${scale})`;
                item.style.zIndex = scale * 100;
            } else {
                item.style.transform = 'scale(1)';
                item.style.zIndex = '1';
            }
        });
    });

    // Reset all items when mouse leaves the dock
    dock.addEventListener('mouseleave', () => {
        const items = document.querySelectorAll('.dock-item');
        items.forEach(item => {
            item.style.transform = 'scale(1)';
            item.style.zIndex = '1';
            
            // Maintain active state scaling
            if (item.classList.contains('active')) {
                item.style.transform = 'scale(1.2)';
                item.style.zIndex = '50';
            }
        });
    });

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved user preference, if any, on load of the website
    const darkModePref = localStorage.getItem('darkMode');
    if (darkModePref === 'dark') {
        html.setAttribute('data-theme', 'dark');
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('darkMode', newTheme);
        
        // Optional: Add animation to the toggle button
        darkModeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'scale(1)';
        }, 200);
    });

    // Typing animation for both name and role
    const nameText = "ROHIT SINGH";
    const roles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Android Developer"
    ];
    
    let nameIndex = 0;
    let roleIndex = 0;
    let isDeleting = false;
    let isNameComplete = false;
    
    const nameElement = document.querySelector('.typing-name');
    const roleElement = document.querySelector('.typing-role');
    
    function type() {
        // Handle name typing first (one time only)
        if (!isNameComplete) {
            if (nameIndex < nameText.length) {
                nameElement.textContent = nameText.substring(0, nameIndex + 1);
                nameIndex++;
                setTimeout(type, 150); // Slower typing for name
            } else {
                isNameComplete = true;
                setTimeout(type, 1000); // Wait before starting role typing
            }
            return;
        }
        
        // Handle role typing (continuous loop)
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, roleElement.textContent.length - 1);
            if (roleElement.textContent === '') {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 50);
            }
        } else {
            roleElement.textContent = currentRole.substring(0, roleElement.textContent.length + 1);
            if (roleElement.textContent === currentRole) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at the end of the word
            } else {
                setTimeout(type, 100);
            }
        }
    }
    
    // Start typing animation after elements are animated
    function startTypingAnimation() {
        setTimeout(type, 1500);
    }

    // Call startTypingAnimation after elements are animated
    setTimeout(startTypingAnimation, 4000);

    // Custom cursor with smooth following
    // const cursor = document.querySelector('.cursor');
    // const cursorTrail = document.querySelector('.cursor-trail');
    
    // let mouseX = 0;
    // let mouseY = 0;
    // let cursorX = 0;
    // let cursorY = 0;
    // let trailX = 0;
    // let trailY = 0;
    
    // Speed factor for cursor movement (lower = smoother)
    // const cursorSpeed = 0.2;
    // const trailSpeed = 0.1;

    // Update mouse position
    // document.addEventListener('mousemove', (e) => {
    //     mouseX = e.clientX;
    //     mouseY = e.clientY;
    // });

    // Smooth cursor animation
    // function animateCursor() {
    //     // Calculate cursor position
    //     const dx = mouseX - cursorX;
    //     const dy = mouseY - cursorY;
    //     cursorX += dx * cursorSpeed;
    //     cursorY += dy * cursorSpeed;
        
    //     // Calculate trail position
    //     const trailDx = mouseX - trailX;
    //     const trailDy = mouseY - trailY;
    //     trailX += trailDx * trailSpeed;
    //     trailY += trailDy * trailSpeed;

    //     // Apply positions
    //     cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    //     cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;

    //     requestAnimationFrame(animateCursor);
    // }

    // animateCursor();

    // Cursor interactions with elements
    // const interactiveElements = document.querySelectorAll('a, button, .dock-item, .social-link, .skill-item');
    
    // interactiveElements.forEach(element => {
    //     element.addEventListener('mouseenter', () => {
    //         cursor.classList.add('cursor-hover');
    //         cursorTrail.classList.add('trail-hover');
    //     });
        
    //     element.addEventListener('mouseleave', () => {
    //         cursor.classList.remove('cursor-hover');
    //         cursorTrail.classList.remove('trail-hover');
    //     });
    // });

    // Hide cursor when leaving window
    // document.addEventListener('mouseleave', () => {
    //     cursor.style.opacity = '0';
    //     cursorTrail.style.opacity = '0';
    // });

    // Show cursor when entering window
    // document.addEventListener('mouseenter', () => {
    //     cursor.style.opacity = '1';
    //     cursorTrail.style.opacity = '1';
    // });

    // Hide cursor when clicking
    // document.addEventListener('mousedown', () => {
    //     cursor.classList.add('cursor-click');
    //     cursorTrail.classList.add('trail-click');
    // });

    // document.addEventListener('mouseup', () => {
    //     cursor.classList.remove('cursor-click');
    //     cursorTrail.classList.remove('trail-click');
    // });

    // Projects Section Animations
    function initProjectsSection() {
        const projectCards = document.querySelectorAll('.project-card');
        
        // Intersection Observer for project cards
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        // Observe each project card
        projectCards.forEach(card => {
            card.style.transform = 'translateY(50px)';
            card.style.opacity = '0';
            card.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            projectObserver.observe(card);
        });

        // Add hover effects for project cards
        projectCards.forEach(card => {
            const image = card.querySelector('.project-image img');
            
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        });

        // Add click handlers for project links
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                link.appendChild(ripple);
                
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Initialize projects section when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initProjectsSection();
    });

    // Contact Section Functionality
    function initContactSection() {
        const contactForm = document.querySelector('.contact-form');
        const formControls = document.querySelectorAll('.form-control');
        
        // Intersection Observer for contact section elements
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe contact info and form container
        document.querySelectorAll('.contact-info, .contact-form-container').forEach(element => {
            element.style.transform = 'translateY(50px)';
            element.style.opacity = '0';
            element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            contactObserver.observe(element);
        });

        // Form validation and submission
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const submitBtn = contactForm.querySelector('.submit-btn');
                const formMessage = document.querySelector('.form-message');
                
                // Basic validation
                let isValid = true;
                formControls.forEach(control => {
                    if (!control.value.trim()) {
                        isValid = false;
                        control.classList.add('error');
                    } else {
                        control.classList.remove('error');
                    }
                });

                if (!isValid) {
                    showFormMessage('Please fill in all fields', 'error');
                    return;
                }

                // Email validation
                const emailInput = contactForm.querySelector('input[type="email"]');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    showFormMessage('Please enter a valid email address', 'error');
                    emailInput.classList.add('error');
                    return;
                }

                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                try {
                    // Here you would typically send the form data to your server
                    // For now, we'll simulate a successful submission
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    showFormMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                    
                } catch (error) {
                    // Show error message
                    showFormMessage('Failed to send message. Please try again.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
            });
        }

        // Form message handler
        function showFormMessage(message, type) {
            const formMessage = document.querySelector('.form-message');
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            
            // Auto hide message after 5 seconds
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }

        // Floating label animation
        formControls.forEach(control => {
            // Initial state check
            if (control.value) {
                control.classList.add('has-value');
            }

            control.addEventListener('focus', () => {
                control.classList.add('focused');
            });

            control.addEventListener('blur', () => {
                control.classList.remove('focused');
                if (!control.value) {
                    control.classList.remove('has-value');
                }
            });

            control.addEventListener('input', () => {
                if (control.value) {
                    control.classList.add('has-value');
                } else {
                    control.classList.remove('has-value');
                }
            });
        });

        // Add hover effect for contact items
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = '#0056b3';
            });

            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('i');
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#007AFF';
            });
        });
    }

    // Initialize contact section when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initContactSection();
    });

    // Footer Section Functionality
    function initFooterSection() {
        // Intersection Observer for footer elements
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe footer elements
        document.querySelectorAll('.footer-brand, .footer-links, .footer-contact, .footer-newsletter').forEach(element => {
            footerObserver.observe(element);
        });

        // Newsletter form handling
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const emailInput = newsletterForm.querySelector('.newsletter-input');
                const submitBtn = newsletterForm.querySelector('.newsletter-btn');
                
                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    showNewsletterMessage('Please enter a valid email address', 'error');
                    return;
                }

                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                try {
                    // Here you would typically send the email to your server
                    // For now, we'll simulate a successful subscription
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    showNewsletterMessage('Successfully subscribed to the newsletter!', 'success');
                    emailInput.value = '';
                    
                } catch (error) {
                    showNewsletterMessage('Failed to subscribe. Please try again.', 'error');
                } finally {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                }
            });
        }

        // Newsletter message handler
        function showNewsletterMessage(message, type) {
            const messageElement = document.createElement('div');
            messageElement.className = `newsletter-message ${type}`;
            messageElement.textContent = message;
            
            const form = document.querySelector('.newsletter-form');
            const existingMessage = form.querySelector('.newsletter-message');
            
            if (existingMessage) {
                existingMessage.remove();
            }
            
            form.appendChild(messageElement);
            
            // Auto remove message after 5 seconds
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }

        // Smooth scroll for footer links
        document.querySelectorAll('.footer-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add hover animations for social icons
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-5px) rotate(360deg)';
                icon.style.transition = 'all 0.5s ease';
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) rotate(0deg)';
            });
        });
    }

    // Initialize footer section when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initFooterSection();
    });
});
