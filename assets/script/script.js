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

var backBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear-scores");


