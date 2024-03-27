const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.getElementById('restart-button');

let turn = 'X';
let gameOver = false;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(cell) {
  const cellIndex = parseInt(cell.dataset.cellIndex);
  if (cell.textContent === '' && !gameOver) {
    cell.textContent = turn;
    checkWinner();
    if (!gameOver) {
      turn = turn === 'X' ? 'O' : 'X';
      message.textContent = `Player ${turn}'s Turn`;  // Update message with current player's turn
    }
  }
}

function checkWinner() {
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cell1 = cells[condition[0]];
    const cell2 = cells[condition[1]];
    const cell3 = cells[condition[2]];

    if (cell1.textContent === cell2.textContent && cell2.textContent === cell3.textContent && cell1.textContent !== '') {
      gameOver = true;
      message.textContent = `Player ${cell1.textContent} Wins!`;
      break;
    }
  }
}

cells.forEach(cell => cell.addEventListener('click', () => handleCellClick(cell)));

restartButton.addEventListener('click', () => {
  cells.forEach(cell => cell.textContent = '');
  turn = 'X';
  gameOver = false;
  message.textContent = `Player X's Turn`;
});
