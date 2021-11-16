// Script Sheet
let timeLeft = 50;
let intervalId;
let timerEl = document.querySelector(".timer");
let startButton = document.querySelector("#startButton");
let questions = document.querySelector("#questions")
let answerChoices = document.querySelector("#answer-list")


let questions = [
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
        answers: ["", "example"],
        correctAnswer: "example",
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
        question: "What is 372 * 109?",
        answers: ["36,018", "38,868", "39,978", "40,548"],
        correctAnswer: 3,
    },
]

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
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `gameOver` function
        // gameOver();
    }
}, 1000);
}

//   function startQuiz() {
    
    //   }
    
    // function gameOver() {

    // }
    
      startButton.addEventListener("click", function() {
        clearInterval(intervalId);
        timeLeft = 50;
        countdown();
        // startQuiz();
      });
