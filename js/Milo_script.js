document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const lightIcon = darkModeToggle.querySelector('.icon-light');
    const darkIcon = darkModeToggle.querySelector('.icon-dark');

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

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        updateMode(!isDarkMode);
    });
});

