'use strict';
//Get Document Objects
//Players
const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');
//Players Scores
const playersScore = document.querySelectorAll('p[id *= "score"]');
//Players's current Score
const playersCurrentScore = document.querySelectorAll('p[id *= "current"]');
// Dice
const dice = document.querySelector('.dice');
//Call to Actions
const newGameButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

//init
playersScore[0].textContent = 0;
playersCurrentScore[0].textContent = 0;
playersScore[1].textContent = 0;
playersCurrentScore[1].textContent = 0;
let activePlayer = 0;
dice.style.opacity = '0';

function getRandomDice() {
    return Math.trunc(Math.random() * 6) + 1;
}
// let current = [0, 0];
// let score = [0, 0];

// let digit = getRandomDice();
// console.log(digit);
//Game Logic
//Roll
rollButton.addEventListener('click', function() {
    const digit = getRandomDice();
    dice.setAttribute('src', `images/dice-${digit}.png`);
    dice.style.opacity = '1';
    dice.classList.add('animate');
    setTimeout(function() {
        dice.classList.remove('animate');
    }, 150);
    if (digit == 1) {
        playersCurrentScore[activePlayer].textContent = 0;
        activePlayer ? activePlayer = 0 : activePlayer = 1;
        firstPlayer.classList.toggle('player--active');
        secondPlayer.classList.toggle('player--active');

    } else {
        playersCurrentScore[activePlayer].textContent = Number(playersCurrentScore[activePlayer].textContent) + digit;
    }

});
/// Hold
holdButton.addEventListener('click', function() {
    firstPlayer.classList.toggle('player--active');
    secondPlayer.classList.toggle('player--active');
    playersScore[activePlayer].textContent = Number(playersScore[activePlayer].textContent) + Number(playersCurrentScore[activePlayer].textContent);
    playersCurrentScore[activePlayer].textContent = 0;
    if (!checkWinning()) {
        activePlayer ? activePlayer = 0 : activePlayer = 1;
    }


});
//New
newGameButton.addEventListener('click', function() {
    playersScore[0].textContent = 0;
    playersCurrentScore[0].textContent = 0;
    playersScore[1].textContent = 0;
    playersCurrentScore[1].textContent = 0;
    activePlayer = 0;
    dice.style.opacity = '0';
    secondPlayer.classList.remove('player--winner');
    firstPlayer.classList.remove('player--winner');
    rollButton.removeAttribute('disabled');
    holdButton.removeAttribute('disabled');

});
//winning
function checkWinning() {
    if (Number(playersScore[activePlayer].textContent) >= 100) {
        rollButton.setAttribute('disabled', 'true');
        holdButton.setAttribute('disabled', 'true');
        dice.style.opacity = '0';
        if (activePlayer) {
            secondPlayer.classList.add('player--winner');
        } else {
            firstPlayer.classList.add('player--winner');
        }
        return true;
    }
    return false;
}