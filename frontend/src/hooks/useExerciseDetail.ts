/**
 * useExerciseDetail — data-fetching logic for ExerciseDetailScreen.
 *
 * Fetches the exercise and all injury-specific modifications in parallel,
 * keeping loading / error state out of the screen file.
 */

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Exercise, ModificationResponse } from '../types';
import apiService from '../services/api';

interface UseExerciseDetailResult {
  exercise: Exercise | null;
  modifications: ModificationResponse[];
  isLoading: boolean;
  error: string | null;
}

export const useExerciseDetail = (exerciseId: string): UseExerciseDetailResult => {
  const { language, selectedInjuries } = useApp();

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [modifications, setModifications] = useState<ModificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch exercise and all selected-injury modifications in parallel.
        const [exerciseData, ...modificationResults] = await Promise.all([
          apiService.getExercise(exerciseId, language),
          ...selectedInjuries.map(injuryId =>
            apiService.getModifications(exerciseId, injuryId, language)
          ),
        ]);

        if (!cancelled) {
          setExercise(exerciseData);
          setModifications(modificationResults as ModificationResponse[]);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load exercise details:', err);
          setError('Failed to load exercise details');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchDetails();
    return () => { cancelled = true; };
  }, [exerciseId, language, selectedInjuries]);

  return { exercise, modifications, isLoading, error };
};
