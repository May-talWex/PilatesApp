const fs = require('fs');
const path = require('path');

// Load JSON data files
const loadData = () => {
    try {
        const dataPath = path.join(__dirname, '../data');

        const exercises = JSON.parse(fs.readFileSync(path.join(dataPath, 'exercises.json'), 'utf8'));
        const injuries = JSON.parse(fs.readFileSync(path.join(dataPath, 'injuries.json'), 'utf8'));
        const translations = {
            en: JSON.parse(fs.readFileSync(path.join(dataPath, 'translations/en.json'), 'utf8')),
            he: JSON.parse(fs.readFileSync(path.join(dataPath, 'translations/he.json'), 'utf8'))
        };

        return {
            exercises: exercises.exercises,
            injuries: injuries.injuries,
            translations
        };
    } catch (error) {
        console.error('Error loading data files:', error);
        throw new Error('Failed to load application data');
    }
};

module.exports = { loadData };

