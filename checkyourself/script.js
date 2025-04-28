(function(){
    'use strict';

    let globalData;
    let numDataPoints;

    async function getData(){
        const treatTracking = await fetch('data.json');
        const data = await treatTracking.json();
        // Gets the keys and puts them in an array
        const dataPoints = Object.keys(data);
        // Gets the values and puts them in the globalData array
        globalData = Object.values(data);
        // Gets the number of entries in the JSON file
        numDataPoints = dataPoints.length;
        //console.log(globalData, numDataPoints);

        createSpots();
    }

    function createSpots() {
        const spotsContainer = document.querySelector('#spots-container');

        for (let i = 0; i < numDataPoints; i++) {
            const spot = document.createElement('div');
            spot.classList.add('spot');
            spot.dataset.index = i; // store index
            spot.innerHTML = '<div class="line"></div>'; // vertical line

            spot.addEventListener('mouseenter', handleHover);

            spotsContainer.appendChild(spot);
        }
    }

    function handleHover(e) {
        const spot = e.currentTarget;
        const index = spot.dataset.index;
        updateProgress(index);
        showDrawing(index);
        updateSentence(spot, index); // pass spot too
        updateLines(spot);

        document.querySelector('#sentence').style.backgroundColor = 'white';
    }

    function updateProgress(index) {
        const progressBar = document.querySelector('#bar-progress');
        const barBase = document.querySelector('#bar-base');
        const barBaseRect = barBase.getBoundingClientRect();
        const barBaseLeft = barBaseRect.left;  // The left edge of the #bar-base relative to the viewport
        progressBar.style.left = `${barBaseLeft}px`;
        
        const progressWidth = (index / (numDataPoints - 1)) * barBaseRect.width; // full width is 1000px
        progressBar.style.width = `${progressWidth}px`;
    }


    function showDrawing(index) {
        const drawing = [
            '<img src="images/pic1.png" alt="drawing of nini laying down">',
            '<img src="images/pic2.png" alt="drawing of nini wanting apple">',
            '<img src="images/pic3.png" alt="drawing of nini in the bath">',
            '<img src="images/pic4.png" alt="drawing of nini in the bath">',
            '<img src="images/pic5.png" alt="drawing of nini being wrapped in a towel">',
            '<img src="images/pic6.png" alt="drawing of nini getting dried">',
            '<img src="images/pic7.png" alt="drawing of nini getting dried">',
            '<img src="images/pic8.png" alt="drawing of nini getting mad while being dried">',
            '<img src="images/pic9.png" alt="drawing of nini being homework support">',
            '<img src="images/pic10.png" alt="drawing of nini eating dental chew">'
        ];

        const drawingDiv = document.querySelector('#drawing');
        drawingDiv.innerHTML = drawing[index % drawing.length]; // cycle if not enough images
    }

    function updateSentence(spot, index) {
        const data = globalData[index];
        document.querySelector('#time').textContent = data.time;
        document.querySelector('#treat').textContent = data.treat;
        document.querySelector('#reason').textContent = data.reason;
    
        const sentence = document.querySelector('#sentence');
        const spotRect = spot.getBoundingClientRect();
        const containerRect = document.querySelector('#fixed-container').getBoundingClientRect();
    
        const spotCenter = spotRect.left + spotRect.width / 2;
        const containerLeft = containerRect.left;
        const relativeLeft = spotCenter - containerLeft;
    
        const relativeLeftPercent = (relativeLeft / containerRect.width) * 100;
    
        sentence.style.left = `${relativeLeftPercent}%`;
    }

    function updateLines(activeSpot) {
        const allLines = document.querySelectorAll('.spot .line');
    
        allLines.forEach(line => {
            line.style.opacity = '0'; // hide all lines
        });
    
        const activeLine = activeSpot.querySelector('.line');
        if (activeLine) {
            activeLine.style.opacity = '1'; // show active line
        }
    }

    document.querySelectorAll('.spot').forEach(spot => {
        spot.addEventListener('mouseleave', function(){
            document.querySelector('#sentence').style.backgroundColor = 'transparent';
        }); // Remove background on mouse leave
    });

    getData();
})();