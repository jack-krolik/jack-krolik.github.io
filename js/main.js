document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Update active nav link on scroll
        updateActiveNavLink();
    });
    
    // Mobile navigation toggle
    mobileNavToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change toggle icon
        mobileNavToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking a nav link
    navItems.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileNavToggle.textContent = '☰';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(function(link) {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Form submission handler
    // const contactForm = document.querySelector('.contact-form');
    
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // In a real implementation, you would send the form data to a server
    //         // For this demo, we'll just show a success message
    //         const formData = new FormData(contactForm);
    //         const formEntries = Object.fromEntries(formData.entries());
            
    //         console.log('Form submitted:', formEntries);
            
    //         // Reset form
    //         contactForm.reset();
            
    //         // Show success message (in a real implementation)
    //         alert('Thank you for your message! I will get back to you soon.');
    //     });
    // }
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = new FormData(form);

        try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
            Accept: "application/json",
            },
        });

        // Reset classes before adding new state
        status.classList.remove("success", "error");

        if (response.ok) {
            form.reset();
            status.textContent = "Thank you! Your message has been sent.";
            status.classList.add("success");
            status.style.display = "block"; // 👈 show the message
        } else {
            const resData = await response.json();
            status.textContent = resData.errors
            ? resData.errors.map(e => e.message).join(", ")
            : "Oops! Something went wrong.";
            status.classList.add("error");
            status.style.display = "block"; // 👈 show the error
        }
        } catch (error) {
        status.classList.remove("success", "error");
        status.textContent = "There was a problem submitting the form.";
        status.classList.add("error");
        }
    });
    }
    // Initialize active nav link on page load
    updateActiveNavLink();
});