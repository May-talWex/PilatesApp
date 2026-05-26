import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Language, Exercise, Injury } from '../types';
import apiService from '../services/api';

interface AppContextType extends AppState {
  setLanguage: (language: Language) => void;
  setSelectedInjuries: (injuries: string[]) => void;
  loadData: () => Promise<void>;
  getExerciseModifications: (exerciseId: string) => any[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction = 
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_SELECTED_INJURIES'; payload: string[] }
  | { type: 'SET_EXERCISES'; payload: Exercise[] }
  | { type: 'SET_INJURIES'; payload: Injury[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  language: 'en',
  selectedInjuries: [],
  exercises: [],
  injuries: [],
  isLoading: true,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_SELECTED_INJURIES':
      return { ...state, selectedInjuries: action.payload };
    case 'SET_EXERCISES':
      return { ...state, exercises: action.payload };
    case 'SET_INJURIES':
      return { ...state, injuries: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const setSelectedInjuries = (injuries: string[]) => {
    dispatch({ type: 'SET_SELECTED_INJURIES', payload: injuries });
  };

  /**
   * Fallback injury list used when the backend is unreachable.
   * The app must remain functional during a live class even if connectivity drops.
   */
  const FALLBACK_INJURIES: Injury[] = [
    { id: 'neck_injury', name: 'Neck Injury', description: 'Cervical spine issues, whiplash, or neck strain' },
    { id: 'lower_back_injury', name: 'Lower Back Injury', description: 'Lumbar spine issues, herniated disc, or lower back strain' },
    { id: 'shoulder_injury', name: 'Shoulder Injury', description: 'Rotator cuff, shoulder impingement, or shoulder instability' },
    { id: 'hip_injury', name: 'Hip Injury', description: 'Hip flexor strain, hip impingement, or hip joint issues' },
    { id: 'wrist_injury', name: 'Wrist Injury', description: 'Carpal tunnel, wrist strain, or wrist fracture recovery' },
    { id: 'knee_injury', name: 'Knee Injury', description: 'Knee ligament issues, meniscus tears, or knee instability' },
    { id: 'spine_injury', name: 'General Spine Injury', description: 'General spinal issues or vertebrae problems' },
    { id: 'hamstring_injury', name: 'Hamstring Injury', description: 'Hamstring strain, tear, or chronic tightness affecting the posterior thigh' },
    { id: 'hip_flexor_strain', name: 'Hip Flexor Strain', description: 'Iliopsoas or rectus femoris strain or overuse from repetitive hip flexion loading' },
    { id: 'osteoporosis', name: 'Osteoporosis', description: 'Reduced bone density requiring avoidance of high-impact loading and extreme spinal flexion' },
  ];

  const loadData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch exercises and injuries from the API in parallel.
      // Injuries fall back to the hardcoded list if the backend is unreachable
      // so the app stays functional during a live class.
      const [exercises, injuries] = await Promise.all([
        // Exercises always in English — classical Pilates names are internationally English.
        apiService.getExercises('en').catch(() => []),
        apiService.getInjuries(state.language).catch(() => FALLBACK_INJURIES),
      ]);

      dispatch({ type: 'SET_EXERCISES', payload: exercises });
      dispatch({ type: 'SET_INJURIES', payload: injuries });
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getExerciseModifications = (exerciseId: string) => {
    const exercise = state.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return [];

    return exercise.injuryConsiderations.filter(consideration => 
      state.selectedInjuries.includes(consideration.injuryId)
    );
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [state.language]);

  const value: AppContextType = {
    ...state,
    setLanguage,
    setSelectedInjuries,
    loadData,
    getExerciseModifications,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};