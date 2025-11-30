// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Botón scroll to top
    const scrollTopBtn = document.querySelector('.scroll-top');

    // Mostrar/ocultar botón scroll to top
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // Efecto de animación en los restaurantes al hacer scroll
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

    // Aplicar animación a las tarjetas de restaurantes
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Aplicar animación a los elementos de información
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Efecto de rating con estrellas
    const ratingStars = document.querySelectorAll('.restaurant-rating');
    ratingStars.forEach(rating => {
        const stars = rating.querySelectorAll('.fas, .far, .fas.fa-star-half-alt');
        stars.forEach(star => {
            star.style.transition = 'transform 0.2s ease';
            star.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
            });
            star.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });

    // Efecto de carga inicial mejorado
    const restaurantImages = document.querySelectorAll('.restaurant-img');
    let imagesLoaded = 0;
    const totalImages = restaurantImages.length;

    restaurantImages.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // En caso de error también contar
        }
    });

    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            document.body.style.opacity = '1';
        }
    }

    // Inicializar opacidad del body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    // Fallback en caso de que algunas imágenes no carguen
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 1000);
});

// Función para scroll al inicio de la página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Efecto de filtro por características (opcional - para futuras mejoras)
function filterRestaurants(category) {
    const restaurants = document.querySelectorAll('.restaurant-card');

    restaurants.forEach(restaurant => {
        const features = restaurant.querySelector('.restaurant-features').textContent.toLowerCase();

        if (category === 'all' || features.includes(category.toLowerCase())) {
            restaurant.style.display = 'block';
            setTimeout(() => {
                restaurant.style.opacity = '1';
                restaurant.style.transform = 'translateY(0)';
            }, 100);
        } else {
            restaurant.style.opacity = '0';
            restaurant.style.transform = 'translateY(20px)';
            setTimeout(() => {
                restaurant.style.display = 'none';
            }, 300);
        }
    });
}