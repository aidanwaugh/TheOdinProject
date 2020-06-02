//DOM Variables
const buttons = document.querySelectorAll("button");
let playerScore = document.getElementById("playerSpan");
let computerScore = document.getElementById("compSpan");
let gameScore = document.getElementById("gameSpan");
let compRPS = document.getElementById("compRPS");
let playerUI = document.getElementById("playerRPS");
let msg = document.getElementById("msg");

//game variables
let totalGameRound = 5;
let gameRound = 0;
let computerWin = 0;
let playerWin = 0;
let gameMsg;
let userPrompt = "";
let playerRPS;
let computerRPS;
let compOptions = ["rock", "paper", "scissors"];

function updateScore() {
  playerScore.innerText = playerWin;
  computerScore.innerText = computerWin;
  gameScore.innerText = gameRound + "/" + totalGameRound;
  msg.innerText = gameMsg;
}

function computerPlay() {
  return compOptions[Math.floor(Math.random() * 3)];
}

function roundPlay(playerRPS, computerRPS) {
  if (playerRPS == "rock" && computerRPS == "rock") {
    gameRound++;
    gameMsg = "Tie. 2 Rocks";
  } else if (playerRPS == "rock" && computerRPS == "paper") {
    computerWin++;
    gameRound++;
    gameMsg = "You lose. Paper beats rock.";
  } else if (playerRPS == "rock" && computerRPS == "scissors") {
    playerWin++;
    gameRound++;
    gameMsg = "You win. Rock beats scissors";
  } else if (playerRPS == "paper" && computerRPS == "rock") {
    playerWin++;
    gameRound++;
    gameMsg = "You win. Paper beats rock";
  } else if (playerRPS == "paper" && computerRPS == "paper") {
    gameRound++;
    gameMsg = "Tie game. 2 papers";
  } else if (playerRPS == "paper" && computerRPS == "scissors") {
    computerWin++;
    gameRound++;
    gameMsg = "You lose. Scissors beats paper.";
  } else if (playerRPS == "scissors" && computerRPS == "rock") {
    computerWin++;
    gameRound++;
    gameMsg = "You lose. Rock beats scissors";
  } else if (playerRPS == "scissors" && computerRPS == "paper") {
    playerWin++;
    gameRound++;
    gameMsg = "You win. Scissors beats paper";
  } else {
    gameRound++;
    gameMsg = "Tie game. 2 Scissors";
  }
}

function game() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      playerRPS = button.innerText;
      computerRPS = computerPlay();
      compRPS.innerText = computerRPS;
      playerUI.innerText = playerRPS;
      console.log("you " + playerRPS + "   computer " + computerRPS);
      roundPlay(playerRPS, computerRPS);
      updateScore();
      if (gameRound == totalGameRound) {
        if (playerWin > computerWin) {
          alert(`You win! GAME OVER  ${playerWin}/${gameRound}`);
        } else if (playerWin < computerWin) {
          alert(`You Lose! GAME OVER ${computerWin}/${gameRound}`);
        } else {
          alert(`tie game GAME OVER ${playerWin}/${gameRound}`);
        }
      }
    });
  });
}

game();
