// Cambio del navbar al hacer scroll y resaltado del enlace activo
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".custom-navbar");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 10) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Desplazamiento suave para enlaces internos (fallback si el navegador no soporta scroll-behavior)
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const yOffset = -72; // compensación por altura del navbar
                    const y =
                        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                }
            }
        });
    });

    // Actualizar el enlace activo del menú según el scroll
    const sections = document.querySelectorAll("section[id]");

    const updateActiveLink = () => {
        let currentId = "";
        const scrollPos = window.scrollY + 100;

        sections.forEach((section) => {
            const offsetTop = section.offsetTop;
            const offsetHeight = section.offsetHeight;
            if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                currentId = section.getAttribute("id") || "";
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Año dinámico en el pie de página
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }

    // Animaciones de aparición al hacer scroll en las secciones
    const revealSections = document.querySelectorAll(
        ".section-padding, .cta-section"
    );

    revealSections.forEach((section) => {
        section.classList.add("reveal-on-scroll");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        revealSections.forEach((section) => observer.observe(section));
    } else {
        // Fallback: mostrar todas las secciones si IntersectionObserver no está soportado
        revealSections.forEach((section) => section.classList.add("is-visible"));
    }
});
