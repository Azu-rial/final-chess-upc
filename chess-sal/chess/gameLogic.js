export function isValidMove(board, from, to, turn) {
  const piece = board[from.row][from.col];
  const target = board[to.row][to.col];

  // no piece selected
  if (piece === "") return false;

  const isWhite = piece === piece.toUpperCase();

  // turn check
  if (turn === "white" && !isWhite) return false;
  if (turn === "black" && isWhite) return false;

  // cannot capture your own piece
  if (target !== "") {
    const sameColor =
      (isWhite && target === target.toUpperCase()) ||
      (!isWhite && target === target.toLowerCase());

    if (sameColor) return false;
  }

  const dr = to.row - from.row;
  const dc = to.col - from.col;

  // ===== PAWN =====
  if (piece.toUpperCase() === "P") {
    const dir = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;

    // forward 1
    if (dc === 0 && dr === dir && target === "") return true;

    // forward 2 (first move)
    if (
      dc === 0 &&
      from.row === startRow &&
      dr === 2 * dir &&
      board[from.row + dir][from.col] === "" &&
      target === ""
    ) return true;

    // diagonal capture
    if (Math.abs(dc) === 1 && dr === dir && target !== "") return true;

    return false;
  }

  // ===== ROOK =====
  if (piece.toUpperCase() === "R" && (dr === 0 || dc === 0)) {
    return isPathClear(board, from, to);
  }

  // ===== BISHOP =====
  if (piece.toUpperCase() === "B" && Math.abs(dr) === Math.abs(dc)) {
    return isPathClear(board, from, to);
  }

  // ===== QUEEN =====
  if (
    piece.toUpperCase() === "Q" &&
    (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc))
  ) {
    return isPathClear(board, from, to);
  }

  // ===== KNIGHT =====
  if (
    piece.toUpperCase() === "N" &&
    ((Math.abs(dr) === 2 && Math.abs(dc) === 1) ||
     (Math.abs(dr) === 1 && Math.abs(dc) === 2))
  ) return true;

  // ===== KING =====
  if (
    piece.toUpperCase() === "K" &&
    Math.abs(dr) <= 1 &&
    Math.abs(dc) <= 1
  ) return true;

  return false;
}

function isPathClear(board, from, to) {
  const rowStep = Math.sign(to.row - from.row);
  const colStep = Math.sign(to.col - from.col);

  let r = from.row + rowStep;
  let c = from.col + colStep;

  while (r !== to.row || c !== to.col) {
    if (board[r][c] !== "") return false;
    r += rowStep;
    c += colStep;
  }
  return true;
}

let selected = null;
let turn = "white";

document.getElementById("board").addEventListener("click", (e) => {
  const square = e.target.closest(".square");
  if (!square) return;

  const row = +square.dataset.row;
  const col = +square.dataset.col;

  if (!selected) {
    if (board[row][col] !== "") {
      selected = { row, col };
      square.classList.add("selected");
    }
  } else {
    if (isValidMove(board, selected, { row, col }, turn)) {
      applyMove(board, selected, { row, col });
      turn = turn === "white" ? "black" : "white";
    }

    selected = null;
    createBoard(board);
  }
});
export function applyMove(board, from, to) {
  board[to.row][to.col] = board[from.row][from.col];
  board[from.row][from.col] = "";
}

