const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const responses = {
  "hi": "Hello! How can I help you?",
  "what is your name": "I am a basic chatbot with backend!",
  "how are you": "I'm doing well, thank you!",
  "bye": "Goodbye! Take care!",
  "What are your business hours?": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM IST. We're closed on weekends and public holidays.",
  "Where is your office located?": "Our headquarters is located at 123 Business Street, Bengaluru, Karnataka, India – 560001.",
};

app.post('/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  const reply = responses[userMessage] || "I'm not sure how to respond to that.";
  res.json({ reply });
});

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
