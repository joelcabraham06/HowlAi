const app = require('./src/app');
const env = require('./src/config/env');

const PORT = env.port;

const server = app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 HowlAI Microservice Gateway running on port ${PORT}`);
    console.log(`🌐 API Playground: http://localhost:${PORT}`);
    console.log(`📡 Health Endpoint: http://localhost:${PORT}/health`);
    console.log(`⚡ Environment:     ${env.nodeEnv}`);
    console.log(`=======================================================`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down HowlAI HTTP server...');
    server.close(() => {
        console.log('Server terminated cleanly.');
    });
});
