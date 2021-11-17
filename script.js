let timeLeft = 50;
let intervalId;
let timerEl = document.querySelector(".timer");
let startButton = document.querySelector("#startButton");
let questions = document.querySelector("#questions");
// let answerChoices = document.querySelectorAll(".answer-list")
let answer0 = document.querySelector("#btn0");
let answer1 = document.querySelector("#btn1");
let answer2 = document.querySelector("#btn2");
let answer3 = document.querySelector("#btn3");
let counter = 0;
let userGuess;

let quizContent = [
    {
        question: "What is 14 + 39?",
        answers: ["45", "53", "62", "63"],
        correctAnswer: 1,
    },
    {
        question: "What is 4 * 5?",
        answers: ["9", "15", "16", "20"],
        correctAnswer: 3,
    },
    {
        question: "What is 18 + 45?",
        answers: ["59", "62", "63", "73"],
        correctAnswer: 2,
    },
    {
        question: "What is 72 - 56",
        answers: ["13", "16", "17", "18"],
        correctAnswer: 1,
    },
    {
        question: "What is 1 + 1?",
        answers: ["2", "3", "4", "5"],
        correctAnswer: 0,
    },
    {
        question: "What is 102 - 43?",
        answers: ["47", "51", "57", "59"],
        correctAnswer: 3,
    },
]


function currentQuestion() {
        document.querySelector("#questions").textContent = quizContent[counter].question;
        answer0.textContent = quizContent[counter].answers[0];
        answer0.dataset.value = 0;
        answer1.textContent = quizContent[counter].answers[1];
        answer1.dataset.value = 1;
        answer2.textContent = quizContent[counter].answers[2];
        answer2.dataset.value = 2;
        answer3.textContent = quizContent[counter].answers[3];
        answer3.dataset.value = 3;  
    
        // for (let i = 0; i < answerChoices.length; i++) {
        //     answerChoices[i].addEventListener("click", function() {
        //         console.log(this.dataset.value);
        //         let userGuess = this.dataset.value
        //     });
        // };
   
        answer0.addEventListener("click", function() {
            console.log(answer0.dataset.value);
            userGuess = answer0.dataset.value;
            
            checkAnswer();
        });

        answer1.addEventListener("click", function() {
            console.log(answer1.dataset.value);
            userGuess = answer1.dataset.value;
            checkAnswer();
        });

        answer2.addEventListener("click", function() {
            console.log(answer2.dataset.value);
            userGuess = answer2.dataset.value;
            checkAnswer();
        });
                
        answer3.addEventListener("click", function() {
            console.log(answer3.dataset.value);
            userGuess = answer3.dataset.value;
            checkAnswer();
        });
};
    

function checkAnswer(){
 if (userGuess == quizContent[counter].correctAnswer) {
        if (counter < quizContent.length) {
            counter++;
            currentQuestion();
        } else {
            endGame();
        }
    } else {
        if (counter < quizContent.length) {
            timeLeft -= 10;
            counter++;
            currentQuestion();
        } else {
            endGame();
        }
    }
};


function countdown() {    
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    intervalId = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
    } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
    } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = "Time's Up!";
        // Use `clearInterval()` to stop the timer
        clearInterval(intervalId);
        // Call the `gameOver` function
        // gameOver();
    }
}, 1000);
};


    // function gameOver() {

    // }
    
      startButton.addEventListener("click", function() {
        clearInterval(intervalId);
        timeLeft = 50;
        counter = 0;
        countdown();
        currentQuestion();
      });