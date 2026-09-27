const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const aiRoutes = require('./routes/ai.routes');
const healthRoutes = require('./routes/health.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

// Security & Utility Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static files for Web API Playground
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/', healthRoutes);
app.use('/api/v1/ai', aiRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
