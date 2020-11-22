'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curScore0El = document.getElementById('current--0');
const curScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer, currentScore, scores, playing;

// starting condition
const init = function() {
   activePlayer = 0;
   currentScore = 0;
   scores = [0, 0];
   playing = true;

   score0El.textContent = 0;
   score1El.textContent = 0;
   curScore0El.textContent = 0;
   curScore1El.textContent = 0;

   diceEl.classList.add('hidden');

   player0El.classList.remove('player--winner');
   player1El.classList.remove('player--winner');
   player0El.classList.add('player--active');
   player1El.classList.remove('player--active');
}

init();

// switch the player fun
const switch_player = function() {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   player0El.classList.toggle('player--active');
   player1El.classList.toggle('player--active');
}



// rolling dice functionality
btnRoll.addEventListener('click', function() {
   if (playing) {
      // generate a random number
      const dice = Math.trunc(Math.random() * 6) + 1;

      // display the dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      // check for the value of dice is equal to 1 or not
      if (dice !== 1) {
         // add dice scroe to current score
         currentScore += dice;
         document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      } else {
         // switch to next player
         switch_player();
      }
   }
});

// hold btn functionality
btnHold.addEventListener('click', function() {
   if (playing) {
      // add scores to the active player scores
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

      // check if player win the match or not
      if (scores[activePlayer] >= 30) {
         playing = false;
         diceEl.classList.add('hidden');
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      } else {
         // switch player
         switch_player();
      }
   }
})

// new btn functionality
btnNew.addEventListener('click', init);
