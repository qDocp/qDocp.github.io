document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const lightIcon = darkModeToggle.querySelector('.icon-light');
    const darkIcon = darkModeToggle.querySelector('.icon-dark');

    // On bloque temporairement les animations CSS au chargement
    body.classList.add('no-transition');

    // --- FONCTION MODE SOMBRE (Identique à Milo) ---
    function updateMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            lightIcon.style.transform = 'translateY(-50%) translateX(-30px)';
            lightIcon.style.opacity = '0';
            darkIcon.style.transform = 'translateY(-50%) translateX(0)';
            darkIcon.style.opacity = '1';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            lightIcon.style.transform = 'translateY(-50%) translateX(0)';
            lightIcon.style.opacity = '1';
            darkIcon.style.transform = 'translateY(-50%) translateX(30px)';
            darkIcon.style.opacity = '0';
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        updateMode(true);
    } else {
        updateMode(false);
    }

    // Une fois la couleur instantanément appliquée, on réactive les animations
    setTimeout(() => {
        body.classList.remove('no-transition');
    }, 50);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            updateMode(!isDarkMode);
        });
    }

    // --- ACCORDÉON SUR MOBILE (Une seule catégorie à la fois) ---
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            // L'accordéon ne s'active que si la largeur de l'écran est de 768px ou moins
            if(window.innerWidth <= 768) {
                const currentBox = header.parentElement;
                
                // On vérifie si la boîte sur laquelle on clique est DÉJÀ ouverte
                const isActive = currentBox.classList.contains('active');

                // 1. On commence par fermer TOUTES les boîtes
                document.querySelectorAll('.info-box').forEach(box => {
                    box.classList.remove('active');
                });

                // 2. Si la boîte cliquée n'était PAS déjà ouverte, on l'ouvre
                if (!isActive) {
                    currentBox.classList.add('active');
                }
            }
        });
    });
});