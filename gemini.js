const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBF2mnHRixaK5wwa8v2sS2MarRCPEarUxE";

async function askGemini(prompt) {
    try {
        const res = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        });
        return res.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('❌ Gemini error:', error.response?.data || error.message);
        return "I'm having trouble responding right now.";
    }
}

module.exports = askGemini;