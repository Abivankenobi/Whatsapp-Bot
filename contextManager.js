const userContexts = {};
const MAX_HISTORY = 10; // Only keep last 10 turns

function addMessage(userId, message) {
    if (!userContexts[userId]) {
        userContexts[userId] = [];
    }

    userContexts[userId].push(message);

    if (userContexts[userId].length > MAX_HISTORY) {
        userContexts[userId].shift(); // Remove oldest
    }
}

function getHistory(userId) {
    return userContexts[userId]?.join('\n') || '';
}

module.exports = { addMessage, getHistory };
