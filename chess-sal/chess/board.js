const pieces = {
  r:"♜", n:"♞", b:"♝", q:"♛", k:"♚", p:"♟",
  R:"♖", N:"♘", B:"♗", Q:"♕", K:"♔", P:"♙"
};

export function createBoard(boardState) {
  const board = document.getElementById("board");
  board.innerHTML = "";

  board.style.display = "grid";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = document.createElement("div");

      square.className = `square ${(r + c) % 2 === 0 ? "white" : "black"}`;
      square.dataset.row = r;
      square.dataset.col = c;

      const piece = boardState[r][c];
      square.textContent = piece ? pieces[piece] : "";

      board.appendChild(square);
    }
  }
}
