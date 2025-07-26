const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      appendMessage("bot", data.reply);
    })
    .catch(() => {
      appendMessage("bot", "⚠️ Server error. Please try again later.");
    });
}

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
