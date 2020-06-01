//game variables
let totalGameRound = 5;
let gameRound = 0;
let computerWin = 0;
let playerWin = 0;

//user stuff
let userPrompt = "";
let playerRPS;

//computer stuff
let compOptions = ["rock", "paper", "scissors"];
function computerPlay() {
  return compOptions[Math.floor(Math.random() * 3)];
}
// let computerRPS = computerPlay();
let computerRPS;
function setup() {
  computerRPS = computerPlay();
  userPrompt = window.prompt("rock, paper, scissors");
  playerRPS = userPrompt.toLowerCase();
  console.log(`playerRPS:${playerRPS} computerRPS:${computerRPS}`);
}

function roundPlay(playerRPS, computerRPS) {
  if (playerRPS == "rock" && computerRPS == "rock") {
    gameRound++;
    return alert(`Tie game.  2 Rocks.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else if (playerRPS == "rock" && computerRPS == "paper") {
    computerWin++;
    gameRound++;
    return alert(`U Lose.  Paper beats rock.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else if (playerRPS == "rock" && computerRPS == "scissors") {
    playerWin++;
    gameRound++;
    return alert(`U Win.  Rock beat scissors.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else if (playerRPS == "paper" && computerRPS == "rock") {
    playerWin++;
    gameRound++;
    return alert(`U Win.  Paper beats rock.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else if (playerRPS == "paper" && computerRPS == "paper") {
    gameRound++;
    return alert(`Tie game.  2 Papers.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else if (playerRPS == "paper" && computerRPS == "scissors") {
    computerWin++;
    gameRound++;
    return alert(`U Lose.  Scissors beats paper.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else if (playerRPS == "scissors" && computerRPS == "rock") {
    computerWin++;
    gameRound++;
    return alert(`You Lose.  Rock beats scisors.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else if (playerRPS == "scissors" && computerRPS == "paper") {
    playerWin++;
    gameRound++;
    return alert(`You win.  scissors beats paper.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  } else {
    gameRound++;
    return alert(`Tie game.  2 Scissors.    Round ${gameRound}/${totalGameRound}   Player: ${playerWin}  Computer: ${computerWin} `);
  }
}

function game() {
  setup();
  roundPlay(playerRPS, computerRPS);
  setup();
  roundPlay(playerRPS, computerRPS);
  setup();
  roundPlay(playerRPS, computerRPS);
  setup();
  roundPlay(playerRPS, computerRPS);
  setup();
  roundPlay(playerRPS, computerRPS);

  if (playerWin > computerWin) {
    alert(`You win! GAME OVER  ${playerWin}/${gameRound}`);
  } else if (playerWin < computerWin) {
    alert(`You Lose! GAME OVER ${playerWin}/${gameRound}`);
  } else {
    alert(`tie game GAME OVER ${playerWin}/${gameRound}`);
  }
}

game();
