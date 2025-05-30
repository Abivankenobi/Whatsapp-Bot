const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const dotenv = require('dotenv');
const askGemini = require('./gemini');
const { addMessage, getHistory } = require('./contextManager');

dotenv.config();

const client = new Client({
    authStrategy: new LocalAuth()  // Saves login session
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp bot is ready!');
});

client.on('message', async message => {
    const userId = message.from;
    const userMsg = message.body;

    addMessage(userId, `User: ${userMsg}`);

    const history = getHistory(userId);
    const reply = await askGemini(history);

    addMessage(userId, `Bot: ${reply}`);
    client.sendMessage(userId, reply);
});

client.initialize();
