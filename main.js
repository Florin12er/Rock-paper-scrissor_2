const elements = {
  rock: document.getElementById("rock"),
  paper: document.getElementById("paper"),
  scissors: document.getElementById("scissors"),
  gameScore: document.getElementById("game-score"),
  whoWon: document.getElementById("who-won"),
  play: document.getElementById("play"),
  reset: document.getElementById("reset"),
};

const playerChoices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let player;
let previousPlayerMove;
let biasFactor = 1.0; // Adjust this value to control the difficulty

function setBorder(element) {
  for (const key in elements) {
    elements[key].classList.remove("selected");
  }
  element.classList.add("selected");
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function choosePlayer(choice) {
  setBorder(elements[choice]);
  player = choice;
}

function computerPlay() {
  const randomIndex = Math.floor(Math.random() * playerChoices.length);
  const weightedChoices = playerChoices.map((choice) => {
    const weight = Math.random() + biasFactor * (playerScore - computerScore);
    return { choice, weight };
  });
  const sortedChoices = weightedChoices.sort((a, b) => b.weight - a.weight);
  return sortedChoices[randomIndex].choice;
}

function playRound(player, computer) {
  if (player === computer) {
    elements.whoWon.textContent = "Tie!";
  } else {
    const winMessage = `You Win! ${capitalizeFirstLetter(player)} beats ${capitalizeFirstLetter(computer)}`;
    const loseMessage = `You Lose! ${capitalizeFirstLetter(computer)} beats ${capitalizeFirstLetter(player)}`;

    if (previousPlayerMove === player) {
      const counterMove = getCounterMove(player);

      if (
        (counterMove === "rock" && computer === "scissors") ||
        (counterMove === "paper" && computer === "rock") ||
        (counterMove === "scissors" && computer === "paper")
      ) {
        elements.whoWon.textContent = `You win! ${capitalizeFirstLetter(player)} beats ${capitalizeFirstLetter(counterMove)}`;
        playerScore++;
      } else {
        elements.whoWon.textContent = `You lose! ${capitalizeFirstLetter(counterMove)} beats ${capitalizeFirstLetter(player)}`;
        computerScore++;
      }
    } else {
      if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
      ) {
        elements.whoWon.textContent = winMessage;
        playerScore++;
      } else {
        elements.whoWon.textContent = loseMessage;
        computerScore++;
      }
    }

    previousPlayerMove = player;
  }

  updateScore();
}

function getCounterMove(move) {
  switch (move) {
    case "rock":
      return "paper";
    case "paper":
      return "scissors";
    case "scissors":
      return "rock";
    default:
      return move;
  }
}

function updateScore() {
  elements.gameScore.textContent = `Score: ${playerScore} - ${computerScore}`;
}

function resetScore() {
  playerScore = 0;
  computerScore = 0;
  elements.whoWon.textContent = "Choose your weapon!";
  updateScore();
}

for (const key in elements) {
  if (key !== "reset" && key !== "play") {
    elements[key].addEventListener("click", () => choosePlayer(key));
  }
}

elements.reset.addEventListener("click", resetScore);

elements.play.addEventListener("click", () => {
  const computer = computerPlay();
  playRound(player, computer);
});

// Initial setup
resetScore();
