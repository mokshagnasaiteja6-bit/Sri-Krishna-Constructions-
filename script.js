document.addEventListener('DOMContentLoaded', () => {
    
    // ======== STICKY HEADER ========
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ======== MOBILE NAVIGATION ========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const icon = mobileMenuBtn.querySelector('i');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileNav.classList.add('active');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileNav.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    });

    // ======== SCROLL REVEAL ANIMATIONS ========
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100; // when to start animation
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    // Run once on load
    reveal();
    
    // Run on scroll
    window.addEventListener('scroll', reveal);

    // ======== FORM SUBMISSION ========
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const successMsg = this.querySelector('.form-success');
            const originalBtnText = submitBtn.innerHTML;
            
            // Basic validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            if(name && phone) {
                // Change button state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    submitBtn.style.display = 'none';
                    successMsg.style.display = 'block';
                    
                    // Reset form
                    leadForm.reset();
                    
                    // Reset UI after 5 seconds
                    setTimeout(() => {
                        submitBtn.style.display = 'block';
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        successMsg.style.display = 'none';
                    }, 5000);
                    
                }, 1500);
            }
        });
    }

    // ======== SMOOTH SCROLL FOR ANCHOR LINKS ========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
