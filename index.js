const express = require('express');
const app = express();
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

// Telegram Bot Token (replace with your bot's token)
const token = '7687312098:AAEjlULus-3Xi4NP61YP_md_CxD0DHzBiXg';  // Example: '123456789:ABCDEF...'
const bot = new TelegramBot(token, { polling: true });

// Set up the port
const PORT = process.env.PORT || 3000;

// Serve static files (images, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Home route that renders the product page and Telegram interaction
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title> Welcome from Mate Sat</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .product { margin: 20px 0; }
          .product img { width: 200px; }
          .product .price { font-size: 20px; color: green; }
          .buy-button { padding: 10px 20px; background-color: blue; color: white; border: none; cursor: pointer; }
          .buy-button:hover { background-color: darkblue; }
        </style>
      </head>
      <body>
        <h1>Welcome to the Web Store</h1>

        <div class="product">
          <img src="/images/photo1.jpg" alt="Product 1">
          <div class="price">Love Counts</div>
          <button class="buy-button" onclick="alert('Chatting with person 1')">Chat</button>
        </div>

        <div class="product">
          <img src="/images/photo2.jpg" alt="Product 2">
          <div class="price">$35</div>
          <button class="buy-button" onclick="alert('Buying Product 2!')">Buy</button>
        </div>

        <p>Click the button below to interact with the Telegram bot:</p>
        <button onclick="sendMessage()">Send Message</button>

        <script>
          function sendMessage() {
            fetch('/send-message', { method: 'GET' });
          }
        </script>
      </body>
    </html>
  `);
});

// Set up an endpoint to send a message to the bot
app.get('/send-message', (req, res) => {
  // Replace with the chat ID where you want to send a message
  const chatId = '385981461';  // This can be your user ID or a group ID

  // Send message to Telegram
  bot.sendMessage(chatId, 'Hello from mate sat!');
  res.send('Message sent to Telegram bot!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
