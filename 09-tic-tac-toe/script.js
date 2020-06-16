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
  let gameBoardAiOptionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const player1 = player("player1", "x", "xClass");
  const player2 = player("player2", "o", "oClass");
  let currentPlayer = player1;
  const gameCells = document.querySelectorAll(".game-cell");
  const msg = document.querySelector("#message");
  const btnPlayerVsPlayer = document.querySelector("#btn-player");
  const btnPlayerVsAi = document.querySelector("#btn-ai");
  let winningCell = ["", "", ""];
  let playGame = false;
  let versusAi = false;

  const pickOpponent = () => {
    btnPlayerVsPlayer.style.display = "inline-block";
    btnPlayerVsAi.style.display = "inline-block";
    btnPlayerVsPlayer.addEventListener("click", startGame);
    btnPlayerVsAi.addEventListener("click", () => {
      versusAi = true;
      startGame();
    });
  };

  const startGame = () => {
    currentPlayer = player1;
    gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    gameBoardAiOptionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
      cell.removeEventListener("click", addPlayerMark);
      cell.addEventListener("mouseenter", hoverPlayerMarkShow);
      cell.addEventListener("mouseleave", hoverPlayerMarkHide);
      cell.addEventListener("click", addPlayerMark, { once: true });
    });
  };

  const hoverPlayerMarkShow = (e) => {
    if (playGame) {
      if (e.target.classList.contains("xClass") || e.target.classList.contains("oClass")) {
        // console.log(`Cell is not empty. No hover effect can be added.`);
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
      const cellIndex = cell.id[5];
      cell.innerHTML = currentPlayer.symbol;
      cell.classList.remove("hover-cell");
      cell.classList.add(currentPlayer.symbolClass);
      gameBoardArray[cellIndex] = currentPlayer.symbol;
      gameBoardAiOptionArray[cellIndex] = null;
      checkWin(currentPlayer);
      switchTurn();
    }
  };

  const switchTurn = () => {
    currentPlayer == player1 ? (currentPlayer = player2) : (currentPlayer = player1);
    //AI make move
    if (versusAi == true && currentPlayer == player2) {
      let currentAiOptions = gameBoardAiOptionArray.filter((string) => string != null);
      let cellAiIndex = Math.floor(Math.random() * (currentAiOptions.length - 1)) + 0;
      let cellAiMark = document.getElementById("cell-" + currentAiOptions[cellAiIndex]);
      cellAiMark.innerHTML = player2.symbol;
      cellAiMark.classList.add(player2.symbolClass);
      gameBoardAiOptionArray[currentAiOptions[cellAiIndex]] = null;
      gameBoardArray[currentAiOptions[cellAiIndex]] = player2.symbol;
      checkWin(player2);
      currentPlayer = player1;
    }
    return currentPlayer;
  };

  const checkWin = (currentPlayer) => {
    console.log("checking win for " + currentPlayer.playerName + " " + gameBoardArray);
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
        return [winningCell[0], winningCell[1], winningCell[2], endGameWinner(currentPlayer)];
      }
    }

    //draw - if array has no ""
    if (!gameBoardArray.some((cell) => cell == "")) {
      endGameDraw();
    }
  };

  const endGameWinner = (currentPlayer) => {
    playGame = false;
    versusAi = false;
    //highlight winning cell combination
    document.getElementById("cell-" + winningCell[0]).classList.add("highlight-cell");
    document.getElementById("cell-" + winningCell[1]).classList.add("highlight-cell");
    document.getElementById("cell-" + winningCell[2]).classList.add("highlight-cell");
    msg.innerHTML = `${currentPlayer.playerName} is winner! Play again?`;
    btnPlayerVsPlayer.style.display = "inline-block";
    btnPlayerVsAi.style.display = "inline-block";
    console.log(`${currentPlayer.playerName} with symbol ${currentPlayer.symbol} is winner!
    Winning cells are ${winningCell[0]},${winningCell[1]},${winningCell[2]},`);
  };

  const endGameDraw = () => {
    playGame = false;
    versusAi = false;
    msg.innerHTML = "Game over! It's a draw. Play again?";
    btnPlayerVsPlayer.style.display = "inline-block";
    btnPlayerVsAi.style.display = "inline-block";
    console.log("game is a draw");
  };

  pickOpponent();
})();

/*  TODO:
- make code DRY - have addPlayerMark(player,mark)?
*/
