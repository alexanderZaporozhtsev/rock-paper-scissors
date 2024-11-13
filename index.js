const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const restartBtn = document.getElementById("restartBtn");

const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");
const playerScoreNode = document.getElementById("playerScore");
const playerSign = document.getElementById("playerSign");
const computerScoreNode = document.getElementById("computerScore");
const computerSign = document.getElementById("computerSign");
const overlay = document.getElementById("overlay");
const endgameMessage = document.getElementById("endgameMessage");

const endgameModal = document.getElementById("endgameModal");

rockBtn.addEventListener("click", () => handleClick("rock"));
paperBtn.addEventListener("click", () => handleClick("paper"));
scissorsBtn.addEventListener("click", () => handleClick("scissors"));
restartBtn.addEventListener("click", () => restartGame());
overlay.addEventListener("click", () => closeEndgameModal());

let playerScore = 0;
let computerScore = 0;

function getComputerSelection() {
  choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function updateScore(winner) {
  if (winner === "tie") {
    scoreInfo.textContent = "It's a tie";
  } else if (winner === "computer") {
    scoreInfo.textContent = "You lost..";
    computerScoreNode.textContent = `Computer: ${computerScore}`;
  } else if (winner === "player") {
    scoreInfo.textContent = "You won!";
    playerScoreNode.textContent = `Player: ${playerScore}`;
  }
}

function updateScoreInfo(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection}`;
  } else if (winner === "computer") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      computerSelection
    )} beats ${playerSelection}`;
  } else {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} ties with ${computerSelection}`;
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "rock":
      playerSign.textContent = "✊";
      break;
    case "paper":
      playerSign.textContent = "✋";
      break;
    case "scissors":
      playerSign.textContent = "✌";
  }

  switch (computerSelection) {
    case "rock":
      computerSign.textContent = "✊";
      break;
    case "paper":
      computerSign.textContent = "✋";
      break;
    case "scissors":
      computerSign.textContent = "✌";
  }
}

function playRound(playerSelection, computerSelection) {
  let winner = "";

  if (computerSelection === playerSelection) {
    winner = "tie";
  }

  if (
    (computerSelection === "paper" && playerSelection === "rock") ||
    (computerSelection === "rock" && playerSelection === "scissors") ||
    (computerSelection === "scissors" && playerSelection === "paper")
  ) {
    computerScore++;
    winner = "computer";
  }

  if (
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    winner = "player";
  }

  updateScore(winner);
  updateScoreInfo(winner, playerSelection, computerSelection);
}

function openEndgameModal() {
  endgameModal.classList.add("active");
  overlay.classList.add("active");
}

function closeEndgameModal() {
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}

function setFinalMessage() {
  playerScore > computerScore
    ? (endgameMessage.textContent = `You won ${playerScore}:${computerScore}!`)
    : (endgameMessage.textContent = `You lost ${computerScore}:${playerScore}..`);
}

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal();
    return;
  }

  const computerSelection = getComputerSelection();
  playRound(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);

  if (isGameOver()) {
    openEndgameModal();
    setFinalMessage();
  }
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = "Choose your weapon";
  scoreMessage.textContent = "First to score 5 points wins the game";
  playerScoreNode.textContent = "Player: 0";
  computerScoreNode.textContent = "Computer: 0";
  playerSign.textContent = "❔";
  computerSign.textContent = "❔";

  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}
