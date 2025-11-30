// Funcionalidades específicas para Sitios Comerciales
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de Sitios Comerciales cargada');

    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = document.querySelector('.scroll-top');

        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (scrollTop) scrollTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            if (scrollTop) scrollTop.classList.remove('visible');
        }
    });

    // Scroll to top function
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Efectos hover mejorados para cards comerciales
    const commercialCards = document.querySelectorAll('.commercial-card');

    commercialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });

    // Manejo de botones comerciales
    const commercialBtns = document.querySelectorAll('.commercial-btn');

    commercialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.commercial-card');
            const title = card.querySelector('h3').textContent;

            // Efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);

            console.log(`Navegando a: ${title}`);
        });
    });

    // Precarga de imágenes
    function preloadCommercialImages() {
        const images = [
            'https://www.elpaseoshopping.com/assets/img/fachadas/9.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFzG6WGcBHDkwn3xuR4BAu5EWV1XaP7x_HQ&s',
            'https://lh5.googleusercontent.com/p/AF1QipN8xQQfhGtkh4B8ggHrPrXbHj7ROgPemqlPGlF9=w650-h365-k-no',
            'https://pbs.twimg.com/media/EsT55YRXAAMSvHj.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKO7aM5RcXlwlxaT8CfZojDgCM-BhSL40Jog&s'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadCommercialImages();
});