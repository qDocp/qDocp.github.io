document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuOpen = document.getElementById('mobileMenuOpen');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const sideNav = document.getElementById('sideNav');

    if (mobileMenuOpen && sideNav) {
        mobileMenuOpen.addEventListener('click', () => {
            sideNav.classList.add('active');
        });
    }

    if (mobileMenuClose && sideNav) {
        mobileMenuClose.addEventListener('click', () => {
            sideNav.classList.remove('active');
        });
    }

    document.addEventListener('click', (event) => {
        if (sideNav && sideNav.classList.contains('active')) {
            if (!sideNav.contains(event.target) && !mobileMenuOpen.contains(event.target)) {
                sideNav.classList.remove('active');
            }
        }
    });
});