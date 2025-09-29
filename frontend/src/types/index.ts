export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sequenceOrder: number;
  muscleGroups: {
    primary: string[];
    secondary: string[];
  };
  goals: string[];
  startingPosition: string;
  equipment: string[];
  duration: number;
  repetitions: string;
  cues: string[];
  commonMistakes: string[];
  concerns: Record<string, string>;
  injuryConsiderations: InjuryConsideration[];
}

export interface Injury {
  id: string;
  name: string;
  description: string;
}

export interface InjuryConsideration {
  injuryId: string;
  injuryName: string;
  injuryDescription: string;
  severity: 'low' | 'medium' | 'high';
  modifications: Modification[];
  alternativeExerciseId: string | null;
}

export interface Modification {
  id: string;
  name: string;
  description: string;
  type: 'position_change' | 'prop_assistance' | 'range_reduction' | 'movement_adaptation' | 'assisted';
}

export interface ModificationResponse {
  exerciseId: string;
  exerciseName: string;
  injuryId: string;
  injuryName: string;
  injuryDescription: string;
  severity: 'low' | 'medium' | 'high' | 'unknown';
  hasModifications: boolean;
  modifications: Modification[];
  alternativeExercise: {
    id: string;
    name: string;
    description: string;
    category: string;
    difficulty: string;
  } | null;
  recommendation: 'proceed_with_caution' | 'use_modifications' | 'use_alternative' | 'avoid_exercise';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  language?: string;
  count?: number;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

export type Language = 'en' | 'he';

export interface AppState {
  language: Language;
  selectedInjuries: string[];
  exercises: Exercise[];
  injuries: Injury[];
  isLoading: boolean;
}