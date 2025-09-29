const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const exerciseRoutes = require('./routes/exercises');
const modificationRoutes = require('./routes/modifications');
const { swaggerDocument, swaggerUi, swaggerOptions } = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Routes
app.use('/api/exercises', exerciseRoutes);
app.use('/api/modifications', modificationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Pilates App Backend'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Pilates App Backend running on port ${PORT}`);
    console.log(`📚 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🏃‍♀️ Exercise API: http://localhost:${PORT}/api/exercises`);
    console.log(`🔧 Modifications API: http://localhost:${PORT}/api/modifications`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`📱 Mobile API: http://10.100.102.7:${PORT}/api`);
});

module.exports = app;
