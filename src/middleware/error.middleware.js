function errorHandler(err, req, res, next) {
    console.error('[HowlAI Error]:', err.stack || err.message);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    return res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
        status: statusCode,
        timestamp: new Date().toISOString()
    });
}

module.exports = { errorHandler };
