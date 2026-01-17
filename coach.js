const selectedTopic = document.getElementById("selectedTopic");
const startLessonBtn = document.getElementById("startLessonBtn");
const previewBox = document.getElementById("previewBox");

const openingsBtn = document.getElementById("openingsBtn");
const endgamesBtn = document.getElementById("endgamesBtn");
const tacticsBtn = document.getElementById("tacticsBtn");
const checkmateBtn = document.getElementById("checkmateBtn");

const topicButtons = [openingsBtn, endgamesBtn, tacticsBtn, checkmateBtn];

function setPreview(title, bullets) {
  previewBox.innerHTML = `
    <h2>Preview: ${title}</h2>
    <ul style="margin-left:18px; color: rgba(255,255,255,.75); line-height:1.7;">
      ${bullets.map(b => `<li>${b}</li>`).join("")}
    </ul>
  `;
}

function selectTopic(name, btn) {
  topicButtons.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  selectedTopic.textContent = name;
  startLessonBtn.disabled = false;
}

openingsBtn.addEventListener("click", () => {
  selectTopic("Openings", openingsBtn);
  setPreview("Openings", [
    "Principles: center, development, king safety",
    "Common traps to avoid",
    "Simple opening plans (not memorization)"
  ]);
});

endgamesBtn.addEventListener("click", () => {
  selectTopic("Endgames", endgamesBtn);
  setPreview("Endgames", [
    "King activity & opposition",
    "Pawn endgames basics",
    "Rook endgames: key rules"
  ]);
});

tacticsBtn.addEventListener("click", () => {
  selectTopic("Tactics", tacticsBtn);
  setPreview("Tactics", [
    "Forks, pins, skewers",
    "Discovered attacks",
    "How to calculate 2–3 moves ahead"
  ]);
});

checkmateBtn.addEventListener("click", () => {
  selectTopic("Checkmate", checkmateBtn);
  setPreview("Checkmate", [
    "Mate in 1 / mate in 2 patterns",
    "Back rank mate ideas",
    "Smothered mate & classic patterns"
  ]);
});

startLessonBtn.addEventListener("click", () => {
  alert("Starting lesson: " + selectedTopic.textContent);
});