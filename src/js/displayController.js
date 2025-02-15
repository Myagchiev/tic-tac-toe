// displayController.js

import Gameboard from './game.js';

const displayController = (() => {
  const boardElement = document.getElementById('game-board');
  const resultElement = document.getElementById('result');
  const gameStartDiv = document.getElementById('game-start');
  const backToMenuButton = document.getElementById('back-to-menu');

  // этот обработчик выполняется при клике на ячейку на игровом поле
  let handleClick = (e, currentPlayer, computer, nextTurn) => {
    if (currentPlayer === computer) {
      return;
    }

    if (e.target.classList.contains('cell')) {
      const row = e.target.dataset.row;
      const col = e.target.dataset.col;

      if (e.target.getAttribute('data-filled') === 'true') {
        return;
      }

      if (row !== undefined && col !== undefined) {
        nextTurn(parseInt(row), parseInt(col));
        renderBoard();
      }
    }
  };

  // этот метод обновляет визуальное представление игрового поля
  const renderBoard = () => {
    boardElement.innerHTML = '';
  
    Gameboard.board.forEach((row, rowIndex) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;
        cellElement.textContent = cell ? cell : '';
  
        if (cell !== null) {
          cellElement.setAttribute('data-filled', 'true');
        }
  
        rowElement.appendChild(cellElement);
      });
      boardElement.appendChild(rowElement);
    });
  };

  // текст результат игры
  const updateResult = (message) => {
    resultElement.textContent = message;
  };

  // блокировка ячеек
  const blockCells = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.removeEventListener('click', handleClick);
      cell.classList.add('disabled');
    });
  };

  const addClickListeners = (currentPlayer, computer, nextTurn) => {
    if (!boardElement) {
      return;
    }

    boardElement.addEventListener('click', (e) => handleClick(e, currentPlayer, computer, nextTurn));
  };

  const showGameStartBlock = () => {
    if (gameStartDiv) {
      gameStartDiv.style.display = 'block';
    }
  };

  const hideGameStartBlock = () => {
    if (gameStartDiv) {
      gameStartDiv.style.display = 'none';
    }
  };

  const hideBoard = () => {
    if (boardElement) {
      boardElement.style.display = 'none';
    }
  };

  const showBoard = () => {
    if (boardElement) {
      boardElement.style.display = 'grid';
    }
  };

  const toggleBackToMenuButton = (isVisible) => {
    if (backToMenuButton) {
      backToMenuButton.style.display = isVisible ? 'block' : 'none';
    }
  };

  return {
    renderBoard,
    updateResult,
    blockCells,
    addClickListeners,
    showGameStartBlock,
    hideGameStartBlock,
    hideBoard,
    showBoard,
    toggleBackToMenuButton,
  };
})();

export default displayController;