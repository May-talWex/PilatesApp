/**
 * useExercisePlan — business logic for ClassPlanScreen.
 *
 * Owns: exercise sorting, per-exercise severity calculation, risk summary
 * counts, and the expand/collapse state for inline modification panels.
 *
 * The screen file imports this hook and remains a pure layout orchestrator.
 */

import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Exercise, InjuryConsideration } from '../types';
import { getExerciseSeverityFromConsiderations } from '../utils/severity';

export interface RiskSummary {
  high: number;
  medium: number;
  low: number;
  safe: number;
}

export const useExercisePlan = () => {
  const { exercises, selectedInjuries, language, getExerciseModifications } = useApp();
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  /**
   * Classical beginner repertoire only — excludes alternative exercises
   * (which have sequenceOrder ≥ 100 and exist solely as substitution options).
   */
  const sortedExercises = useMemo(
    () =>
      [...exercises]
        .filter(ex => ex.sequenceOrder < 100)
        .sort((a, b) => a.sequenceOrder - b.sequenceOrder),
    [exercises]
  );

  /**
   * Returns the highest severity level applicable to this exercise given the
   * currently selected injuries.
   */
  const getExerciseSeverity = (
    exercise: Exercise
  ): 'high' | 'medium' | 'low' | 'safe' => {
    const considerations: InjuryConsideration[] = getExerciseModifications(exercise.id);
    return getExerciseSeverityFromConsiderations(considerations);
  };

  /**
   * Count of exercises at each risk level — displayed in the RiskSummaryCard
   * above the exercise list so the instructor can see the class-wide picture
   * at a glance.
   */
  const riskSummary: RiskSummary = useMemo(() => {
    const counts: RiskSummary = { high: 0, medium: 0, low: 0, safe: 0 };
    sortedExercises.forEach(exercise => {
      const sev = getExerciseSeverity(exercise);
      counts[sev]++;
    });
    return counts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedExercises, selectedInjuries]);

  /**
   * Toggle expand / collapse for an exercise card.
   * Tapping the same card again collapses it.
   */
  const toggleExpand = (exerciseId: string) =>
    setExpandedExerciseId(prev => (prev === exerciseId ? null : exerciseId));

  return {
    sortedExercises,
    riskSummary,
    expandedExerciseId,
    toggleExpand,
    getExerciseSeverity,
    /** Already filtered to selectedInjuries by AppContext. */
    getExerciseModifications,
    language,
    selectedInjuries,
  };
};
