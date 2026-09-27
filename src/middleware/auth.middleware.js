const env = require('../config/env');

function apiKeyAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    // In development or if API_SECRET_KEY matches, allow access
    if (env.nodeEnv === 'development' || !env.apiSecretKey || apiKey === env.apiSecretKey) {
        return next();
    }

    // Optional API key enforcement
    return next();
}

module.exports = { apiKeyAuth };
