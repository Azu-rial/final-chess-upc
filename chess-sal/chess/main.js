// ===== IMPORTS =====
import { createBoard } from "./board.js";
import { isValidMove, applyMove } from "./gameLogic.js";

// ===== GAME STATE =====
let board = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"]
];

let selected = null;
let turn = "white";
let gameOver = false;

// ===== INITIAL RENDER =====
createBoard(board);

// ===== GAME OVER CHECK =====
function checkGameOver(board) {
  let whiteKing = false;
  let blackKing = false;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === "K") whiteKing = true;
      if (board[r][c] === "k") blackKing = true;
    }
  }

  if (!whiteKing || !blackKing) {
    gameOver = true;
    alert(
      !whiteKing
        ? "Game Over — Black wins!"
        : "Game Over — White wins!"
    );
  }
}

// ===== CLICK HANDLING (UI WIRING) =====
document.getElementById("board").addEventListener("click", (e) => {

  // stop everything if game ended
  if (gameOver) return;

  const square = e.target.closest(".square");
  if (!square) return;

  const row = +square.dataset.row;
  const col = +square.dataset.col;

  // FIRST CLICK → select piece
  if (!selected) {
    if (board[row][col] !== "") {
      selected = { row, col };
      square.classList.add("selected");
    }
    return;
  }

  // SECOND CLICK → try move
  if (isValidMove(board, selected, { row, col }, turn)) {
    applyMove(board, selected, { row, col });

    // check if king was captured
    checkGameOver(board);

    if (!gameOver) {
      turn = turn === "white" ? "black" : "white";
    }
  }

  selected = null;
  createBoard(board);
});
