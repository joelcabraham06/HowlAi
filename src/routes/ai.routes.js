const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { apiKeyAuth } = require('../middleware/auth.middleware');

router.post('/generate', apiKeyAuth, (req, res, next) => aiController.generateContent(req, res, next));
router.post('/chat', apiKeyAuth, (req, res, next) => aiController.chatCompletion(req, res, next));
router.post('/vision', apiKeyAuth, (req, res, next) => aiController.analyzeVision(req, res, next));

module.exports = router;
