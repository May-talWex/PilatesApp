const express = require('express');
const router = express.Router();
const { loadData } = require('../config/database');

// Data is loaded once at startup — same pattern as exercises.js
const data = loadData();

/**
 * GET /api/injuries
 * Returns all injury definitions.
 * Accepts ?lang=en|he (reserved for future localised injury descriptions).
 */
router.get('/', (req, res) => {
    try {
        const { lang = 'en' } = req.query;
        res.json({
            success: true,
            data: data.injuries,
            count: data.injuries.length,
            language: lang,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve injuries',
            message: error.message,
        });
    }
});

/**
 * GET /api/injuries/:id
 * Returns a single injury by ID.
 */
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const injury = data.injuries.find(inj => inj.id === id);

        if (!injury) {
            return res.status(404).json({
                success: false,
                error: 'Injury not found',
                message: `No injury found with ID: ${id}`,
            });
        }

        res.json({ success: true, data: injury });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve injury',
            message: error.message,
        });
    }
});

module.exports = router;
