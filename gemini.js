const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;
const url = "_ "; # find what to write here, its literally in code.txt you will see by default in your gemini homepage, for free tier users, model is 2.0 flash

async function askGemini(prompt) {
    try {
        const res = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        });
        return res.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini error:', error.response?.data || error.message);
        return "I'm having trouble responding right now.";
    }
}

module.exports = askGemini;
