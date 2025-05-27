(function(){
    'use strict';
    console.log('read');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.manga-box').forEach(box => {
        observer.observe(box);
    });
})();