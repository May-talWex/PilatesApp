const express = require('express');
const router = express.Router();
const { loadData } = require('../config/database');
const { getExerciseById, getAllExercises } = require('../services/exerciseService');

// Load data once at startup
const data = loadData();

// GET /api/exercises - Get all exercises
router.get('/', (req, res) => {
    try {
        const { lang = 'en' } = req.query;
        const exercises = getAllExercises(data, lang);
        res.json({
            success: true,
            data: exercises,
            count: exercises.length,
            language: lang
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve exercises',
            message: error.message
        });
    }
});

// GET /api/exercises/:id - Get specific exercise by ID
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { lang = 'en' } = req.query;

        const exercise = getExerciseById(data, id, lang);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                error: 'Exercise not found',
                message: `No exercise found with ID: ${id}`
            });
        }

        res.json({
            success: true,
            data: exercise,
            language: lang
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve exercise',
            message: error.message
        });
    }
});

module.exports = router;

