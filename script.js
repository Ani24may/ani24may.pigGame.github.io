"use strict";

//selecting elements
const score1El = document.querySelector("#score-1");
//getElementById is faster than querySelector
const score2El = document.getElementById("score-2");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-position-1");
const btnRoll = document.querySelector(".btn-position-2");
const btnHold = document.querySelector(".btn-position-3");
const currentScorePlayer1El = document.getElementById("current-1");
const currentScorePlayer1E2 = document.getElementById("current-2");
const player1El = document.querySelector(".player-1");
const player2El = document.querySelector(".player-2");

score1El.textContent = 0;
score2El.textContent = 0;

let activePlayer, currentScore, finalScore, isPlaying;

const init = () => {
  activePlayer = 1;
  currentScore = 0;
  finalScore = [0, 0];
  isPlaying = true;
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScorePlayer1El.textContent = 0;
  currentScorePlayer1E2.textContent = 0;
  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");
  player1El.classList.add("player--active");
  player2El.classList.remove("player--active");
  diceEl.classList.add("hidden");
};

init();

const switchPlayer = () => {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle("player--active");
  player2El.classList.toggle("player--active");
  //here toggle means it wil automatically add or remove
  //if player 1 has player-active class then it will remove and vice versa
  //same for player 2
};

btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    //generate random doll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    //add current score to active player's final score
    finalScore[activePlayer - 1] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      finalScore[activePlayer - 1];
    currentScore = 0;

    //check if player's score >=100
    if (finalScore[activePlayer - 1] >= 100) {
      isPlaying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
