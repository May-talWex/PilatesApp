/**
 * ExerciseCard — a single row in the ClassPlan exercise list.
 *
 * Collapsed: always-visible compact header with coloured left-edge strip,
 * exercise name, SeverityBadge, and duration/reps.
 * Expanded: shows ModificationPanel inline without leaving the screen —
 * critical for glancing at modifications during a live class.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Shadow, BorderRadius, SeverityColors } from '../../constants/theme';
import { getFlexDirection, getTextAlign, getBorderAccentSide } from '../../utils/rtl';
import SeverityBadge from '../../components/SeverityBadge';
import ModificationPanel from './ModificationPanel';
import { Exercise, InjuryConsideration, Language } from '../../types';

interface ExerciseCardProps {
  exercise: Exercise;
  severity: 'high' | 'medium' | 'low' | 'safe';
  modifications: InjuryConsideration[];
  /** Full exercise list for resolving alternative exercise names in ModificationPanel. */
  allExercises: Exercise[];
  isExpanded: boolean;
  /** Toggle expand / collapse. */
  onPress: () => void;
  /** Navigate to the full ExerciseDetailScreen. */
  onFullDetails: () => void;
  language: Language;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  severity,
  modifications,
  allExercises,
  isExpanded,
  onPress,
  onFullDetails,
  language,
}) => {
  const hasModifications = modifications.length > 0;
  const accentBorder = getBorderAccentSide(language);
  const borderColor = SeverityColors[severity] ?? Colors.neutral;
  const textAlign = getTextAlign(language);
  const flexDir = getFlexDirection(language);

  return (
    <TouchableOpacity
      style={[styles.card, accentBorder, { borderLeftColor: borderColor, borderRightColor: borderColor }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* ── Collapsed header (always visible) ── */}
      <View style={[styles.header, { flexDirection: flexDir }]}>
        <View style={styles.info}>
          <Text style={[styles.name, { textAlign }]}>{exercise.name}</Text>
          <View style={[styles.meta, { flexDirection: flexDir }]}>
            <Text style={[styles.metaText, { textAlign }]}>
              {language === 'he' ? 'משך' : 'Duration'}: {exercise.duration}s
            </Text>
            <Text style={[styles.metaText, { textAlign }]}>
              {language === 'he' ? 'חזרות' : 'Reps'}: {exercise.repetitions}
            </Text>
            {hasModifications && (
              <View style={styles.adjChip}>
                <Text style={styles.adjChipText}>
                  {modifications.length} {language === 'he' ? 'התאמות' : 'adj.'}
                </Text>
              </View>
            )}
          </View>
        </View>

        <SeverityBadge severity={severity} language={language} size="sm" />
      </View>

      {/* ── Expanded modification panel ── */}
      {isExpanded && (
        <ModificationPanel
          modifications={modifications}
          allExercises={allExercises}
          language={language}
          onFullDetails={onFullDetails}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    // Border width and color are applied dynamically via accentBorder prop.
    // Do NOT set borderLeftWidth/borderRightWidth here to avoid conflicts.
    gap: Spacing.md,
    ...Shadow,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  info: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  meta: {
    flexWrap: 'wrap',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  metaText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  adjChip: {
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  adjChipText: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});

export default ExerciseCard;
