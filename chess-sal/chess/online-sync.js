import { auth, db } from "../../firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const gameId = localStorage.getItem("onlineGameId");
const gameRef = gameId ? doc(db, "games", gameId) : null;

let myUid = null;
let myColor = null;

export function getMyColor() {
  return myColor; // "white" or "black"
}

export function canIMoveNow(turn) {
  return myColor && myColor === turn;
}

export function startOnlineSync(onRemoteUpdate) {
  if (!gameRef) {
    console.warn("No gameId found (onlineGameId).");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) return;
    myUid = user.uid;

    onSnapshot(gameRef, (snap) => {
      const g = snap.data();
      if (!g) return;

      myColor = (g.whiteUid === myUid) ? "white" : "black";
      onRemoteUpdate(g.board, g.turn);
    });
  });
}

export async function pushState(board, turn) {
  if (!gameRef) return;
  await updateDoc(gameRef, { board, turn });
}