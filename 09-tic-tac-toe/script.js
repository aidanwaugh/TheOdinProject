/* game board array [0,1,2,3,4,5,6,7,8] in layout
[0,1,2]
[3,4,5]
[6,7,8]
*/

// IIFE expression - run right away

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
  let winningCell0;
  let winningCell1;
  let winningCell2;

  const startGame = () => {
    currentPlayer = player1;
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    gameCells.forEach((cell) => {
      cell.classList.remove("xClass");
      cell.classList.remove("oClass");
      cell.classList.remove("highlight-cell");
      cell.removeEventListener("click", addPlayerMark); //for replay
      cell.addEventListener("click", addPlayerMark, { once: true }); //remove event listener after clicked
    });
  };

  const addPlayerMark = (e) => {
    const cell = e.target;
    const cellIndex = cell.id[5]; //can't have html id with number only, so extract number from id string
    document.getElementById(cell.id).innerHTML = currentPlayer.symbol;
    document.getElementById(cell.id).classList.add(currentPlayer.symbolClass);
    gameBoardArray[cellIndex] = currentPlayer.symbol;
    checkWin(currentPlayer);
    switchTurn();
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
        winningCell0 = winningCombos[i][0];
        winningCell1 = winningCombos[i][1];
        winningCell2 = winningCombos[i][2];
        return [winningCell0, winningCell1, winningCell2, endGame(currentPlayer)];
      }
    }

    //draw - if array has no ""
    if (!gameBoardArray.some((cell) => cell == "")) {
      console.log("game is a draw");
    }
  };

  const endGame = (currentPlayer) => {
    //if the array content has the current player class, set background of each cell light grey
    document.getElementById("cell-" + winningCell0).classList.add("highlight-cell");
    document.getElementById("cell-" + winningCell1).classList.add("highlight-cell");
    document.getElementById("cell-" + winningCell2).classList.add("highlight-cell");
    console.log(`${currentPlayer.playerName} with symbol ${currentPlayer.symbol} is winner!
    Winning cells are ${winningCell0},${winningCell1},${winningCell2},`);
  };

  startGame(); //run the game
})();

/*  TODO:
- game display of winner
- game show colored boxes of winner
- game hover over  to preview
- format the x and o
- play against dumb AI, play against MINMAX AI | const addDumbAiMark = () => {}
- turn let winningcell into an array
*/
