const app = require('../src/app');
const http = require('http');

async function runTests() {
    console.log('==============================================');
    console.log('🧪 Running HowlAI Node.js Backend Test Suite');
    console.log('==============================================\n');

    const server = http.createServer(app);
    await new Promise(resolve => server.listen(0, resolve));
    const port = server.address().port;
    const baseUrl = `http://localhost:${port}`;

    let passed = 0;
    let failed = 0;

    async function assertEndpoint(path, options, expectedStatus, testName) {
        try {
            const res = await fetch(`${baseUrl}${path}`, options);
            const statusMatch = res.status === expectedStatus;
            if (statusMatch) {
                console.log(`✅ PASS: ${testName} (HTTP ${res.status})`);
                passed++;
            } else {
                console.error(`❌ FAIL: ${testName} (Expected ${expectedStatus}, got ${res.status})`);
                failed++;
            }
        } catch (err) {
            console.error(`❌ FAIL: ${testName} Error: ${err.message}`);
            failed++;
        }
    }

    await assertEndpoint('/health', { method: 'GET' }, 200, 'GET /health telemetry endpoint');
    await assertEndpoint('/sysinfo', { method: 'GET' }, 200, 'GET /sysinfo telemetry metrics');
    await assertEndpoint('/api/v1/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Hello HowlAI' })
    }, 200, 'POST /api/v1/ai/generate content creation');

    await assertEndpoint('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'Hi' }] })
    }, 200, 'POST /api/v1/ai/chat conversation handler');

    server.close();

    console.log('\n==============================================');
    console.log(`Test Execution Summary: ${passed} Passed, ${failed} Failed`);
    console.log('==============================================\n');

    if (failed > 0) {
        process.exit(1);
    }
}

runTests();
