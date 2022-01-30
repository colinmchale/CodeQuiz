let timeLeft = 60;
let intervalId;
let timerEl = document.querySelector("#timer");
let startButton = document.querySelector("#startButton");
let clearButton = document.querySelector("#clearButton");
let questions = document.querySelector("#questions");
let answerChoices = document.querySelector("#answerChoices");
let results = document.querySelector("#results");
let scoreTable = document.querySelector("#scoreboard");
let counter = 0;
let userGuess = 0;


let allScores = [];

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

function renderQuestion (counter) {
    if (answerChoices.textContent) {
        answerChoices.textContent = ''
    }
    let currentQuestion = quizContent[counter];
    questions.textContent = quizContent[counter].question;
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        let choiceBtn = document.createElement('button');
        choiceBtn.classList.add("btn", "m-2", "answer-list");
        choiceBtn.setAttribute("onclick", "checkAnswer(event)");
        choiceBtn.setAttribute("value", i);
        choiceBtn.textContent = currentQuestion.answers[i];
        answerChoices.appendChild(choiceBtn);
    }
}  

function checkAnswer (event) {
    console.log(event.target.value)
    if (event.target.value == quizContent[counter].correctAnswer && counter < 5) {
        counter++;
        renderQuestion(counter);       
    } else if (event.target.value !== quizContent[counter].correctAnswer && counter < 5) {
        timeLeft -= 10;
        counter++;
        renderQuestion(counter);
    } else {
        gameOver();
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
        timeLeft = 0;
        gameOver();
    }
}, 1000);
};


function gameOver () {
    clearInterval(intervalId);
    let timeRemaining = timeLeft;
    timerEl.textContent = "";
    questions.textContent = "";
    answerChoices.textContent = "";
    let finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is: " + timeRemaining;

    results.appendChild(finalScore);

     // Label and input for user to type initials
    let initialLabel = document.createElement("label");
    initialLabel.setAttribute("id", "createLabel");
    initialLabel.textContent = "Enter your initials: ";
 
    results.appendChild(initialLabel); 

    let resultsForm = document.createElement("form");
    resultsForm.setAttribute("onsubmit", "saveHighScore(event)");

    results.appendChild(resultsForm);

    let initialInput = document.createElement("input");
    initialInput.setAttribute("type", "text");
    initialInput.setAttribute("id", "initials");
    initialInput.textContent = "";

    resultsForm.appendChild(initialInput);

    let initialSubmit = document.createElement("button");
    initialSubmit.setAttribute("type", "submit");
    initialSubmit.setAttribute("id", "Submit");
    initialSubmit.textContent = "Submit";

    resultsForm.appendChild(initialSubmit);
};

function saveHighScore(event) {
    let finalScore;
    event.preventDefault();
    console.log('test');
    let initialValue = document.querySelector("#initials");
    let userInitials = initialValue.value;
    let timeRemaining = timeLeft;
    console.log(initialValue.value);
    console.log(timeLeft);
    if (initials === null) {
        console.log("No value entered!");
    } else {
        finalScore = {
          initials: userInitials,
          score: timeRemaining
        }
    }
    console.log(finalScore)
    allScores.unshift(finalScore);
    let newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);
    renderHighScores();
}


function renderHighScores() {
    scoreTable.textContent = "";
    let allScores = localStorage.getItem("allScores");
    console.log(allScores);
    allScores = JSON.parse(allScores);

    if (allScores !== null) {

    for (let i = 0; i < allScores.length; i++) {

        let initialLi = document.createElement("li");
        initialLi.textContent = allScores[i].initials + "  " + allScores[i].score;
        scoreTable.appendChild(initialLi);
     }
    };
};

startButton.addEventListener("click", function() {
  clearInterval(intervalId);
  timeLeft = 60;
  counter = 0;
  countdown();
  renderQuestion(counter);
  if (results.textContent) {
    results.textContent = "";
  }
});

clearButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
  });

clearButton.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});

// renderHighScores();