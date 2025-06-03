(function(){
    'use strict';

    const action = document.querySelector('#action');

    const futureTransition = document.querySelector('#future-transition');
    const futureQuestion = document.querySelector('#future-question');
    const utopia = document.querySelector('#utopic-future');
    const dystopia = document.querySelector('#dystopic-future');
    const futureBtn = document.querySelector('#future-reveal');
    const futureExp = document.querySelector('#future-experience');
    const tryAgain = document.querySelector('#try-again');

    futureTransition.style.display = 'none';
    futureQuestion.style.display = 'none';
    utopia.style.display = 'none';
    dystopia.style.display = 'none';
    tryAgain.style.display = 'none';

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
                nextQuestion.style.display = 'block';
            } else {
                const resultText = document.getElementById('result-text');
                document.querySelector('.result').style.display = 'block';

                const averageScore = totalScore / totalQuestions;

                console.log('Total Score:', totalScore);
                console.log('Total Questions:', totalQuestions);
                console.log('Average Score:', averageScore);

                if (averageScore >= 67) {
                    resultText.textContent = "You've shown confidence and empathy. Let's see a utopic future!";
                    resultText.dataset.future = 'utopic';
                } else {
                    resultText.textContent = "Silence and stigma still linger. Let's see a dystopic future.";
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
            futureTransition.style.display = 'none';
            futureQuestion.style.display = 'flex';
        }, 2000);
    });

    // Click: "View Future Experience" button
    futureExp.addEventListener('click', function(){
        utopia.style.display = 'none';
        dystopia.style.display = 'none';

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
        tryAgain.style.display = 'block';

    });

    function resetQuiz() {
        // Hide all future sections
        futureTransition.style.display = 'none';
        futureQuestion.style.display = 'none';
        utopia.style.display = 'none';
        dystopia.style.display = 'none';
        tryAgain.style.display = 'none';
        action.style.display = 'flex';

        // Reset quiz state
        currentQuestion = 1;
        totalScore = 0;

        // Hide result and future button
        document.querySelector('.result').style.display = 'none';

        // Reset all questions
        document.querySelectorAll('.question').forEach((q, index) => {
            q.style.display = index === 0 ? 'block' : 'none'; // Show first question
        });

        // Scroll back to quiz
        document.getElementById('action').scrollIntoView({ behavior: 'smooth' });
    }

    tryAgain.addEventListener('click', resetQuiz);
})();