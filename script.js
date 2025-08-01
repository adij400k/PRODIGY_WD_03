const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function startGame() {
  cells.forEach((cell) => {
    cell.classList.remove("X", "O");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  message.textContent = `Player ${currentPlayer}'s turn`;
  gameActive = true;
}

function handleClick(e) {
  if (!gameActive) return;
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) =>
      cells[index].classList.contains(player)
    );
  });
}

function isDraw() {
  return [...cells].every(
    (cell) => cell.classList.contains("X") || cell.classList.contains("O")
  );
}

restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  startGame();
});

startGame();
