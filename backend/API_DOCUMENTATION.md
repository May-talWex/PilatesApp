# Pilates App API Documentation

## 🎯 Overview

The Pilates App API provides comprehensive endpoints for Pilates instructors to manage exercises and get injury-specific modifications. The API supports both English and Hebrew translations and includes detailed Swagger documentation.

## 🚀 Quick Start

### Server URLs
- **API Base**: `http://localhost:3000/api`
- **Health Check**: `http://localhost:3000/api/health`
- **Swagger Documentation**: `http://localhost:3000/api-docs`

### Installation & Running
```bash
cd backend
npm install
npm start
```

## 📖 Interactive Documentation

Visit **http://localhost:3000/api-docs** to access the interactive Swagger UI documentation where you can:

- ✅ Test all endpoints directly in the browser
- ✅ View request/response schemas
- ✅ See example requests and responses
- ✅ Try different language parameters
- ✅ Explore all available exercises and injuries

## 🔗 API Endpoints

### Health Check
- **GET** `/api/health` - Check server status

### Exercises
- **GET** `/api/exercises` - Get all exercises
- **GET** `/api/exercises/{id}` - Get specific exercise

### Modifications
- **GET** `/api/modifications?exerciseId={id}&injuryId={id}` - Get modifications
- **GET** `/api/modifications/{exerciseId}/{injuryId}` - Alternative route

## 🌍 Language Support

All endpoints support language parameter:
- `?lang=en` - English (default)
- `?lang=he` - Hebrew

## 📋 Available Exercise IDs

| ID | Name | Category | Difficulty |
|----|------|----------|-----------|
| `ex_hundred` | The Hundred | core_strengthening | beginner |
| `ex_roll_up` | Roll Up | spinal_articulation | beginner |
| `ex_leg_circles` | Leg Circles | hip_mobility | beginner |
| `ex_rolling_like_ball` | Rolling Like a Ball | spinal_massage | beginner |
| `ex_single_leg_stretch` | Single Leg Stretch | core_strengthening | beginner |
| `ex_double_leg_stretch` | Double Leg Stretch | core_strengthening | beginner |
| `ex_scissors` | Scissors | core_strengthening | beginner |
| `ex_lower_lift` | Lower & Lift | core_strengthening | intermediate |
| `ex_criss_cross` | Criss Cross | core_strengthening | beginner |
| `ex_spine_stretch_forward` | Spine Stretch Forward | spinal_articulation | beginner |
| `ex_corkscrew` | Corkscrew | core_strengthening | intermediate |
| `ex_saw` | Saw | rotation | beginner |
| `ex_single_leg_kick` | Single Leg Kick | back_extension | beginner |
| `ex_side_kick` | Side Kick Series | lateral_work | beginner |
| `ex_teaser` | Teaser | core_integration | intermediate |
| `ex_seal` | Seal | spinal_massage | beginner |
| `ex_push_up` | Pilates Push-Up | upper_body_strength | beginner |

## 🏥 Available Injury IDs

| ID | Name | Description |
|----|------|-------------|
| `neck_injury` | Neck Injury | Cervical spine issues, whiplash, or neck strain |
| `lower_back_injury` | Lower Back Injury | Lumbar spine issues, herniated disc, or lower back strain |
| `shoulder_injury` | Shoulder Injury | Rotator cuff, shoulder impingement, or shoulder instability |
| `hip_injury` | Hip Injury | Hip flexor strain, hip impingement, or hip joint issues |
| `wrist_injury` | Wrist Injury | Carpal tunnel, wrist strain, or wrist fracture recovery |
| `knee_injury` | Knee Injury | Knee ligament issues, meniscus tears, or knee instability |
| `spine_injury` | General Spine Injury | General spinal issues or vertebrae problems |

## 🧪 Testing Examples

### Get All Exercises (English)
```bash
curl "http://localhost:3000/api/exercises?lang=en"
```

### Get Specific Exercise (Hebrew)
```bash
curl "http://localhost:3000/api/exercises/ex_hundred?lang=he"
```

### Get Modifications for Neck Injury
```bash
curl "http://localhost:3000/api/modifications?exerciseId=ex_hundred&injuryId=neck_injury&lang=en"
```

### Alternative Route Format
```bash
curl "http://localhost:3000/api/modifications/ex_hundred/neck_injury?lang=en"
```

## 📊 Response Examples

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

## 🔧 Error Handling

The API returns appropriate HTTP status codes:

- **200** - Success
- **400** - Bad Request (missing parameters)
- **404** - Not Found (exercise/injury not found)
- **500** - Internal Server Error

Error responses include:
```json
{
  "success": false,
  "error": "Exercise not found",
  "message": "No exercise found with ID: ex_invalid"
}
```

## 🧪 Automated Testing

Run the test suite:
```bash
npm run test-api
```

This will test all endpoints and verify functionality.

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # Data loading
│   └── swagger.js           # Swagger configuration
├── data/                    # JSON data files
├── docs/
│   └── swagger.yaml         # OpenAPI specification
├── routes/                  # API endpoints
├── services/                # Business logic
├── scripts/
│   └── test-api.js          # Test suite
├── server.js                # Main server
└── API_DOCUMENTATION.md     # This file
```

## 🎨 Swagger UI Features

The Swagger documentation at `/api-docs` provides:

- **Interactive Testing** - Try endpoints directly in the browser
- **Schema Validation** - See exact request/response formats
- **Example Requests** - Pre-filled examples for each endpoint
- **Language Support** - Test both English and Hebrew responses
- **Error Documentation** - See all possible error responses
- **Model Definitions** - Detailed schema for all data structures

## 🔄 Development

### Adding New Exercises
1. Add exercise data to `data/exercises.json`
2. Add translations to `data/translations/en.json` and `data/translations/he.json`
3. Restart the server

### Adding New Injuries
1. Add injury data to `data/injuries.json`
2. Update exercise injury considerations in `data/exercises.json`
3. Add injury-specific modifications to translation files
4. Restart the server

## 📞 Support

For questions or issues:
- Check the Swagger documentation at `/api-docs`
- Run the test suite with `npm run test-api`
- Review the server logs for error details

---

**Happy Pilates Teaching! 🧘‍♀️**

