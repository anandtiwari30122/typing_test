const inputText = document.getElementById('inputText');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');
const errorsDisplay = document.getElementById('errors');
const sampleText = document.getElementById('sampleText').textContent;

let startTime;
let elapsedTime = 0;
let timerInterval;
let errorCount = 0;

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
    timeDisplay.textContent = Math.floor(elapsedTime / 1000);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 1000);
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

function resetAll() {
    resetTimer();
    inputText.value = '';
    timeDisplay.textContent = 0;
    speedDisplay.textContent = 0;
    errorsDisplay.textContent = 0;
    errorCount = 0;
}

function calculateSpeed() {
    const totalCharacters = inputText.value.length; // Count all characters including spaces
    const elapsedTimeMinutes = elapsedTime / 1000 / 60; // Convert milliseconds to minutes
    const speed = elapsedTimeMinutes > 0 ? Math.floor(totalCharacters / 5 / elapsedTimeMinutes) : 0;
    speedDisplay.textContent = speed;
}

function checkErrors() {
    const inputWords = inputText.value.split(/\s+/);
    const sampleWords = sampleText.split(/\s+/);
    
    errorCount = 0; // Reset total error count
    
    inputWords.forEach((word, index) => {
        if (sampleWords[index] && word !== sampleWords[index]) {
            errorCount++;
        }
    });

    errorsDisplay.textContent = errorCount;
}

// Debounce input event to optimize performance
let debounceTimeout;
inputText.addEventListener('input', () => {
    if (!startTime) startTimer();
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        checkErrors();
        calculateSpeed();
    }, 300);
});

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetAll);

// Initialize the pause button as disabled
document.getElementById('pauseBtn').disabled = true;
