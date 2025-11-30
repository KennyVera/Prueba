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

    // Efecto de animación en los elementos al hacer scroll
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

    // Aplicar animación a los elementos de comida
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Aplicar animación a los elementos de información
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    // Efecto hover mejorado para las imágenes de comida
    const foodImages = document.querySelectorAll('.food-img');
    foodImages.forEach(img => {
        img.parentElement.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });

        img.parentElement.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)';
        });
    });
});

// Función para scroll al inicio de la página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Efecto de carga inicial
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});