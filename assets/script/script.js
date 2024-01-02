// DOM elements
const welcome = document.querySelector("#start-screen");
const startBtn = document.querySelector("#start");
const introPage = document.querySelector("#start-screen");
const questionPage = document.querySelector("#questions");
const askQuestion = document.querySelector("#question-title");
const reactButtons = document.querySelectorAll(".choices");
const checkLine = document.querySelector("#feedback");
const scoreBoard = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const userInitial = document.querySelector("#initials");
const submitBtn = document.querySelector("#submit");
const highScorePage = document.querySelector("#highscores");
const scoreRecord = document.getElementById("score-record");
const scoreCheck = document.querySelector(".scores a");
const backBtn = document.querySelector("#go-back");
const clearBtn = document.querySelector("#clear-scores");
const timeLeft = document.getElementById("time");

// Timer variables
let secondsLeft = 60;
let questionNumber = 0;
let totalScore = 0;
let questionCount = 1;

// Timer functions
function countdown() {
    const timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeft.textContent = `remaining: ${secondsLeft}s`;

        if (secondsLeft <= 0 || questionCount >= questionSource.length + 1) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time's Up!";
            finish.textContent = "Time's Up!";
            gameOver();
        }
    }, 1000);
}

// Function to start the quiz
function startQuiz() {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0;
    countdown();
    showQuestion(questionNumber);
}

// Function to present questions and answers
function showQuestion(n) {
    askQuestion.textContent = questionSource[n].question;
    document.getElementById("choices").innerHTML = "";

    for (let i = 0; i < questionSource[n].choices.length; i++) {
        const answerBtn = document.createElement("button");
        answerBtn.textContent = questionSource[n].choices[i];
        answerBtn.classList.add("choices");
        answerBtn.setAttribute("value", String.fromCharCode(97 + i));
        document.getElementById("choices").appendChild(answerBtn);
    }

    questionNumber = n;
}

// Function to check the selected answer
function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(() => {
        checkLine.style.display = "none";
    }, 1000);

    if (questionSource[questionNumber].answer === event.target.value) {
        checkLine.textContent = "Correct!";
        totalScore++;
    } else {
        secondsLeft -= 10;
        checkLine.textContent = `Wrong! The correct answer is ${questionSource[questionNumber].answer}.`;
    }

    if (questionNumber < questionSource.length - 1) {
        showQuestion(questionNumber + 1);
    } else {
        gameOver();
    }
    questionCount++;
}

// Function to handle the end of the quiz
function gameOver() {
    questionPage.style.display = "none";
    scoreBoard.style.display = "block";
    finalScore.textContent = `Your final score is: ${totalScore}`;
    timeLeft.style.display = "none";
}

// Function to get the scores from local storage
function getScore() {
    const currentList = localStorage.getItem("ScoreList");
    return currentList !== null ? JSON.parse(currentList) : [];
}

// Function to render the high scores
function renderScore() {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    const highScores = sort();
    const topFive = highScores.slice(0, 5);

    for (let i = 0; i < topFive.length; i++) {
        const item = topFive[i];
        const li = document.createElement("li");
        li.textContent = `${item.user} - ${item.score}`;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
    }
}

// Function to sort the scores
function sort() {
    const unsortedList = getScore();
    return unsortedList.sort((a, b) => b.score - a.score);
}

// Function to add a new score to local storage
function addItem(n) {
    const addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
}

// Function to save the score and show high scores
function saveScore() {
    const scoreItem = {
        user: userInitial.value,
        score: totalScore,
    };
    addItem(scoreItem);
    showHighScores();
}

// Function to show high scores page
function showHighScores() {
    introPage.style.display = "none";
    questionPage.style.display = "none";
    scoreBoard.style.display = "none";
    highScorePage.style.display = "block";
    renderScore();
}

// Event listeners
startBtn.addEventListener("click", () => {
    startQuiz();
    playAudioOnStart();
});

reactButtons.forEach(button => {
    button.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", event => {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    saveScore();
});

scoreCheck.addEventListener("click", event => {
    event.preventDefault();
    showHighScores();
});

backBtn.addEventListener("click", event => {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    questionPage.style.display = "none";
    location.reload();
});

clearBtn.addEventListener("click", event => {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});
