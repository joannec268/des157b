(function(){
    'use strict';
    AOS.init();

    const action = document.querySelector('#action');

    const futureTransition = document.querySelector('#future-transition');
    const utopia = document.querySelector('#utopic-future');
    const dystopia = document.querySelector('#dystopic-future');
    const futureBtn = document.querySelector('#future-reveal');
    const tryAgain = document.querySelector('#try-again');
    const quizQ = document.querySelector('#quizQuestion');
    const ending = document.querySelector('#ending');

    futureTransition.style.display = 'none';
    utopia.style.display = 'none';
    dystopia.style.display = 'none';
    // tryAgain.style.display = 'none';
    ending.style.display = 'none';

    // Quiz logic
    let currentQuestion = 1;
    let totalScore = 0;

    const questions = document.querySelectorAll('.question');
    const totalQuestions = questions.length;

    document.querySelectorAll('.question button').forEach(button => {
        button.addEventListener('click', () => {
            const score = parseInt(button.getAttribute('data-score'));
            totalScore += score;
            // document.querySelector(`.question[data-question="${currentQuestion}"]`).style.display = 'none';
            const currentEl = document.querySelector(`.question[data-question="${currentQuestion}"]`);
            if (currentEl) currentEl.style.display = 'none';
            currentQuestion++;

            const nextQuestion = document.querySelector(`.question[data-question="${currentQuestion}"]`);
            if (nextQuestion) {
                nextQuestion.style.display = 'flex';
            } else {
                const resultText = document.getElementById('result-text');
                document.querySelector('.result').style.display = 'flex';

                const averageScore = totalScore / totalQuestions;

                console.log('Total Score:', totalScore);
                console.log('Total Questions:', totalQuestions);
                console.log('Average Score:', averageScore);

                quizQ.innerHTML = 'Menstruation in the Future';
                
                if (averageScore >= 67) {
                    resultText.textContent = "Your confidence and positivity are influencing the world. Let's see a utopic future!";
                    resultText.dataset.future = 'utopic';
                } else {
                    resultText.textContent = "Unfortunately, silence and stigma still linger. Let's see a dystopic future.";
                    resultText.dataset.future = 'dystopic';
                }
            }
        });
    });

    // Click: "Go to Future" button
    futureBtn.addEventListener('click', function(){
        action.style.display = 'none';
        futureTransition.style.display = 'flex';

        setTimeout(() => {
            const futureType = document.getElementById('result-text').dataset.future;
            if (futureType === 'utopic') {
                utopia.style.display = 'flex';
                utopia.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    AOS.refresh();
                }, 100);
            } else {
                dystopia.style.display = 'flex';
                dystopia.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    AOS.refresh();
                }, 100);
            }
        // tryAgain.style.display = 'block';
        ending.style.display = 'flex';
        }, 2000);
    });

    function resetQuiz() {
        // Hide all future sections
        futureTransition.style.display = 'none';
        utopia.style.display = 'none';
        dystopia.style.display = 'none';
        // tryAgain.style.display = 'none';
        ending.style.display = 'none';
        action.style.display = 'flex';

        // Reset quiz state
        currentQuestion = 1;
        totalScore = 0;

        // Hide result and future button
        document.querySelector('.result').style.display = 'none';

        // Reset all questions
        document.querySelectorAll('.question').forEach((q, index) => {
            q.style.display = index === 0 ? 'flex' : 'none'; // Show first question
        });

        // Scroll back to quiz
        document.getElementById('action').scrollIntoView({ behavior: 'smooth' });
    }

    tryAgain.addEventListener('click', resetQuiz);


    // --------typewriter--------
    function typewriterEffect(el, text) {
        if (!el) return;

        el.textContent = ''; // Clear text first

        const chars = text.split('');
        chars.forEach((char, i) => {
            gsap.to({}, {
                delay: i * 0.05,
                onComplete: () => {
                    el.textContent += char;
                }
            });
        });
    }

    // Observe elements as they come into view
    const headingsToAnimate = [
        { selector: '#medieval-heading', text: 'Going to the Medieval Times...' },
        { selector: '#present-heading', text: 'Going to the Present Time...' },
        { selector: '#future-heading', text: 'Going to the Future Time...' },
    ];

    const animatedHeadings = new Set();

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (!animatedHeadings.has(el)) {
                    const item = headingsToAnimate.find(h => document.querySelector(h.selector) === el);
                    if (item) {
                        typewriterEffect(el, item.text);
                        animatedHeadings.add(el); // prevent re-triggering
                        observer.unobserve(el);
                    }
                }
            }
        });
    }, { threshold: 0.6 });

    headingsToAnimate.forEach(h => {
        const el = document.querySelector(h.selector);
        if (el) observer.observe(el);
    });


})();