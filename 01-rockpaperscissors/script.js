let compOptions = ["rock", "paper", "scissors"];

let round = 0;
let playerWin = 0;
let computerWin = 0;
let sign = "";

game();

function computerPlay() {
  return compOptions[Math.floor(Math.random() * 3)];
}

let playerSelection = sign.toLowerCase();
let computerSelection = computerPlay();

function roundPlay(playerSelection, computerSelection) {
  //retrun string of game result
  let msg = "";
  if (playerSelection == "rock" && computerSelection == "rock") {
    round++;
    console.log(`Tie game. 2 Rocks`);
    return;
  } else if (playerSelection == "rock" && computerSelection == "paper") {
    computerWin++;
    round++;
    console.log(`U Lose. Paper beats rock`);
    return;
  } else if (playerSelection == "rock" && computerSelection == "scissors") {
    playerWin++;
    round++;
    console.log(`you win. rock beat scissors`);
    return;
  } else if (playerSelection == "paper" && computerSelection == "rock") {
    playerWin++;
    round++;
    console.log(`you win paper beat rock`);
    return;
  } else if (playerSelection == "paper" && computerSelection == "paper") {
    round++;
    console.log(`tie game. 2 papers`);
    return;
  } else if (playerSelection == "paper" && computerSelection == "scissors") {
    computerWin++;
    round++;
    console.log(`you lose, scissors beats paper`);
    return;
  } else if (playerSelection == "scissors" && computerSelection == "rock") {
    computerWin++;
    round++;
    console.log(`youlose. rock beats scissors`);
    return;
  } else if (playerSelection == "scissors" && computerSelection == "paper") {
    playerWin++;
    round++;
    console.log(`you window. scissors beats paper`);
    return;
  } else {
    round++;
    console.log(`tie game. 2 scissors`);
    return;
  }
}

function game() {
  //round 1
  sign = prompt("Rock, Paper, Scissors");
  computerPlay();
  roundPlay(playerSelection, computerSelection);

  //round 2
  sign = prompt("Rock, Paper, Scissors");
  computerPlay();
  roundPlay(playerSelection, computerSelection);

  //round3
  sign = prompt("Rock, Paper, Scissors");
  computerPlay();
  roundPlay(playerSelection, computerSelection);

  //round 4
  sign = prompt("Rock, Paper, Scissors");
  computerPlay();
  roundPlay(playerSelection, computerSelection);

  //round 5
  sign = prompt("Rock, Paper, Scissors");
  computerPlay();
  roundPlay(playerSelection, computerSelection);

  if (round == 4) {
    if (playerWin > computerWin) {
      console.log(`You win!`);
    } else if (playerWin < computerWin) {
      console.log(`You Lose!`);
    } else {
      console.log(`tie game`);
    }
  }
}
