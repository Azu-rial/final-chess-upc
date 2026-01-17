import { isValidMove } from "./gameLogic.js";

export function getRandomAIMove(board) {
  const moves = [];

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece === piece.toLowerCase()) {
        for (let tr = 0; tr < 8; tr++) {
          for (let tc = 0; tc < 8; tc++) {
            if (
              isValidMove(board, { row: r, col: c }, { row: tr, col: tc }, "black")
            ) {
              moves.push({
                from: { row: r, col: c },
                to: { row: tr, col: tc }
              });
            }
          }
        }
      }
    }
  }

  if (moves.length === 0) return null;

  return moves[Math.floor(Math.random() * moves.length)];
}
