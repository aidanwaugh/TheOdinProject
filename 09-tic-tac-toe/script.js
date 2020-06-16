/* game board array [0,1,2,3,4,5,6,7,8] in layout
[0,1,2]
[3,4,5]
[6,7,8]
*/

function player(playerName, symbol) {
  const symbolClass = symbol + "Class";
  return { playerName, symbol, symbolClass };
}

const gameBoard = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  const player1 = player("player1", "x", "xClass");
  const player2 = player("player2", "o", "oClass");
  let currentPlayer = player1;
  const gameCells = document.querySelectorAll(".game-cell");
  const msg = document.querySelector("#message");
  const btnPlayerVsPlayer = document.querySelector("#btn-player");
  const btnPlayerVsAi = document.querySelector("#btn-ai");
  let winningCell = ["", "", ""];
  let playGame = false; //lets click and hover TODO: set to false

  const pickOpponent = () => {
    console.log("pick opponent run");
    btnPlayerVsPlayer.style.display = "inline-block";
    btnPlayerVsAi.style.display = "inline-block";
    btnPlayerVsPlayer.addEventListener("click", startGame);
  };

  const startGame = () => {
    console.log("start playing! reset");
    currentPlayer = player1;
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    playGame = true;
    document.querySelector(".game-board").style.display = "grid";
    msg.innerHTML = "";
    btnPlayerVsPlayer.style.display = "none";
    btnPlayerVsAi.style.display = "none";
    gameCells.forEach((cell) => {
      cell.classList.remove("xClass");
      cell.classList.remove("oClass");
      cell.classList.remove("highlight-cell");
      cell.innerHTML = "";
      cell.removeEventListener("click", addPlayerMark); //for replay
      cell.addEventListener("mouseenter", hoverPlayerMarkShow);
      cell.addEventListener("mouseleave", hoverPlayerMarkHide);
      cell.addEventListener("click", addPlayerMark, { once: true }); //remove event listener after clicked
    });
  };

  const hoverPlayerMarkShow = (e) => {
    if (playGame) {
      if (e.target.classList.contains("xClass") || e.target.classList.contains("oClass")) {
        console.log(`Cell is not empty. No hover effect can be added.`);
      } else {
        e.target.classList.add("hover-cell");
        e.target.innerHTML = currentPlayer.symbol;
      }
    }
  };
  const hoverPlayerMarkHide = (e) => {
    if (e.target.classList.contains("xClass") || e.target.classList.contains("oClass")) {
    } else {
      e.target.classList.remove("hover-cell");
      e.target.innerHTML = "";
    }
  };

  const addPlayerMark = (e) => {
    if (playGame) {
      const cell = e.target;
      const cellIndex = cell.id[5]; //can't have html id with number only, so extract number from id string
      cell.innerHTML = currentPlayer.symbol;
      cell.classList.remove("hover-cell");
      cell.classList.add(currentPlayer.symbolClass);
      gameBoardArray[cellIndex] = currentPlayer.symbol;
      checkWin(currentPlayer);
      switchTurn();
    }
  };

  const switchTurn = () => {
    currentPlayer == player1 ? (currentPlayer = player2) : (currentPlayer = player1);
    return currentPlayer;
  };

  const checkWin = (currentPlayer) => {
    const winningCombos = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ];
    //winner - if array indexes match winning combo & are same symbol
    for (let i = 0; i < winningCombos.length; i++) {
      if (
        gameBoardArray[winningCombos[i][0]] == currentPlayer.symbol &&
        gameBoardArray[winningCombos[i][1]] == currentPlayer.symbol &&
        gameBoardArray[winningCombos[i][2]] == currentPlayer.symbol
      ) {
        winningCell[0] = winningCombos[i][0];
        winningCell[1] = winningCombos[i][1];
        winningCell[2] = winningCombos[i][2];
        console.log(playGame);
        return [winningCell[0], winningCell[1], winningCell[2], endGameWinner(currentPlayer)];
      }
    }

    //draw - if array has no ""
    if (!gameBoardArray.some((cell) => cell == "")) {
      endGameDraw();
    }
  };

  const endGameWinner = (currentPlayer) => {
    //if the array content has the current player class, set background of each cell light grey
    playGame = false;

    document.getElementById("cell-" + winningCell[0]).classList.add("highlight-cell");
    document.getElementById("cell-" + winningCell[1]).classList.add("highlight-cell");
    document.getElementById("cell-" + winningCell[2]).classList.add("highlight-cell");
    msg.innerHTML = `${currentPlayer.playerName} ${currentPlayer.symbol} is winner! Play again?`;
    btnPlayerVsPlayer.style.display = "inline-block";
    btnPlayerVsAi.style.display = "inline-block";
    console.log(`${currentPlayer.playerName} with symbol ${currentPlayer.symbol} is winner!
    Winning cells are ${winningCell[0]},${winningCell[1]},${winningCell[2]},`);
  };

  const endGameDraw = () => {
    playGame = false;
    msg.innerHTML = "Game over! It's a draw. Play again?";
    btnPlayerVsPlayer.style.display = "inline-block";
    btnPlayerVsAi.style.display = "inline-block";
    console.log("game is a draw");
  };

  pickOpponent(); //run the game
})();

/*  TODO:
- play against dumb AI, play against MINMAX AI | const addDumbAiMark = () => {}
*/
