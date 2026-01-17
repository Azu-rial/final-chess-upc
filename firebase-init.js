// firebase-init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyCLvIgUnKKs2YXkHyYyQu4AH6PdtmkQbgI",

  authDomain: "chesschess-6af3d.firebaseapp.com",

  projectId: "chesschess-6af3d",

  storageBucket: "chesschess-6af3d.firebasestorage.app",

  messagingSenderId: "982446009928",

  appId: "1:982446009928:web:32059267afd076dec7f27d",

  measurementId: "G-YPVQJS3QCN"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);