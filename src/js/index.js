// index.js

import '../styles.css';
import Gameboard from './game.js';
import { Player, ComputerPlayer } from './computerPlayer.js';
import displayController from './displayController.js';

let currentPlayer;
let gameOver = false;
let player1, player2, computer;
let restartButton;
let isComputerGame = false;

document.addEventListener('DOMContentLoaded', () => {
  const playerVsPlayerButton = document.getElementById('player-vs-player');
  const playerVsComputerButton = document.getElementById('player-vs-computer');
  restartButton = document.getElementById('restart-game');
  const backToMenuButton = document.getElementById('back-to-menu');

  if (restartButton) {
    restartButton.style.display = 'none';
  }
  displayController.toggleBackToMenuButton(false);

  backToMenuButton.addEventListener('click', () => {
    displayController.hideBoard();

    displayController.showGameStartBlock();

    Gameboard.board.forEach((row) => row.fill(null));
    displayController.renderBoard();
    displayController.updateResult('');

    if (restartButton) {
      restartButton.style.display = 'none';
    }

    displayController.toggleBackToMenuButton(false);

    gameOver = false;
  });

  playerVsPlayerButton.addEventListener('click', () => {
    startNewGame(false);
  });

  playerVsComputerButton.addEventListener('click', () => {
    startNewGame(true);
  });

  if (restartButton) {
    restartButton.addEventListener('click', () => {
      restartButton.style.display = 'none';

      displayController.showGameStartBlock();

      Gameboard.board.forEach((row) => row.fill(null));
      displayController.renderBoard();
      displayController.updateResult('');

      gameOver = false;

      startNewGame(isComputerGame);
    });
  }
});

const startNewGame = (isComputerGameFlag) => {
  isComputerGame = isComputerGameFlag;

  player1 = Player('Игрок 1', 'X');
  player2 = isComputerGame ? ComputerPlayer('O') : Player('Игрок 2', 'O');
  computer = isComputerGame ? player2 : null;
  currentPlayer = player1;
  gameOver = false;

  Gameboard.board.forEach((row) => row.fill(null));
  displayController.renderBoard();
  displayController.updateResult('');

  displayController.hideGameStartBlock();
  displayController.showBoard();

  displayController.toggleBackToMenuButton(true);

  displayController.addClickListeners(currentPlayer, computer, nextTurn);

  if (isComputerGame) {
    currentPlayer = computer;
    setTimeout(() => {
      const [row, col] = computer.makeMove();
      nextTurn(row, col);
      displayController.renderBoard();
    }, 500);
  }

  if (gameOver && restartButton) {
    restartButton.style.display = 'block';
  }
};

// функция для обработки хода
const nextTurn = (row, col) => {
  if (gameOver) return;

  if (Gameboard.addMark(row, col, currentPlayer.mark)) {
    displayController.renderBoard();

    const winner = Gameboard.checkWinner();
    if (winner) {
      const winnerName = winner === 'X' ? player1.name : computer ? 'Компьютер' : player2.name;
      displayController.updateResult(`${winnerName} выиграл!`);
      gameOver = true;
      restartButton.style.display = 'block';
      return;
    }

    if (Gameboard.checkDraw()) {
      displayController.updateResult('Ничья!');
      gameOver = true;
      restartButton.style.display = 'block';
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;

    if (currentPlayer === computer && !gameOver) {
      setTimeout(() => {
        const [row, col] = computer.makeMove();
        if (row !== null && col !== null) {
          nextTurn(row, col);
          displayController.renderBoard();
        }
      }, 500);
    }
  }
};
