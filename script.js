"use strict";

//importing class/id to variables
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const activePlayer = document.querySelector('.player--active');
const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

//mutating variables
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

//declaring scores and playing conditions
let currentScore = [0,0];
let score = [0,0];
let playing = true;

//this will occur when currentScore on dice is 1 or when a player presses hold
let switchPlayer = () => {
    if(player0.classList.contains('player--active')) {
        player1.classList.add('player--active');
        player0.classList.remove('player--active');
        currentScore[0] = 0;
        currentScore0.textContent = currentScore[0];
    }
    else {
        player0.classList.add('player--active');
        player1.classList.remove('player--active');
        currentScore[1] = 0;
        currentScore1.textContent = currentScore[1];
    }
}

//to decide which player is currently rolling the dice
let whichPlayer = () => {
    if(player0.classList.contains('player--active')) return 0;
    else return 1;
}

//it will make the players screen different than normal and will halt the game
let wins = (temp) => {
    if(temp == 0) {
        player0.classList.add('player--winner');
        dice.classList.add('hidden');
    }
    else {
        player1.classList.add('player--winner');
        dice.classList.add('hidden');
    }
    playing = false;
}

//this will role the dice, current score will be displayed
let rollDiceFunction = () => {
    if(playing) {
        const diceValue = Math.trunc(Math.random()*6)+1;
        dice.src = `dice-${diceValue}.png`;
        dice.classList.remove('hidden');

        if(diceValue==1) {
            switchPlayer();
        }
        else {
            if(player0.classList.contains('player--active')) {
                currentScore[0] += diceValue;
                currentScore0.textContent = currentScore[0];
                if(currentScore[0] >= 100) wins(0);
            }
            else if(playing) {
                currentScore[1] += diceValue;
                currentScore1.textContent = currentScore[1];
                if(currentScore[1] >= 100) wins(1);
            }
        }
    }
}

//all score will become zero and player0(player1 in ui) will be set to default
let newGameFunction = () => {
    for(let i=0; i<score.length; i++) {
        score[i] = 0;
        currentScore[i] = 0;
    }
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    dice.classList.add('hidden');
    currentScore0.textContent = currentScore[0];
    currentScore1.textContent = currentScore[1];
}

//this will add current score to score
let holdFunction = () => {
    if(playing) {
        if(whichPlayer() == 0) {
            score[0] += currentScore[0];
            currentScore[0] = 0;
            currentScore0.textContent = currentScore[0];
            score0.textContent = score[0];
            if(score[0] >= 100) wins(0);
        }
        else {
            score[1] += currentScore[1];
            currentScore[1] = 0;
            currentScore1.textContent = currentScore[1];
            score1.textContent = score[1];
            if(score[1] >= 100) wins(1);
        }
        switchPlayer();
    }
}

rollDice.addEventListener('click', rollDiceFunction);
newGame.addEventListener('click', newGameFunction);
hold.addEventListener('click', holdFunction);