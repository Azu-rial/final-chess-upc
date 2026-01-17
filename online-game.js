import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const info = document.getElementById("info");

function getGameId() {
  const url = new URL(window.location.href);
  return url.searchParams.get("game");
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "auth.html";
    return;
  }

  const gameId = getGameId();
  if (!gameId) {
    info.textContent = "No game id found in URL.";
    return;
  }

  const gameRef = doc(db, "games", gameId);

  onSnapshot(gameRef, (snap) => {
    if (!snap.exists()) {
      info.textContent = "Game not found.s";
      return;
    }
    const g = snap.data();
    info.textContent =
      `Game: ${gameId} | White: ${g.whiteUid} | Black: ${g.blackUid} | Turn: ${g.turn} | Status: ${g.status}`;
  });
});