/**
 * Severity utility functions.
 *
 * Previously these were duplicated identically inside ClassPlanScreen,
 * ExerciseDetailScreen, and InjurySelectionScreen. They now live here
 * as the single authoritative implementation.
 */

import { SeverityColors } from '../constants/theme';
import { Language, InjuryConsideration } from '../types';

/** Returns the brand color for a given severity level. */
export const getSeverityColor = (severity: string): string =>
  SeverityColors[severity] ?? SeverityColors.safe;

/** Returns the localised severity label. */
export const getSeverityText = (severity: string, language: Language): string => {
  if (language === 'he') {
    switch (severity) {
      case 'high':   return 'סיכון גבוה';
      case 'medium': return 'סיכון בינוני';
      case 'low':    return 'סיכון נמוך';
      default:       return 'בטוח';
    }
  }
  switch (severity) {
    case 'high':   return 'High Risk';
    case 'medium': return 'Medium Risk';
    case 'low':    return 'Low Risk';
    default:       return 'Safe';
  }
};

/**
 * Derives the overall risk level for an exercise given the injury considerations
 * that apply to the currently selected injuries.
 *
 * @param activeConsiderations - InjuryConsiderations already filtered to selected injuries.
 */
export const getExerciseSeverityFromConsiderations = (
  activeConsiderations: InjuryConsideration[]
): 'high' | 'medium' | 'low' | 'safe' => {
  if (activeConsiderations.length === 0) return 'safe';
  if (activeConsiderations.some(c => c.severity === 'high'))   return 'high';
  if (activeConsiderations.some(c => c.severity === 'medium')) return 'medium';
  return 'low';
};
