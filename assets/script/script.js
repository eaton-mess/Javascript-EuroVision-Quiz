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


