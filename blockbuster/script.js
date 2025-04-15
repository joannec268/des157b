(function(){
    'use strict';
    const fs = document.querySelector('.fa-expand');   
    // const lyrics = document.querySelector('#lyrics');
    const video = document.querySelector('#video');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');

    const intervalID = setInterval(checkTime, 1000);
    const loading = document.querySelector('.fa-clover');

    line1.style.opacity = '0';
    line2.style.opacity = '0';
    line3.style.opacity = '0';
    line4.style.opacity = '0';


    video.addEventListener('playing', function() {
        loading.style.display = 'none';
    })

    fs.addEventListener('click', function(){
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    function checkTime(){
        if (3 < video.currentTime && video.currentTime < 5) {
            video.style.filter = 'blur(0)';
            line1.style.opacity = '1';
        } else if (6 < video.currentTime && video.currentTime < 10) {
            line1.style.opacity = '0';
            line2.style.opacity = '1';
        } else if (11 < video.currentTime && video.currentTime < 18) {
            line2.style.opacity = '0';
            line3.style.opacity = '1';
        } else if (19 < video.currentTime && video.currentTime < 21) {
            line3.style.opacity = '0';
            line4.style.opacity = '1';
        } else {
            line1.style.opacity = '0';
            line2.style.opacity = '0';
            line3.style.opacity = '0';
            line4.style.opacity = '0';
        }
    }
})();