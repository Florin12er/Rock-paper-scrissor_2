const Rock = document.getElementById("rock");
const Paper = document.getElementById("paper");
const Scissors = document.getElementById("scissors");
const gameScore = document.getElementById("game-score");
const whoWon = document.getElementById("who-won");
const play = document.getElementById("play");
const reset = document.getElementById("reset");

let playerScore = 0;
let computerScore = 0;
let player;

function computerlay() {
  let choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}
Rock.addEventListener("click", () => {
  Rock.style.border = " 2px solid #2c5282";
  Paper.style.border = "none";
  Scissors.style.border = "none";
  player = "rock";
});
Paper.addEventListener("click", () => {
  Paper.style.border = " 2px solid #2c5282";
  Rock.style.border = "none";
  Scissors.style.border = "none";
  player = "paper";
});
Scissors.addEventListener("click", () => {
  Scissors.style.border = " 2px solid #2c5282";
  Paper.style.border = "none";
  Rock.style.border = "none";
  player = "scissors";
});

function playRound(player, computer) {
  if (player === computer) {
    whoWon.textContent = "Tie!";
  } else if (player === "rock") {
    if (computer === "paper") {
      whoWon.textContent = "You Lose! Paper beats Rock";
      computerScore++;
    } else {
      whoWon.textContent = "You Win! Rock beats Scissors";
      playerScore++;
    }
  } else if (player === "paper") {
    if (computer === "scissors") {
      whoWon.textContent = "You Lose! Scissors beats Paper";
      computerScore++;
    } else {
      whoWon.textContent = "You Win! Paper beats Rock";
      playerScore++;
    }
  } else if (player === "scissors") {
    if (computer === "rock") {
      whoWon.textContent = "You Lose! Rock beats Scissors";
      computerScore++;
    } else {
      whoWon.textContent = "You Win! Scissors beats Paper";
      playerScore++;
    }
  }
}
function setScore() {
  gameScore.textContent = `Score: ${playerScore} - ${computerScore}`;
}
function resetScore() {
  playerScore = 0;
  computerScore = 0;
  whoWon.textContent = "Choose your weapon!";
  gameScore.textContent = `Score: ${playerScore} - ${computerScore}`;
}
reset.addEventListener("click", () => {
  resetScore();
});
play.addEventListener("click", () => {
  let computer = computerlay();
  playRound(player, computer);
  setScore();
});
