'use strict';

const numberDisplay = document.querySelector('.number');
const guessInput = document.querySelector('.guess-input');
const checkButton = document.querySelector('.btn--check');
const messageDisplay = document.querySelector('.message');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');
const againButton = document.querySelector('.btn--again');
const bodyElement = document.body;

const MAX_SCORE = 20;
const MIN_NUMBER = 1;
const MAX_NUMBER = 20;

let secretNumber;
let currentScore;
let highscore = 0;

const generateSecretNumber = () => Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;

const displayMessage = (message, type = 'normal') => {
    messageDisplay.textContent = message;
    messageDisplay.classList.remove('correct', 'wrong');
    if (type === 'correct') {
        messageDisplay.classList.add('correct');
    } else if (type === 'wrong') {
        messageDisplay.classList.add('wrong');
    }
};

const updateScoreUI = (score) => {
    scoreDisplay.textContent = score;
};

const updateNumberDisplay = (numberText) => {
    numberDisplay.textContent = numberText;
};

const updateBackground = (isCorrect) => {
    bodyElement.classList.toggle('correct', isCorrect);
};

const updateHighscore = () => {
    if (currentScore > highscore) {
        highscore = currentScore;
        highscoreDisplay.textContent = highscore;
    }
};

const enableGameControls = (enabled) => {
    checkButton.disabled = !enabled;
    guessInput.disabled = !enabled;
};

const initializeGame = () => {
    secretNumber = generateSecretNumber();
    currentScore = MAX_SCORE;

    updateScoreUI(currentScore);
    updateNumberDisplay('?');
    displayMessage('Start guessing...');
    updateBackground(false);
    guessInput.value = '';
    guessInput.focus();
    enableGameControls(true);
};

const handleGuess = () => {
    const guess = Number(guessInput.value);

    if (!guess || guess < MIN_NUMBER || guess > MAX_NUMBER) {
        displayMessage(`⛔ Enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}!`, 'wrong');
        return;
    }

    if (guess === secretNumber) {
        displayMessage('🎉 Correct Number!', 'correct');
        updateNumberDisplay(secretNumber);
        updateBackground(true);
        updateHighscore();
        enableGameControls(false);
    } else {
        if (currentScore > 1) {
            currentScore--;
            updateScoreUI(currentScore);
            const hint = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
            displayMessage(hint, 'wrong');
        } else {
            displayMessage('💥 You lost the game!', 'wrong');
            updateScoreUI(0);
            enableGameControls(false);
        }
    }
};

checkButton.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    } else if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Tab') {
    }
});

againButton.addEventListener('click', initializeGame);

initializeGame();
