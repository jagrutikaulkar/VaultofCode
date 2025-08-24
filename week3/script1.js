document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Hide loading overlay when page is fully loaded
    window.addEventListener('load', function() {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const backToTop = document.querySelector('.back-to-top');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', function() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Cursor Effect
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add slight delay to follower for smooth effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .play-btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
        });
        
        el.addEventListener('mouseleave', function() {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const words = ['Professional Editing', 'Creative Solutions', 'Engaging Content', 'Stunning Visuals'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            typingSpeed = 100;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typingSpeed = 50;
        } else {
            isDeleting = !isDeleting;
            wordIndex = (!isDeleting && wordIndex === words.length - 1) ? 0 : (!isDeleting ? wordIndex + 1 : wordIndex);
            typingSpeed = isDeleting ? 1500 : 500;
        }
        
        setTimeout(type, typingSpeed);
    }

    // Start typing animation after a delay
    setTimeout(type, 1000);

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter animation when scrolled to stats section
    const heroStats = document.querySelector('.hero-stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
        }
    }, { threshold: 0.5 });
    
    observer.observe(heroStats);

    // Client Slider
    const clientSlides = document.querySelectorAll('.client-slide');
    let currentClientSlide = 0;
    
    function showClientSlide(index) {
        clientSlides.forEach(slide => {
            slide.style.opacity = '0.6';
        });
        
        clientSlides[index].style.opacity = '1';
    }
    
    function nextClientSlide() {
        currentClientSlide = (currentClientSlide + 1) % clientSlides.length;
        showClientSlide(currentClientSlide);
    }
    
    // Auto-rotate client logos
    setInterval(nextClientSlide, 3000);

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
        resetTestimonialInterval();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
        resetTestimonialInterval();
    });

    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }

    // Pause auto-rotation on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', startTestimonialInterval);

    // Start testimonial slider
    showTestimonial(0);
    startTestimonialInterval();

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelector('.portfolio-grid');

    // Sample portfolio data with real YouTube video links
    const portfolioData = [
        {
            id: 1,
            title: "Instagram Reel Edit",
            category: "short-form",
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            videoUrl: "https://www.youtube.com/embed/9xwazD5SyVg" // Example short-form video
        },
        {
            id: 2,
            title: "YouTube Documentary",
            category: "long-form",
            image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            videoUrl: "https://www.youtube.com/embed/BHACKCNDMW8" // Example documentary
        },
        {
            id: 3,
            title: "Gameplay Highlights",
            category: "gaming",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example gaming video
        },
        {
            id: 4,
            title: "Football Skills Montage",
            category: "football",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1293&q=80",
            videoUrl: "https://www.youtube.com/embed/OUKGsb8CpF8" // Example football edit
        },
        {
            id: 5,
            title: "Product Advertisement",
            category: "ecommerce",
            image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            videoUrl: "https://www.youtube.com/embed/7KXGZAEWzn0" // Example product ad
        },
        {
            id: 6,
            title: "Historical Documentary",
            category: "documentary",
            image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
            videoUrl: "https://www.youtube.com/embed/3Rz6Q0xBF_Q" // Example documentary
        },
        {
            id: 7,
            title: "Cinematic Color Grade",
            category: "color-grading",
            image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            videoUrl: "https://www.youtube.com/embed/6B26asyGKDo" // Example color grading
        },
        {
            id: 8,
            title: "Anime AMV",
            category: "anime",
            image: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            videoUrl: "https://www.youtube.com/embed/6dhTl9B7m6I" // Example anime video
        },
        {
            id: 9,
            title: "TikTok Trend Edit",
            category: "short-form",
            image: "https://blog.replug.io/wp-content/uploads/2022/05/Tiktok-bio.jpg",
            videoUrl: "https://www.youtube.com/embed/4NRXx6U8ABQ" // Example short-form video
        }
    ];

    // Load portfolio items
    function loadPortfolioItems(items) {
        portfolioItems.innerHTML = '';
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category.replace('-', ' ')}</p>
                    <div class="play-btn" data-video="${item.videoUrl}">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
            
            portfolioItems.appendChild(portfolioItem);
        });

        // Initialize video lightbox
        initVideoLightbox();
    }

    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                loadPortfolioItems(portfolioData);
            } else {
                const filteredItems = portfolioData.filter(item => item.category === filter);
                loadPortfolioItems(filteredItems);
            }
        });
    });

    // Video Lightbox
    function initVideoLightbox() {
        const playButtons = document.querySelectorAll('.play-btn');
        const lightbox = document.querySelector('.video-lightbox');
        const closeLightbox = document.querySelector('.close-lightbox');
        const videoIframe = document.querySelector('.video-lightbox iframe');
        const introVideoBtn = document.getElementById('play-intro-video');

        function openLightbox(videoUrl) {
            videoIframe.setAttribute('src', videoUrl);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightboxHandler() {
            lightbox.classList.remove('active');
            videoIframe.setAttribute('src', '');
            document.body.style.overflow = '';
        }

        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoUrl = this.getAttribute('data-video');
                openLightbox(videoUrl);
            });
        });

        // Intro video button
        if (introVideoBtn) {
            introVideoBtn.addEventListener('click', function() {
                openLightbox("https://www.youtube.com/embed/9No-FiEInLA"); // Example intro video
            });
        }

        closeLightbox.addEventListener('click', closeLightboxHandler);

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxHandler();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission (prevent default for demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! In a real implementation, this would be sent to the server.');
            this.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks for subscribing!');
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate__animated');
    
    function animateOnScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__fadeIn');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Initial load
    loadPortfolioItems(portfolioData);
});