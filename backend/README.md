# Pilates App Backend API

A backend API for Pilates instructors to get exercise modifications based on student injuries.

## Features

- **Exercise Management**: Get detailed exercise information with translations
- **Injury Modifications**: Get specific modifications for exercise-injury combinations
- **Multi-language Support**: English and Hebrew translations
- **RESTful API**: Clean, well-documented endpoints

## Quick Start

### Installation

```bash
cd backend
npm install
```

### Running the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server status

### Exercises
- **GET** `/api/exercises` - Get all exercises
- **GET** `/api/exercises/:id` - Get specific exercise by ID

### Modifications
- **GET** `/api/modifications?exerciseId=:id&injuryId=:id` - Get modifications for exercise-injury combination
- **GET** `/api/modifications/:exerciseId/:injuryId` - Alternative route format

## API Examples

### Get All Exercises (English)
```bash
curl "http://localhost:3000/api/exercises?lang=en"
```

### Get All Exercises (Hebrew)
```bash
curl "http://localhost:3000/api/exercises?lang=he"
```

### Get Specific Exercise
```bash
curl "http://localhost:3000/api/exercises/ex_hundred?lang=en"
```

### Get Modifications for Exercise with Injury
```bash
curl "http://localhost:3000/api/modifications?exerciseId=ex_hundred&injuryId=neck_injury&lang=en"
```

### Alternative Route Format
```bash
curl "http://localhost:3000/api/modifications/ex_hundred/neck_injury?lang=en"
```

## Response Examples

### Exercise Response
```json
{
  "success": true,
  "data": {
    "id": "ex_hundred",
    "name": "The Hundred",
    "description": "Classic Pilates breathing and core exercise with arm pumps",
    "category": "core_strengthening",
    "difficulty": "beginner",
    "cues": [
      "Curl up to shoulder blades",
      "Pump arms vigorously 5-6 inches",
      "Inhale for 5 counts, exhale for 5 counts"
    ],
    "injuryConsiderations": [
      {
        "injuryId": "neck_injury",
        "injuryName": "Neck Injury",
        "severity": "high",
        "modifications": [
          {
            "id": "mod_head_down",
            "name": "Head Down",
            "description": "Keep head resting on mat throughout exercise",
            "type": "position_change"
          }
        ]
      }
    ]
  },
  "language": "en"
}
```

### Modifications Response
```json
{
  "success": true,
  "data": {
    "exerciseId": "ex_hundred",
    "exerciseName": "The Hundred",
    "injuryId": "neck_injury",
    "injuryName": "Neck Injury",
    "severity": "high",
    "hasModifications": true,
    "modifications": [
      {
        "id": "mod_head_down",
        "name": "Head Down",
        "description": "Keep head resting on mat throughout exercise",
        "type": "position_change"
      }
    ],
    "recommendation": "use_modifications"
  },
  "language": "en"
}
```

## Available Exercise IDs

- `ex_hundred` - The Hundred
- `ex_roll_up` - Roll Up
- `ex_leg_circles` - Leg Circles
- `ex_rolling_like_ball` - Rolling Like a Ball
- `ex_single_leg_stretch` - Single Leg Stretch
- `ex_double_leg_stretch` - Double Leg Stretch
- `ex_scissors` - Scissors
- `ex_lower_lift` - Lower & Lift
- `ex_criss_cross` - Criss Cross
- `ex_spine_stretch_forward` - Spine Stretch Forward
- `ex_corkscrew` - Corkscrew
- `ex_saw` - Saw
- `ex_single_leg_kick` - Single Leg Kick
- `ex_side_kick` - Side Kick Series
- `ex_teaser` - Teaser
- `ex_seal` - Seal
- `ex_push_up` - Pilates Push-Up

## Available Injury IDs

- `neck_injury` - Neck Injury
- `lower_back_injury` - Lower Back Injury
- `shoulder_injury` - Shoulder Injury
- `hip_injury` - Hip Injury
- `wrist_injury` - Wrist Injury
- `knee_injury` - Knee Injury
- `spine_injury` - General Spine Injury

## Language Support

- `en` - English (default)
- `he` - Hebrew

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `400` - Bad Request (missing parameters)
- `404` - Not Found (exercise/injury not found)
- `500` - Internal Server Error

## Development

### Project Structure
```
backend/
├── config/
│   └── database.js          # Data loading configuration
├── data/
│   ├── exercises.json       # Exercise data
│   ├── injuries.json        # Injury data
│   └── translations/
│       ├── en.json          # English translations
│       └── he.json          # Hebrew translations
├── routes/
│   ├── exercises.js         # Exercise endpoints
│   └── modifications.js     # Modification endpoints
├── services/
│   ├── exerciseService.js   # Exercise business logic
│   ├── modificationService.js # Modification business logic
│   └── translationService.js # Translation utilities
├── server.js                # Main server file
└── package.json            # Dependencies
```

### Adding New Exercises

1. Add exercise data to `data/exercises.json`
2. Add translations to `data/translations/en.json` and `data/translations/he.json`
3. Restart the server

### Adding New Injuries

1. Add injury data to `data/injuries.json`
2. Update exercise injury considerations in `data/exercises.json`
3. Add injury-specific modifications to translation files
4. Restart the server

