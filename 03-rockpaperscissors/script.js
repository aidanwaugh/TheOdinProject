//DOM Variables
const buttons = document.querySelectorAll("button");
let playerScore = document.getElementById("playerSpan");
let computerScore = document.getElementById("compSpan");
let gameScore = document.getElementById("gameSpan");
let compRPS = document.getElementById("compRPS");
let playerUI = document.getElementById("playerRPS");
let msg = document.getElementById("msg");
let msgDone = document.getElementById("done");

let buttonContainer = document.getElementById("buttonContainer");

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

function roundPlay(playerRPS, compRPS) {
  if (gameRound == totalGameRound) {
    gameRound = 0;
    playerWin = 0;
    computerWin = 0;
    done.innerText = "";
  }
  let winner = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };
  gameRound++;
  if (playerRPS === compRPS) {
    playerWin++;
    computerWin++;
    return (gameMsg = "It's a draw. Both players get 1 pt");
  }
  winner[playerRPS] === compRPS ? playerWin++ : computerWin++;
  // put the Player value as the key. the value is the looser. if that loser value matches what the computer put. THe computer lost. But if it doesn't, the computer put in the winning value.
  return (gameMsg = `${winner[playerRPS] === compRPS ? "Player wins! " + playerRPS + " beats " + computerRPS : "Computer wins! " + playerRPS + " beats " + computerRPS}`);
}

function reset() {
  gameRound = 0;
  gameMsg = `Click a button to play! Best of 5 wins.`;
  msg.style.display = "block";

  done.innerText = "";
}

// replay.addEventListener("click", reset());

function game() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      playerRPS = button.innerText;
      computerRPS = computerPlay();
      compRPS.innerText = computerRPS;
      playerUI.innerText = playerRPS;
      console.log("you " + playerRPS + "   computer " + computerRPS + "game" + gameRound);
      roundPlay(playerRPS, computerRPS);
      updateScore();

      if (gameRound == totalGameRound) {
        msg.innerText = "";
        if (playerWin > computerWin) {
          done.innerText = `You win ${playerWin}/${gameRound}! Game over. Click to play again. `;
        } else if (playerWin < computerWin) {
          done.innerText = `You Lose ${computerWin}/${gameRound}. Game over. Click to play again. `;
        } else {
          done.innerText = `Tie game! Game over. Click to play again. `;
        }
      }
    });
  });
}

game();
