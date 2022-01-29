let timeLeft = 60;
let intervalId;
let timerEl = document.querySelector(".timer");
let startButton = document.querySelector("#startButton");
let clearButton = document.querySelector("#clearButton");
let questions = document.querySelector("#questions");
let answerChoices = document.querySelector("#answerChoices");
// let answer0 = document.querySelector("#btn0");
// let answer1 = document.querySelector("#btn1");
// let answer2 = document.querySelector("#btn2");
// let answer3 = document.querySelector("#btn3");
let counter = 0;
let userGuess = 0;
let scoreTable = document.querySelector(".scoretable");
let timeSection = document.querySelector(".timeSection");

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


// function currentQuestion () {
        // userGuess = 0;
        // document.querySelector("#questions").textContent = quizContent[counter].question;
        // answer0.textContent = quizContent[counter].answers[0];
        // answer0.dataset.value = 0;
        // answer1.textContent = quizContent[counter].answers[1];
        // answer1.dataset.value = 1;
        // answer2.textContent = quizContent[counter].answers[2];
        // answer2.dataset.value = 2;
        // answer3.textContent = quizContent[counter].answers[3];
        // answer3.dataset.value = 3;  

    //     answerChoices.textContent = ''
    //     for (let i = 0; i < answer.length; i++) {
    //         let choiceBtn =document.createElement('button');
    //         choiceBtn.setAttribute("onclick", "checkAnswer");
    //         choiceBtn.classList.add("btn", "m-2", "bg-dark", "text-light");
    //         choiceBtn.append(answerChoices);
            
    //     }

    //     console.log(counter);

    // };    

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
        // Use `clearInterval()` to stop the timer
        // clearInterval(intervalId);
        // Call the `gameOver` function
        timeLeft = 0;
        gameOver();
    }
}, 1000);
};


function gameOver () {
    clearInterval(intervalId);
    let timeRemaining = timeLeft;
    let finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is: " + timeRemaining;

    timeSection.appendChild(finalScore);

     // Label and input for user to type initials
     let initialLabel = document.createElement("label");
     initialLabel.setAttribute("id", "createLabel");
     initialLabel.textContent = "Enter your initials: ";
 
     timeSection.appendChild(initialLabel); 

    let initialInput = document.createElement("input");
    initialInput.setAttribute("type", "text");
    initialInput.setAttribute("id", "initials");
    initialInput.textContent = "";

    timeSection.appendChild(initialInput);

    // submit button after initials have been typed
    let initialSubmit = document.createElement("button");
    initialSubmit.setAttribute("type", "submit");
    initialSubmit.setAttribute("id", "Submit");
    initialSubmit.textContent = "Submit";

    timeSection.appendChild(initialSubmit);

    initialSubmit.addEventListener("click", function () {
        let initials = initialInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            let finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            let newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            renderLastScore();
        }
});
};

function renderLastScore() {
    let allScores = localStorage.getItem("allScores");
    console.log(allScores);
    allScores = JSON.parse(allScores);

    if (allScores !== null) {

    for (let i = 0; i < 5; i++) {

        let initialLi = document.createElement("li");
        initialLi.textContent = allScores[i].initials + " " + allScores[i].score;
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
//   while (timeSection.firstChild) {
//   timeSection.removeChild(timeSection.firstChild);
//   }
});

// answer0.addEventListener("click", function() {
//     console.log(answer0.dataset.value);
//     userGuess = answer0.dataset.value;
//     checkAnswer();
// });

// answer1.addEventListener("click", function() {
//     console.log(answer1.dataset.value);
//     userGuess = answer1.dataset.value;
//     checkAnswer();
// });

// answer2.addEventListener("click", function() {
//     console.log(answer2.dataset.value);
//     userGuess = answer2.dataset.value;
//     checkAnswer();
// });
        
// answer3.addEventListener("click", function() {
//     console.log(answer3.dataset.value);
//     userGuess = answer3.dataset.value;
//     checkAnswer();
// });

clearButton.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});

// renderLastScore();