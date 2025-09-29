/**
 * Get translation for a specific key with fallback
 * @param {Object} translationObj - Translation object
 * @param {string} key - Key to translate
 * @param {string} fallback - Fallback value if translation not found
 * @returns {string} Translated text or fallback
 */
const getTranslation = (translationObj, key, fallback = '') => {
    if (!translationObj || !translationObj[key]) {
        return fallback;
    }
    return translationObj[key];
};

/**
 * Get all available languages
 * @returns {Array} Array of language codes
 */
const getAvailableLanguages = () => {
    return ['en', 'he'];
};

/**
 * Validate language code
 * @param {string} lang - Language code to validate
 * @returns {boolean} True if valid language
 */
const isValidLanguage = (lang) => {
    return getAvailableLanguages().includes(lang);
};

/**
 * Get default language
 * @returns {string} Default language code
 */
const getDefaultLanguage = () => {
    return 'en';
};

module.exports = {
    getTranslation,
    getAvailableLanguages,
    isValidLanguage,
    getDefaultLanguage
};

