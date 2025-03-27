// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuBtn && mobileMenu) {
    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        const isActive = mobileMenu.classList.contains('active');
        menuBtn.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    };

    // Add both click and touchstart event listeners
    menuBtn.addEventListener('click', toggleMenu);
    menuBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
        toggleMenu();
    });
}

// Scroll to Top
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
if (filterButtons && portfolioItems) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Testimonials Carousel
const testimonialsCarousel = document.querySelector('.testimonials-carousel');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.carousel-controls .prev');
const nextBtn = document.querySelector('.carousel-controls .next');
if (testimonialsCarousel && testimonialItems.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;

    const showTestimonial = (index) => {
        testimonialsCarousel.style.transform = `translateX(-${index * 100}%)`;
    };

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialItems.length - 1;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < testimonialItems.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex < testimonialItems.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    }, 5000);
}

// Scroll Animations
const fadeInElements = document.querySelectorAll('.fade-in');
const slideInLeftElements = document.querySelectorAll('.slide-in-left');
const slideInRightElements = document.querySelectorAll('.slide-in-right');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => observer.observe(element));
slideInLeftElements.forEach(element => observer.observe(element));
slideInRightElements.forEach(element => observer.observe(element));

// FAQ Toggle (for contact.html)
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            answer.style.display = isOpen ? 'none' : 'block';
            question.querySelector('i').classList.toggle('fa-chevron-down');
            question.querySelector('i').classList.toggle('fa-chevron-up');
        });
    });
}