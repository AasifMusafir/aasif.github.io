document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader Logic ---
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000); // 2 seconds to simulate model loading

    // --- Custom Cursor Logic (Desktop Only) ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Direct mapping for low latency
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Smooth animation using Web Animation API
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover interactions
        document.querySelectorAll('.hover-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            link.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate Progress Bars only when visible
                if(entry.target.classList.contains('skill-category')) {
                   const bars = entry.target.querySelectorAll('.progress');
                   bars.forEach(bar => {
                       bar.style.width = bar.getAttribute('data-width');
                   });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Contact Form Handling ---
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Transmitting...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerText = 'Message Received';
            btn.style.background = '#10B981'; // Success Green
            btn.style.color = 'white';
            form.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });

    // --- Parallax Background ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const blobs = document.querySelectorAll('.blob');
        
        // Subtle parallax speed differences
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.05;
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
});