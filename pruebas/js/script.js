// Smooth scroll para los enlaces de navegación
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

// Efecto de cambio en el header al hacer scroll
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

// Función scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Inicializar animaciones
function initializeAnimations() {
    const elementsToAnimate = [
        '.card',
        '.food-item',
        '.restaurant-card',
        '.accommodation-card',
        '.commercial-card',
        '.info-item',
        '.section-title',
        '.section-subtitle'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(item => {
            if (!item.classList.contains('animated')) {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(item);
            }
        });
    });
}

// MEJOR MANEJO DE IMÁGENES
function initializeImages() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Agregar loading state
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
            console.log('Imagen cargada:', this.src);
        });

        // Manejar errores de carga
        img.addEventListener('error', function() {
            console.error('Error cargando imagen:', this.src);
            this.src = 'https://via.placeholder.com/400x250/1e3c72/ffffff?text=Imagen+No+Disponible';
            this.alt = 'Imagen no disponible';
            this.style.opacity = '1';
        });

        // Forzar carga si hay problemas
        if (img.complete && img.naturalHeight === 0) {
            console.log('Imagen rota, reemplazando:', img.src);
            img.src = 'https://via.placeholder.com/400x250/1e3c72/ffffff?text=Imagen+No+Disponible';
        }

        // Estilos iniciales para imágenes
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '0.8';
    });
}

// Precargar imágenes importantes
function preloadCriticalImages() {
    const criticalImages = [
        'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwcPyteq2wOJbBPPhhFBEHK_LftLXBRMIA4AuONDjMd62GbvdL2zHQOZykDsVuSF7HMmCq_JXBOcxGaQp_iQtZDbWw-xTIurZs4QY-IdvyysKGQFZReaU0rf9Zjm-fSbJMxTJTsrw=s1360-w1360-h1020-rw',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtxxld4z43fNnmXX_f349FuNnQIpU2PBvJsA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjdpXFa8MfFQNAF7uGKvpN_8TPjf1Xr0odtw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM4E1ifkRl1hSOrd0B7xXUnG_-qxPXiKx_GA&s',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/01/45/92/cafeteria-pasteleria.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log('Precargada:', src);
        img.onerror = () => console.warn('Error precargando:', src);
    });
}

// Verificar estado de imágenes después de un tiempo
function checkImagesStatus() {
    setTimeout(() => {
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                console.warn('Imagen aún no cargada:', img.src);
                // Intentar recargar
                const originalSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = originalSrc;
                }, 100);
            }
        });
    }, 3000);
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando página de restaurantes...');

    initializeAnimations();
    initializeImages();
    preloadCriticalImages();
    checkImagesStatus();

    // Agregar estilos CSS para imágenes
    const imageStyles = `
        .restaurant-img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.5s ease, opacity 0.3s ease;
        }
        
        .restaurant-card:hover .restaurant-img {
            transform: scale(1.1);
        }
        
        .restaurant-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .restaurants-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 2.5rem;
            margin-top: 3rem;
        }
        
        .restaurant-content {
            padding: 2rem;
        }
        
        .loaded {
            opacity: 1 !important;
        }
        
        @media (max-width: 768px) {
            .restaurants-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = imageStyles;
    document.head.appendChild(styleSheet);
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});


