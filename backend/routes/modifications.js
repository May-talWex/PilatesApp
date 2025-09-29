const express = require('express');
const router = express.Router();
const { loadData } = require('../config/database');
const { getModificationsForExerciseAndInjury } = require('../services/modificationService');

// Load data once at startup
const data = loadData();

// GET /api/modifications - Get modifications for specific exercise and injury
router.get('/', (req, res) => {
    try {
        const { exerciseId, injuryId, lang = 'en' } = req.query;

        // Validate required parameters
        if (!exerciseId || !injuryId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
                message: 'Both exerciseId and injuryId are required'
            });
        }

        const modifications = getModificationsForExerciseAndInjury(data, exerciseId, injuryId, lang);

        res.json({
            success: true,
            data: modifications,
            language: lang,
            exerciseId,
            injuryId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve modifications',
            message: error.message
        });
    }
});

// GET /api/modifications/:exerciseId/:injuryId - Alternative route format
router.get('/:exerciseId/:injuryId', (req, res) => {
    try {
        const { exerciseId, injuryId } = req.params;
        const { lang = 'en' } = req.query;

        const modifications = getModificationsForExerciseAndInjury(data, exerciseId, injuryId, lang);

        res.json({
            success: true,
            data: modifications,
            language: lang,
            exerciseId,
            injuryId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve modifications',
            message: error.message
        });
    }
});

module.exports = router;
