const geminiService = require('../services/gemini.service');

class AIController {
    async generateContent(req, res, next) {
        try {
            const { prompt, systemInstruction } = req.body;
            if (!prompt) {
                return res.status(400).json({ error: 'Field "prompt" is required.' });
            }

            const result = await geminiService.generateText(prompt, systemInstruction);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async chatCompletion(req, res, next) {
        try {
            const { messages } = req.body;
            if (!messages || !Array.isArray(messages)) {
                return res.status(400).json({ error: 'Field "messages" array is required.' });
            }

            const result = await geminiService.chatCompletion(messages);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async analyzeVision(req, res, next) {
        try {
            const { prompt, imageBase64 } = req.body;
            if (!prompt || !imageBase64) {
                return res.status(400).json({ error: 'Both "prompt" and "imageBase64" fields are required.' });
            }

            const result = await geminiService.analyzeVision(prompt, imageBase64);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AIController();
