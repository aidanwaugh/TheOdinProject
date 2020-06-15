/* game board array [0,1,2,3,4,5,6,7,8] in layout
[0,1,2]
[3,4,5]
[6,7,8]
*/

// IIFE expression - run right away
const gameBoard = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  const player1 = "x";
  const player2 = "o";
  let p1Turn = true;
  const gameCells = document.querySelectorAll(".game-cell");

  const startGame = () => {
    p1Turn = true;
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    gameCells.forEach((cell) => {
      cell.classList.remove.(xClass)
      cell.classList.remove.(oClass)
      cell.removeEventListener("click", addPlayerMark); //for replay
      cell.addEventListener("click", addPlayerMark, { once: true }); //remove event listener after clicked
    });
  };

  const addPlayerMark = (e) => {
    const cell = e.target;
    const cellIndex = cell.id[5]; //can't have html id with number only, so extract number from id string
    document.getElementById(cell.id).innerHTML = "x";
    document.getElementById(cell.id).classList.add("xClass");
    gameBoardArray[cellIndex] = "x";
    return console.log(gameBoardArray);
  };

  const switchTurn = () => {};

  const endGame = () => {};

  const checkWin = () => {};

  startGame(); //run the game
})();

/*  FUTURE IMPLEMENTION OPTIONS
- play against dumb AI, play against MINMAX AI | const addDumbAiMark = () => {}

*/
