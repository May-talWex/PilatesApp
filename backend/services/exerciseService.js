const { getTranslation } = require('./translationService');

/**
 * Get all exercises with translations
 * @param {Object} data - Loaded data object
 * @param {string} lang - Language code (en/he)
 * @returns {Array} Array of exercises with translations
 */
const getAllExercises = (data, lang = 'en') => {
    const translations = data.translations[lang];

    return data.exercises.map(exercise => {
        const translatedExercise = getExerciseWithTranslations(exercise, translations, lang, data);
        return translatedExercise;
    });
};

/**
 * Get specific exercise by ID with translations
 * @param {Object} data - Loaded data object
 * @param {string} exerciseId - Exercise ID
 * @param {string} lang - Language code (en/he)
 * @returns {Object|null} Exercise with translations or null if not found
 */
const getExerciseById = (data, exerciseId, lang = 'en') => {
    const exercise = data.exercises.find(ex => ex.id === exerciseId);

    if (!exercise) {
        return null;
    }

    const translations = data.translations[lang];
    return getExerciseWithTranslations(exercise, translations, lang, data);
};

/**
 * Add translations to exercise object
 * @param {Object} exercise - Original exercise object
 * @param {Object} translations - Translation object
 * @param {string} lang - Language code
 * @returns {Object} Exercise with translations
 */
const getExerciseWithTranslations = (exercise, translations, lang, data) => {
    const translatedExercise = { ...exercise };

    // Get exercise-specific translations
    const exerciseTranslations = translations.exercises[exercise.id];

    if (exerciseTranslations) {
        translatedExercise.name = exerciseTranslations.name;
        translatedExercise.description = exerciseTranslations.description;
        translatedExercise.cues = exerciseTranslations.cues;
        translatedExercise.commonMistakes = exerciseTranslations.commonMistakes;
        translatedExercise.concerns = exerciseTranslations.concerns;
    }

    // Translate injury considerations
    if (exercise.injuryConsiderations) {
        translatedExercise.injuryConsiderations = exercise.injuryConsiderations.map(consideration => {
            const translatedConsideration = { ...consideration };

            // Get injury name from injuries data
            const injury = data.injuries.find(inj => inj.id === consideration.injuryId);
            if (injury) {
                translatedConsideration.injuryName = injury.name;
                translatedConsideration.injuryDescription = injury.description;
            }

            // Translate modifications
            if (consideration.modifications) {
                translatedConsideration.modifications = consideration.modifications.map(mod => {
                    const translatedMod = { ...mod };
                    const modTranslation = translations.modifications[mod.modificationId];

                    if (modTranslation) {
                        translatedMod.name = modTranslation.name;
                        translatedMod.description = modTranslation.description;
                    }

                    return translatedMod;
                });
            }

            return translatedConsideration;
        });
    }

    return translatedExercise;
};

module.exports = {
    getAllExercises,
    getExerciseById,
    getExerciseWithTranslations
};
