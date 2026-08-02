document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const lightIcon = darkModeToggle.querySelector('.icon-light');
    const darkIcon = darkModeToggle.querySelector('.icon-dark');

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

    setTimeout(() => {
        body.classList.remove('no-transition');
    }, 50);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            updateMode(!isDarkMode);
        });
    }

    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                const currentBox = header.parentElement;
                
                const isActive = currentBox.classList.contains('active');

                document.querySelectorAll('.info-box').forEach(box => {
                    box.classList.remove('active');
                });

                if (!isActive) {
                    currentBox.classList.add('active');
                }
            }
        });
    });
});