let compOptions = ["rock", "paper", "scissors"];

let round = 0;
let playerWin = 0;
let computerWin = 0;

function computerPlay() {
  return compOptions[Math.floor(Math.random() * 3)];
}

let playerSelection = "rock";
let computerSelection = computerPlay();

function roundPlay(playerSelection, computerSelection) {
  //retrun string of game result
  let msg = "";
  if (playerSelection == "rock" && computerSelection == "rock") {
    msg = "Tie game. 2 Rocks";
    round++;
  } else if (playerSelection == "rock" && computerSelection == "paper") {
    msg = "You lose! Paper beats rock.";
    computerWin++;
    round++;
  } else if (playerSelection == "rock" && computerSelection == "scissors") {
    msg = "You win! Rock beats scissors";
    playerWin++;
    round++;
  } else if (playerSelection == "paper" && computerSelection == "rock") {
    msg = "You win! Paper beats rock";
    playerWin++;
    round++;
  } else if (playerSelection == "paper" && computerSelection == "paper") {
    msg = "Tie game. 2 Papers";
    round++;
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    msg = "You lose! Scissors beats paper.";
    computerWin++;
    round++;
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    msg = "You lose! Rock beats scissors";
    computerWin++;
    round++;
  } else if (playerSelection == "scissors" && computerSelection == "paper") {
    msg = "You win! Scissors beats paper";
    playerWin++;
    round++;
  } else {
    msg = "Tie game. 2 scissors";
    round++;
  }
  return msg;
}

function game() {
  for (let i = 0; i < 5; i++) {
    roundPlay(playerSelection, computerSelection);
  }
  if (playerWin > computerWin) {
    console.log(`You win!`);
  } else if (playerWin < computerWin) {
    console.log(`You Lose!`);
  } else {
    console.log(`tie game`);
  }
}
