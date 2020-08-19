window.addEventListener("load", init);

// Global variables

// Available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}

let time = levels.medium;
let score = 0;
let maxScoreValue = 0;
let isPlaying;

const currentLevel = levels.medium;

// DOM elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const maxScoreDisplay = document.querySelector("#maxScore");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];


// Initialize game
function init() {
  // Show number of seconds
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Load max score
  showMaxScore();
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

function showWord(words) {
  // Generate random index
  let randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  if (score > maxScoreValue) {
    maxScoreValue++;
    localStorage.setItem('maxScore', JSON.stringify(maxScoreValue));
  }

  showMaxScore();

  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  }
  else {
    scoreDisplay.innerHTML = score;
  }
}

function matchWords() {
  if (wordInput.value == currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  }
  else {
    return false;
  }
}

function showMaxScore() {
  maxScoreValue = getMaxScore();

  maxScoreDisplay.innerHTML = maxScoreValue;
}

function getMaxScore() {
  let maxScore;

  if (localStorage.getItem('maxScore') == null) {
    maxScore = 0;
  }
  else {
    maxScore = JSON.parse(localStorage.getItem("maxScore"));
  }

  return maxScore;
}

function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  }
  else if (time === 0) {
    // Game over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time == 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}








