// computerPlayer.js

import Gameboard from './game.js';

const Player = (name, mark) => {
  return { name, mark };
};

const ComputerPlayer = (mark) => {
  const getOpponentMark = () => (mark === 'X' ? 'O' : 'X');

  // функция для поиска выигрышного хода
  const findWinningMove = (board, currentMark) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          board[row][col] = currentMark;
          if (Gameboard.checkWinner(board) === currentMark) {
            board[row][col] = null;
            return [row, col];
          }
          board[row][col] = null;
        }
      }
    }
    return null;
  };

  // функция для поиска хода, который блокирует игрока
  const findBlockingMove = (board) => {
    const opponentMark = getOpponentMark();
    return findWinningMove(board, opponentMark);
  };

  // функция для поиска лучшего хода
  const findBestMove = (board) => {
    const corners = [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ];

    // занимаем любой свободный угол
    for (const [row, col] of corners) {
      if (board[row][col] === null) {
        return [row, col];
      }
    }

    // если нет углов, делаем случайный ход
    return findRandomMove(board);
  };

  // функция для поиска случайного хода
  const findRandomMove = (board) => {
    const emptyCells = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          emptyCells.push([row, col]);
        }
      }
    }
    return emptyCells.length > 0
      ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
      : null;
  };

   // если игра завершена, не делаем ход
  const makeMove = (gameOver) => {
    if (gameOver) return null;

    const boardCopy = Gameboard.board.map((row) => [...row]);

    // случайный выбор стратегии
    const strategies = ['win', 'block', 'best', 'random'];
    const strategy = strategies[Math.floor(Math.random() * strategies.length)];

    if (strategy === 'win') {
      const winningMove = findWinningMove(boardCopy, mark);
      if (winningMove) return winningMove;
    }

    if (strategy === 'block') {
      const blockingMove = findBlockingMove(boardCopy);
      if (blockingMove) return blockingMove;
    }

    if (strategy === 'best') {
      return findBestMove(boardCopy);
    }

    return findRandomMove(boardCopy);
  };

  return { mark, makeMove };
};

export { Player, ComputerPlayer };

