const roomCode = document.getElementById("roomCode");
const createCodeBtn = document.getElementById("createCodeBtn");
const copyCodeBtn = document.getElementById("copyCodeBtn");

const joinCodeInput = document.getElementById("joinCodeInput");
const joinGameBtn = document.getElementById("joinGameBtn");

// Make a simple random code
function generateCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

createCodeBtn.addEventListener("click", () => {
  roomCode.value = generateCode(6);
});

copyCodeBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(roomCode.value);
    copyCodeBtn.textContent = "Copied!";
    setTimeout(() => (copyCodeBtn.textContent = "Copy"), 1200);
  } catch {
    alert("Copy failed. Select the code and copy manually.");
  }
});

// Enable Join button only when user types something
joinCodeInput.addEventListener("input", () => {
  const value = joinCodeInput.value.trim();
  joinGameBtn.disabled = value.length < 4;
});

joinGameBtn.addEventListener("click", () => {
  const code = joinCodeInput.value.trim().toUpperCase();
  alert("Joining room: " + code);
});