# Pilates Injury-Smart Instructor Assistant (MVP)

## Project Summary

This is a mobile POC app built with React Native and Expo, designed to help Pilates instructors deliver safe and personalized classes. The app is focused on the beginner classical mat repertoire, and assists instructors in identifying exercises that may not be appropriate for students with injuries, offering modifications and guidance in real time.

---

## MVP Scope

This MVP includes the following features:

- **Preset Beginner Sequence**  
  A fixed list of classical mat Pilates exercises (beginner level) with detailed information including cues, starting positions, and equipment requirements.

- **Injury Selection & Filtering**  
  Instructors can select one or more injuries present in their class, which filters the exercise plan to show relevant modifications.

- **Exercise Modifications**  
  For exercises that conflict with selected injuries, the app displays specific modifications and guidance to make the exercise safe.

- **Real-time Risk Assessment**  
  Exercises are visually flagged with risk levels (High/Medium/Low/Safe) based on selected injuries.

- **Detailed Exercise Information**  
  Tap any exercise to view comprehensive details including starting position, cues, equipment, and injury-specific modifications.

- **Multi-language Support**  
  Full support for English and Hebrew languages throughout the app.

---

## Design Philosophy

- Built for new or growing Pilates instructors who want to plan safer classes with confidence  
- Based on the classical method and actual instructor workflows  
- No client data or profile saving in this version. This is a pure POC  
- Fully functional on iPhone via Expo Go
- Requires backend API connection for full functionality

---

## Features Planned for Post-MVP Phase

These features are intentionally not included in the MVP, but are potential candidates for future development after validation and user feedback:

- Custom class builder (create your own sequences)
- User authentication and profile management
- Save class plans or student profiles
- Support for equipment based repertoire (Reformer, Cadillac, etc.)
- Offline functionality with local data storage

---

## Technology Stack

### Core Framework & Development
- **React Native + Expo** - Cross-platform mobile development with iPhone-first design
- **TypeScript** - Type-safe development for better code quality and maintainability
- **Expo EAS** - Build and deployment pipeline for TestFlight distribution

### Navigation & State Management
- **React Navigation (Native Stack)** - iOS-native navigation experience
- **React Context API** - Global state management for app-wide data
- **Custom Hooks** - Reusable state logic and API integration

### Backend & API
- **Node.js + Express** - RESTful API server
- **Axios** - HTTP client for API communication
- **CORS & Helmet** - Security middleware
- **Swagger** - API documentation

### Data & Logic
- **JSON-based data storage** - Exercise and injury data stored in JSON files
- **RESTful API** - Backend provides exercise data and modifications
- **Multi-language support** - Translation system for English and Hebrew

### Development Approach
- **Modular component architecture** - Isolated, reusable components
- **API-first design** - Backend provides all data and business logic
- **Incremental development** - Designed for iterative feature development

---

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PilatesApp
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd ../backend
   npm start
   ```
   The backend will run on `http://localhost:3000`

5. **Start the Frontend App**
   ```bash
   cd ../frontend
   npm start
   ```

6. **Run on Mobile Device**
   - Scan the QR code with Expo Go app
   - Make sure your phone and computer are on the same WiFi network

### API Documentation
Once the backend is running, visit `http://localhost:3000/api-docs` for interactive API documentation.

---

## Project Structure


---

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server status

### Exercises
- **GET** `/api/exercises` - Get all exercises
- **GET** `/api/exercises/:id` - Get specific exercise by ID

### Modifications
- **GET** `/api/modifications?exerciseId=:id&injuryId=:id` - Get modifications for exercise-injury combination

### Example API Calls
```bash
# Get all exercises in English
curl "http://localhost:3000/api/exercises?lang=en"

# Get specific exercise
curl "http://localhost:3000/api/exercises/ex_hundred?lang=en"

# Get modifications for exercise with injury
curl "http://localhost:3000/api/modifications?exerciseId=ex_hundred&injuryId=neck_injury&lang=en"
```

---

## App Flow

1. **Home Screen** - Language selection and app introduction
2. **Injury Selection** - Select injuries present in the class
3. **Class Plan** - View filtered exercise list with risk indicators
4. **Exercise Detail** - Tap any exercise to see detailed information and modifications

---

## Development Notes

### Backend Requirements
- The frontend app requires the backend server to be running
- All exercise data and modifications come from the API
- The app will show timeout errors if the backend is not accessible

### Network Configuration
- Ensure both devices are on the same WiFi network
- The API is configured to use `http://10.100.102.7:3000/api` for mobile access
- Update the API_BASE_URL in `frontend/src/services/api.ts` if your IP address differs

### Adding New Data
1. **Exercises**: Add to `backend/data/exercises.json`
2. **Injuries**: Add to `backend/data/injuries.json`
3. **Translations**: Update `backend/data/translations/en.json` and `he.json`
4. **Restart the backend server** after making changes

---

## Troubleshooting

### Common Issues
1. **Timeout errors**: Ensure backend server is running on port 3000
2. **Connection refused**: Check that both devices are on the same WiFi network
3. **QR code not working**: Try restarting the Expo development server
4. **App not loading**: Clear Expo cache with `expo start --clear`

### Development Tips
- Use `npm run dev` in the backend for auto-restart during development
- Check the backend console for API request logs
- Use the Swagger documentation at `http://localhost:3000/api-docs` to test API endpoints

---

