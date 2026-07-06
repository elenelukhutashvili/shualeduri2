document.addEventListener("DOMContentLoaded", () => {
    // --- 1. მობილური მენიუს ლოგიკა ---
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            // თუ მენიუ ღიაა, ნიშანი გახდეს ✕, თუ დაკეტილია - ☰
            menuBtn.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
        });
    }

    // --- 2. თემის გადართვის ლოგიკა (Light / Dark Mode) ---
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // body-ზე გადავრთოთ 'light-mode' კლასი
            document.body.classList.toggle('light-mode');
            
            // შევცვალოთ ღილაკის ემოჯი მიმდინარე თემის მიხედვით
            if (document.body.classList.contains('light-mode')) {
                themeToggle.textContent = '🌙'; // თუ განათდა, გამოჩნდეს მთვარე
            } else {
                themeToggle.textContent = '☀️'; // თუ დაბნელდა, გამოჩნდეს მზე
            }
        });
    }
});