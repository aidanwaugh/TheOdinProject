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

  const startGame = () => {
    currentPlayer = player1;
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    gameCells.forEach((cell) => {
      cell.classList.remove("xClass");
      cell.classList.remove("oClass");
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
        endGame();
      }
    }

    //draw - if array has no ""
    if (!gameBoardArray.some((cell) => cell == "")) {
      console.log("game is a draw");
    }
    // console.log(!gameBoardArray.some((cell) => cell == ""));
  };

  const endGame = () => {
    console.log(currentPlayer.playerName + " a match row");
  };

  startGame(); //run the game
})();

/*  FUTURE IMPLEMENTATION OPTIONS
- play against dumb AI, play against MINMAX AI | const addDumbAiMark = () => {}

*/
