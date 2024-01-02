/*Acceptance Criteria
When Start Button is clicked, a timer starts and user is presented with a question
When a question is answered, another question is presented on screen
If a question is answered incorrectly, time is subtracted from the clock
If all questions are answered OR the timer reaches 0 then the game is over
When the quiz is over, user is presented with a screen that will prompt them to save their initials and score*/

var welcome = document.querySelector("#start-screen");
var startBtn = document.querySelector("#start");
var introPage = document.querySelector("#start-screen");

var questionPage = document.querySelector("#questions");
var askQuestion = document.querySelector("#question-title");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#choice1");
var answerBtn2 = document.querySelector("#choice2");
var answerBtn3 = document.querySelector("#choice3");
var answerBtn4 = document.querySelector("#choice4");

var checkLine = document.querySelector("#feedback");
var scoreBoard = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var userInitial = document.querySelector("#initials");

var submitBtn = document.querySelector("#submit");
var highScorePage = document.querySelector("#highscores");
var scoreRecord = document.getElementById("score-record");
var scoreCheck = document.querySelector(".scores a");

var backBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear-scores");

//defining questions
var questionSource = [
    {
        question:
            "Question 1 : Which country hosted the first ever Eurovision Song Contest in 1956?",
        choices: [
            "a. UK",
            "b. Switzerland",
            "c. Germany",
            "d. France"],
        answer: "b",
    },
    {
        question: "Question 2 : How many times has Sweden won Eurovision?:",
        choices: [
            "a. one",
            "b. three",
            "c. five",
            "d. seven"],
        answer: "d",
    },
    {
        question: "Question 3 : In what year did ABBA win Eurovision with the song 'Waterloo'?",
        choices: [
            "a. 1971",
            "b. 1974",
            "c. 1975",
            "d. 1972",
        ],
        answer: "b",
    },
    {
        question: "Question 4 : From what year were entrants NO LONGER required to sing in their country's official language?",
        choices: [
            "a. 1980",
            "b. 1992",
            "c. 1999",
            "d. 2001",
        ],
        answer: "c",
    },
    {
        question:
            "Question 5 : As of 2023, which country has received the most public votes in any given year?",
        choices: [
            "a. Finland",
            "b. Sweden",
            "c. Portugal",
            "d. Ukraine"],
        answer: "d",
    },
    {
        question: "Question 6 : Since 2009, taking on after Terry Wogan, who has famously commentated Eurovision for the BBC?",
        choices: [
            "a. Graham Norton",
            "b. Jeremy Clarkson",
            "c. Alan Carr",
            "d. Boris Johnson"],
        answer: "a",
    },
    {
        question: "Question 7 : Who holds the record for the most 'nil-pois'?",
        choices: [
            "a. UK",
            "b. Germany",
            "c. Norway",
            "d. France"],
        answer: "c",
    },
    {
        question:
            "Question 8 : Eurovision has only ever been cancelled once. In what year?",
        choices: [
            "a. 1964",
            "b. 2001",
            "c. 2020",
            "d. 1991"],
        answer: "c",
    },
];

// setting timer variables
var timeLeft = document.getElementById("time");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

// timer functions
function countdown() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeft.textContent = "remaining: " + secondsLeft + " s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time's Up!";
            finish.textContent = "Time's Up!";
            gameOver();
        } else if (questionCount >= questionSource.length + 1) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function startQuiz() {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0;
    countdown();
    showQuestion(questionNumber);
}

// Present the questions and answers
function showQuestion(n) {
    askQuestion.textContent = questionSource[n].question;

    // Clear existing answer buttons
    document.getElementById("choices").innerHTML = "";

    for (var i = 0; i < questionSource[n].choices.length; i++) {
        var answerBtn = document.createElement("button");
        answerBtn.textContent = questionSource[n].choices[i];
        answerBtn.classList.add("choices");
        answerBtn.setAttribute("value", String.fromCharCode(97 + i)); 
        document.getElementById("choices").appendChild(answerBtn);
    }

    questionNumber = n;
}

//once choice is selected, present user with outcome
function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = "none";
    }, 1000);

    //checking if answer is correct
    if (questionSource[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!";
        totalScore = totalScore + 1;
    } else {
        secondsLeft = secondsLeft - 10;
        checkLine.textContent =
            "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
    }
    //once complete anothewr question displays on screen
    if (questionNumber < questionSource.length - 1) {
        showQuestion(questionNumber + 1);
    } else {
        gameOver();
    }
    questionCount++;
}

//when all questions are answered or timer reaches 0
function gameOver() {
    questionPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    finalScore.textContent = "Your final score is :" + totalScore;
    timeLeft.style.display = "none";
}

function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
}

function renderScore() {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    var highScores = sort();

    var topFive = highScores.slice(0, 5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        // Show the score list on the scoreboard
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
    }
}

// sorting scores
function sort() {
    var unsortedList = getScore();
    if (getScore == null) {
        return;
    } else {
        unsortedList.sort(function (a, b) {
            return b.score - a.score;
        });
        return unsortedList;
    }
}

// push new score and initial to the local storage
function addItem(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
}

function saveScore() {
    var scoreItem = {
        user: userInitial.value,
        score: totalScore,
    };
    addItem(scoreItem);
    renderScore();
}

function playAudioOnStart() {
    var audio = document.getElementById('myAudio');
    audio.play();
}

startBtn.addEventListener("click", function () {
    startQuiz();
    playAudioOnStart();
});

reactButtons.forEach(function (click) {
    click.addEventListener("click", checkAnswer);
});

// prompt to save info and move to the next page
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    saveScore();
});

//process to check high scores
scoreCheck.addEventListener("click", function (event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    renderScore();
});

//return to homepage shortcut
backBtn.addEventListener("click", function (event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    questionPage.style.display = "none";
    location.reload();
});

//clearing local storage
clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});

function showHighScores() {
    introPage.style.display = "none";
    questionPage.style.display = "none";
    scoreBoard.style.display = "none";
    highScorePage.style.display = "block";
    renderScore();
}

scoreCheck.addEventListener("click", function (event) {
    event.preventDefault();
    showHighScores();
});

function saveScore() {
    var scoreItem = {
        user: userInitial.value,
        score: totalScore,
    };
    addItem(scoreItem);
    showHighScores(); // Display high scores after saving
}