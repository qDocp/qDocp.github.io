document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const lightIcon = darkModeToggle.querySelector('.icon-light');
    const darkIcon = darkModeToggle.querySelector('.icon-dark');

    // On bloque temporairement les animations CSS au chargement
    body.classList.add('no-transition');

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
    // Le setTimeout permet au navigateur de faire l'affichage sans animation
    setTimeout(() => {
        body.classList.remove('no-transition');
    }, 50);

    // Quand on clique, la classe "no-transition" n'est plus là : l'animation joue normalement !
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        updateMode(!isDarkMode);
    });
});