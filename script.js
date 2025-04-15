(function() {
    'use strict';


    const toggle = document.querySelector('#check');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section')
    const sun = document.querySelector('#sun');
    const moon = document.querySelector('#moon');
    
    const lightmode = document.querySelector('#lightmode');
    const darkmode = document.querySelector('#darkmode');


    let mode = 'light';
    darkmode.className = 'hidden';
    moon.style.display = "none";

    toggle.addEventListener('change', function() {
        if (mode === 'light') {
            lightmode.className = 'hidden';
            darkmode.className = 'showing';
            sun.style.display = "none";
            moon.style.display = "inline";
            body.className = 'switch';
            banner.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'dark';
        } else {
            lightmode.className = 'showing';
            darkmode.className = 'hidden';
            sun.style.display = "inline";
            moon.style.display = "none";
            body.removeAttribute('class');
            banner.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'light'
        }
    })
})();