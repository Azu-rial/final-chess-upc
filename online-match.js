import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection, doc, setDoc, getDocs, query, orderBy, limit,
  runTransaction, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const btn = document.getElementById("findMatchBtn");
const msg = document.getElementById("statusMsg");

let myUid = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "auth.html";
    return;
  }
  myUid = user.uid;
});

btn.addEventListener("click", async () => {
  msg.textContent = "Searching for a player...";
  btn.disabled = true;

  try {
    const gameId = await findOrCreateMatch();
    msg.textContent = "Match found! Opening game...";
    window.location.href = `online-game.html?game=${gameId}`;
  } catch (e) {
    console.error(e);
    msg.textContent = "Error: " + e.message;
    btn.disabled = false;
  }
});

async function findOrCreateMatch() {
  const queueRef = collection(db, "queue");

  const gameId = await runTransaction(db, async (tx) => {
    // Find oldest waiting player
    const q = query(queueRef, orderBy("createdAt"), limit(1));
    const snap = await getDocs(q);

    // If nobody is waiting, put me in queue and return null
    if (snap.empty) {
      tx.set(doc(db, "queue", myUid), { uid: myUid, createdAt: serverTimestamp() });
      return null;
    }

    const oppDoc = snap.docs[0];
    const oppUid = oppDoc.id;

    // If the waiting person is me, keep waiting
    if (oppUid === myUid) return null;

    // Create a new game
    const newGameRef = doc(collection(db, "games"));
    tx.set(newGameRef, {
      whiteUid: oppUid,
      blackUid: myUid,
      fen: "start",
      turn: "w",
      status: "playing",
      createdAt: serverTimestamp(),
      lastMoveAt: serverTimestamp()
    });

    // Remove opponent from queue
    tx.delete(doc(db, "queue", oppUid));
    // Remove me too (if I was there)
    tx.delete(doc(db, "queue", myUid));

    return newGameRef.id;
  });

  // If gameId is null, we must wait until someone matches us
  if (!gameId) {
    msg.textContent = "Waiting for another player to join...";
    // Simple waiting loop: check every 2 seconds if a game exists with me
    while (true) {
      const gamesSnap = await getDocs(collection(db, "games"));
      for (const d of gamesSnap.docs) {
        const g = d.data();
        if (g.whiteUid === myUid || g.blackUid === myUid) {
          return d.id;
        }
      }
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  return gameId;
}