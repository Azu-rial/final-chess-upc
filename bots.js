const selectedDifficulty = document.getElementById("selectedDifficulty");
const startBtn = document.getElementById("startBotGameBtn");

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");
const masterBtn = document.getElementById("masterBtn");

const allButtons = [easyBtn, mediumBtn, hardBtn, masterBtn];

function selectDifficulty(name, btn) {
  // remove highlight from all
  allButtons.forEach(b => b.classList.remove("selected"));

  // highlight clicked
  btn.classList.add("selected");

  // update text
  selectedDifficulty.textContent = name;

  // enable start button
  startBtn.disabled = false;
}

// click events
easyBtn.addEventListener("click", () => selectDifficulty("Easy", easyBtn));
mediumBtn.addEventListener("click", () => selectDifficulty("Medium", mediumBtn));
hardBtn.addEventListener("click", () => selectDifficulty("Hard", hardBtn));
masterBtn.addEventListener("click", () => selectDifficulty("Master", masterBtn));

// start game (for now just alert)
startBtn.addEventListener("click", () => {
  alert("Starting a bot game: " + selectedDifficulty.textContent);
});