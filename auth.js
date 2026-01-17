import { auth, db } from "./firebase-init.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Tabs switching
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.onclick = () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
};

signupTab.onclick = () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
};

// If already logged in -> go to index.html
onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "index.html";
});

// LOGIN (Email/Password)
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");
  msg.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    window.location.href = "index.html";
  } catch (err) {
    msg.textContent = err.message;
  }
});

// SIGNUP (Email/Password) + save to database
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const pass = document.getElementById("signupPassword").value;
  const msg = document.getElementById("signupMsg");
  msg.textContent = "";

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);

    // Save user in Firestore (database)
    await setDoc(doc(db, "users", cred.user.uid), {
      username,
      email,
      provider: "password",
      createdAt: serverTimestamp()
    });

    window.location.href = "index.html";
  } catch (err) {
    msg.textContent = err.message;
  }
});

// GOOGLE LOGIN + save to database
document.getElementById("googleBtn").addEventListener("click", async () => {
  const msg = document.getElementById("loginMsg");
  msg.textContent = "";

  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", cred.user.uid), {
      username: cred.user.displayName || "Google User",
      email: cred.user.email,
      provider: "google",
      createdAt: serverTimestamp()
    }, { merge: true });

    window.location.href = "index.html";
  } catch (err) {
    msg.textContent = err.message;
  }
});