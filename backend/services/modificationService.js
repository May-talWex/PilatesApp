const { getTranslation } = require('./translationService');

/**
 * Get modifications for a specific exercise and injury combination
 * @param {Object} data - Loaded data object
 * @param {string} exerciseId - Exercise ID
 * @param {string} injuryId - Injury ID
 * @param {string} lang - Language code (en/he)
 * @returns {Object} Modification recommendations
 */
const getModificationsForExerciseAndInjury = (data, exerciseId, injuryId, lang = 'en') => {
    // Find the exercise
    const exercise = data.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) {
        throw new Error(`Exercise with ID '${exerciseId}' not found`);
    }

    // Find the injury
    const injury = data.injuries.find(inj => inj.id === injuryId);
    if (!injury) {
        throw new Error(`Injury with ID '${injuryId}' not found`);
    }

    // Find injury consideration for this exercise
    const consideration = exercise.injuryConsiderations?.find(cons => cons.injuryId === injuryId);

    const translations = data.translations[lang];

    const result = {
        exerciseId,
        exerciseName: getTranslation(translations.exercises[exerciseId], 'name', exerciseId),
        injuryId,
        injuryName: injury.name,
        injuryDescription: injury.description,
        severity: consideration?.severity || 'unknown',
        hasModifications: false,
        modifications: [],
        alternativeExercise: null,
        recommendation: 'proceed_with_caution'
    };

    if (consideration) {
        result.hasModifications = consideration.modifications && consideration.modifications.length > 0;
        result.severity = consideration.severity;

        // Translate modifications
        if (consideration.modifications) {
            result.modifications = consideration.modifications.map(mod => {
                const modTranslation = translations.modifications[mod.modificationId];
                return {
                    id: mod.modificationId,
                    name: modTranslation?.name || mod.modificationId,
                    description: modTranslation?.description || '',
                    type: mod.type
                };
            });
        }

        // Handle alternative exercise
        if (consideration.alternativeExerciseId) {
            const altExercise = data.exercises.find(ex => ex.id === consideration.alternativeExerciseId);
            if (altExercise) {
                result.alternativeExercise = {
                    id: altExercise.id,
                    name: getTranslation(translations.exercises[altExercise.id], 'name', altExercise.id),
                    description: getTranslation(translations.exercises[altExercise.id], 'description', ''),
                    category: altExercise.category,
                    difficulty: altExercise.difficulty
                };
            }
        }

        // Set recommendation based on severity and available modifications
        if (consideration.severity === 'high' && !result.hasModifications && !result.alternativeExercise) {
            result.recommendation = 'avoid_exercise';
        } else if (consideration.severity === 'high' && result.alternativeExercise) {
            result.recommendation = 'use_alternative';
        } else if (result.hasModifications) {
            result.recommendation = 'use_modifications';
        } else {
            result.recommendation = 'proceed_with_caution';
        }
    } else {
        // No specific consideration found for this injury
        result.recommendation = 'proceed_with_caution';
    }

    return result;
};

/**
 * Get all possible modifications for an exercise
 * @param {Object} data - Loaded data object
 * @param {string} exerciseId - Exercise ID
 * @param {string} lang - Language code (en/he)
 * @returns {Object} All modifications for the exercise
 */
const getAllModificationsForExercise = (data, exerciseId, lang = 'en') => {
    const exercise = data.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) {
        throw new Error(`Exercise with ID '${exerciseId}' not found`);
    }

    const translations = data.translations[lang];
    const allModifications = [];

    if (exercise.injuryConsiderations) {
        exercise.injuryConsiderations.forEach(consideration => {
            if (consideration.modifications) {
                consideration.modifications.forEach(mod => {
                    const modTranslation = translations.modifications[mod.modificationId];
                    allModifications.push({
                        id: mod.modificationId,
                        name: modTranslation?.name || mod.modificationId,
                        description: modTranslation?.description || '',
                        type: mod.type,
                        injuryId: consideration.injuryId,
                        severity: consideration.severity
                    });
                });
            }
        });
    }

    return {
        exerciseId,
        exerciseName: getTranslation(translations.exercises[exerciseId], 'name', exerciseId),
        modifications: allModifications,
        language: lang
    };
};

module.exports = {
    getModificationsForExerciseAndInjury,
    getAllModificationsForExercise
};

