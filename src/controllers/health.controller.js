const os = require('os');
const env = require('../config/env');

class HealthController {
    getHealth(req, res) {
        return res.status(200).json({
            status: 'online',
            service: 'HowlAI Microservice Gateway',
            version: '1.0.0',
            environment: env.nodeEnv,
            timestamp: new Date().toISOString()
        });
    }

    getSysInfo(req, res) {
        const memUsage = process.memoryUsage();
        return res.status(200).json({
            status: 'healthy',
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            cpus: os.cpus().length,
            uptimeSeconds: Math.floor(process.uptime()),
            memory: {
                totalMB: Math.round(os.totalmem() / (1024 * 1024)),
                freeMB: Math.round(os.freemem() / (1024 * 1024)),
                heapUsedMB: Math.round(memUsage.heapUsed / (1024 * 1024)),
                heapTotalMB: Math.round(memUsage.heapTotal / (1024 * 1024))
            }
        });
    }
}

module.exports = new HealthController();
