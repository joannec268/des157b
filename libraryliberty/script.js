$(function () {
    $("#quit-btn").hide();
    $("#instructions-container").hide();

    const fruits = ["strawberry", "grape", "peach"];
    const fruitFolder = "images/";
    const pop = new Audio("audios/pop.mp3");
    const click = new Audio("audios/click.mp3");
    let gameInterval;
    let score = 0;

    function generateFruit() {
        const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
        const fruitImg = $("<img>")
            .attr("src", fruitFolder + randomFruit + ".svg")
            .attr("data-fruit", randomFruit)
            .addClass("fruit")
            .css({
                position: "absolute",
                top: Math.random() * ($("#game-area").height() - 50) + "px",
                left: Math.random() * ($("#game-area").width() - 50) + "px",
            });
  
        $("#game-area").append(fruitImg);

        fruitImg.draggable({
            revert: "invalid" // Revert if not dropped in correct place
        });
    }

    $(".basket").droppable({
        accept: function (draggable) {
            return $(this).data("fruit") === $(draggable).data("fruit");
        },
        drop: function (event, ui) {
            // ui.draggable.remove(); 
            gsap.to(ui.draggable, {
                scale: 1.2,
                duration: 0.03,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(ui.draggable, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.25,
                        ease: "power1.in",
                        onComplete: () => {
                            ui.draggable.remove();
                        }
                    });
                }
            });
            pop.play();
            addPoint();
        }
    });
  
    $("#start-btn").on("click", function () {
        click.play();
        // Hide the start button
        $(this).hide();
        $("#quit-btn").show();   
        // Reset
        $("#game-area").empty();
        
        score = 0;
        $("#score").text("Sorted Fruits: 0");

        $("#timer").text("Timer: 1:00");
        let timeLeft = 60; // in seconds

        const timerInterval = setInterval(function () {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            $("#timer").text(`Timer: ${minutes}:${seconds.toString().padStart(2, '0')}`);
        
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearInterval(gameInterval);
                alert("Time's up! Your score: " + score);
                location.reload();
            }
        }, 1000);

        // Start generating fruit every second
        gameInterval = setInterval(generateFruit, 1000);
    });
  
    // OPTIONAL: Example handler if you later implement drag-drop scoring
    function addPoint() {
        score++;
        $("#score").text("Score: " + score);
    }

    $("#quit-btn").on('click', function(){
        click.play().then(() => {
            setTimeout(() => {
                location.reload();
            }, 200);
        })
    });

    $("#sound").on('click', function() {
        const audios = [pop, click];
        
        // checks if the first audio is muted to toggle all
        const isMuted = audios[0].muted;
        
        // loops through all the audios to mute or unmute
        for (let i = 0; i < audios.length; i++) {
            audios[i].muted = !isMuted;
        }
    
        // changes the icon to mute or unmute depending on the audio state
        if (isMuted) {
            $("#sound")[0].classList.replace("fa-volume-xmark", "fa-volume-high"); 
        } else {
            $("#sound")[0].classList.replace("fa-volume-high", "fa-volume-xmark"); 
        }
    });

    $("#help").on('click', function(){
        click.play();
        $("#instructions-container").show();
    });

    $("#okay").on('click', function(){
        click.play();
        $("#instructions-container").hide();
    });
});
  