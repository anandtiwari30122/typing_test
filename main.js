const inputText = document.getElementById('inputText');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');
const errorsDisplay = document.getElementById('errors');

let startTime;
let timerInterval;
let errors = 0;

// Mock API for spelling check
async function checkSpelling(word) {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock logic: Assume words longer than 5 characters are correct
            const isCorrect = word.length <= 5 || Math.random() > 0.3;
            resolve(isCorrect);
        }, 100); // Simulate API response delay
    });
}

inputText.addEventListener('input', async () => {
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTime, 1000);
    }
    await checkSpellingErrors();
    calculateSpeed();
});

function updateTime() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timeDisplay.textContent = elapsedTime;
}

async function checkSpellingErrors() {
    const inputWords = inputText.value.split(' ');
    errors = 0;

    for (let i = 0; i < inputWords.length; i++) {
        const word = inputWords[i].trim();
        if (word) {
            const isCorrect = await checkSpelling(word);
            if (!isCorrect) {
                errors++;
            }
        }
    }

    errorsDisplay.textContent = errors;
}

function calculateSpeed() {
    const inputWords = inputText.value.split(' ');
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000 / 60; // in minutes
    const speed = Math.floor(inputWords.length / elapsedTime);
    speedDisplay.textContent = speed;
}

// Reset the test if needed
inputText.addEventListener('focus', () => {
    if (inputText.value === '') {
        clearInterval(timerInterval);
        startTime = null;
        timeDisplay.textContent = 0;
        speedDisplay.textContent = 0;
        errorsDisplay.textContent = 0;
    }
});
