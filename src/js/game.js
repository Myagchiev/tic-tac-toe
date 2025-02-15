// game.js

const Gameboard = (() => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const displayBoard = () => {
    board.forEach((row) => {
    });
  };

  const addMark = (row, col, mark) => {
    if (board[row][col] === null) {
      board[row][col] = mark;
      return true;
    }
    return false;
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] && 
        board[i][0] === board[i][1] && 
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
    }
  
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] && 
        board[0][i] === board[1][i] && 
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }
  
    if (
      board[0][0] && 
      board[0][0] === board[1][1] && 
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
  
    if (
      board[0][2] && 
      board[0][2] === board[1][1] && 
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }
  
    return null;
  };

  const checkDraw = () => {
    return board.every((row) => row.every((cell) => cell !== null));
  };

  return {
    board,
    displayBoard,
    addMark,
    checkWinner,
    checkDraw,
  };
})();

export default Gameboard;
