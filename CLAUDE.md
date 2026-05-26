# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mobile POC app for Pilates instructors to deliver safe, personalized classes. It filters a fixed beginner classical mat repertoire based on student injuries and provides real-time risk assessment and exercise modifications. No client data is saved — pure POC.

---

## Commands

### Backend (`cd backend`)
```bash
npm start          # Production server (node server.js) on port 3000
npm run dev        # Dev server with auto-restart (nodemon)
npm test           # Run Jest tests
npm run test-api   # Run API smoke tests via scripts/test-api.js
```

### Frontend (`cd frontend`)
```bash
npm start          # Start Expo dev server (scan QR with Expo Go)
npm run ios        # Start targeting iOS simulator
npm run android    # Start targeting Android
npm run web        # Start web version
```

### Useful URLs (when backend is running)
- `http://localhost:3000/api/health` — Health check
- `http://localhost:3000/api-docs` — Interactive Swagger docs
- `http://localhost:3000/api/exercises?lang=en` — All exercises

---

## Architecture

### Two separate apps, no monorepo tooling

The repo has a `backend/` (Node.js/Express) and `frontend/` (React Native/Expo) as fully independent npm projects. The root-level `App.tsx`, `package.json`, `index.ts` appear to be an older version of the frontend — the active frontend is in `frontend/`.

### Data flow

All exercise/injury data lives in JSON files in `backend/data/`. The backend loads these **once at startup** (`backend/config/database.js`) and holds them in memory. Routes call services that apply translations before returning data.

```
backend/data/exercises.json        ← Exercise definitions + injuryConsiderations
backend/data/injuries.json         ← Injury definitions
backend/data/translations/en.json  ← English strings
backend/data/translations/he.json  ← Hebrew strings
```

To add or change data: edit the JSON files and restart the backend. No database migrations needed.

### Translation architecture

Translations are keyed by entity ID in the translation JSON files:
- `translations.exercises[exerciseId].name/description/cues/commonMistakes/concerns`
- `translations.modifications[modificationId].name/description`

The `exerciseService.js` and `modificationService.js` merge base data with translations before returning. The `lang` query param (`en`/`he`) selects the language on every API call.

### Frontend state management

`AppContext.tsx` is the single source of truth. It uses `useReducer` with actions: `SET_LANGUAGE`, `SET_SELECTED_INJURIES`, `SET_EXERCISES`, `SET_INJURIES`, `SET_LOADING`. Data is fetched from the backend on mount and on language change. Injuries are currently hardcoded client-side (not fetched from backend).

### Navigation stack (React Navigation, no headers shown)

```
Home → InjurySelection → ClassPlan → ExerciseDetail
```

### Key types (`frontend/src/types/index.ts`)

- `Exercise.injuryConsiderations: InjuryConsideration[]` — the core domain object linking exercises to injury risks
- `InjuryConsideration.severity: 'low' | 'medium' | 'high'` — drives risk indicator color in ClassPlan
- `Modification.type`: `position_change | prop_assistance | range_reduction | movement_adaptation | assisted`
- `ModificationResponse.recommendation`: `proceed_with_caution | use_modifications | use_alternative | avoid_exercise`

---

## Critical Configuration

### API base URL (must match your local IP)

`frontend/src/services/api.ts` has the API URL hardcoded:
```ts
const API_BASE_URL = 'http://10.100.102.7:3000/api';
```

Update this IP to match your machine's local network IP when testing on a physical device. Both backend and mobile device must be on the same WiFi. The backend binds to `0.0.0.0` so it accepts connections from the local network.

---

## Domain Knowledge

### Exercise data model
Each exercise in `exercises.json` has an `injuryConsiderations` array. Each consideration references an injury by ID, a severity level, an array of modification references (by `modificationId`), and optionally an `alternativeExerciseId`.

### Injury IDs used in the app
`neck_injury`, `lower_back_injury`, `shoulder_injury`, `hip_injury`, `wrist_injury`, `knee_injury`, `spine_injury`

### Risk assessment logic (in `modificationService.js`)
- `high` severity + no modifications + no alternative → `avoid_exercise`
- `high` severity + alternative exists → `use_alternative`
- has modifications → `use_modifications`
- otherwise → `proceed_with_caution`

### RTL support
The app supports Hebrew (RTL layout). When modifying UI components, account for both LTR and RTL directions.

---

## Backend API Contract

All endpoints accept a `lang` query param (`en` or `he`, default `en`).  
All responses follow `{ success: boolean, data: T, language?: string, count?: number }`.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/exercises` | All exercises with translations |
| GET | `/api/exercises/:id` | Single exercise |
| GET | `/api/modifications?exerciseId=&injuryId=` | Modifications for one exercise+injury pair |
