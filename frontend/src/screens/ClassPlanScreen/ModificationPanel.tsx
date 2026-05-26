/**
 * ModificationPanel — expanded modification content for an exercise card.
 *
 * Rendered inside ExerciseCard when the card is expanded. Kept as a
 * separate component so the expansion logic stays isolated and the card
 * itself remains easy to read.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, SeverityColors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { getSeverityColor, getSeverityText } from '../../utils/severity';
import { InjuryConsideration, Exercise, Language } from '../../types';

interface ModificationPanelProps {
  modifications: InjuryConsideration[];
  /** Full exercise list from context, used to resolve alternativeExerciseId → name. */
  allExercises: Exercise[];
  language: Language;
  onFullDetails: () => void;
}

const ModificationPanel: React.FC<ModificationPanelProps> = ({
  modifications,
  allExercises,
  language,
  onFullDetails,
}) => {
  if (modifications.length === 0) return null;

  return (
    <View style={styles.panel}>
      {modifications.map((consideration, idx) => {
        const color = getSeverityColor(consideration.severity);
        const severityLabel = getSeverityText(consideration.severity, language);
        const altExercise = consideration.alternativeExerciseId
          ? allExercises.find(ex => ex.id === consideration.alternativeExerciseId)
          : null;

        return (
          <View key={`${consideration.injuryId}-${idx}`} style={styles.considerationBlock}>
            {/* Injury name + severity */}
            <View style={styles.injuryHeader}>
              <View style={[styles.severityDot, { backgroundColor: color }]} />
              <Text style={[styles.injuryName, { color }]}>{consideration.injuryName}</Text>
              <Text style={[styles.severityLabel, { color }]}> · {severityLabel}</Text>
            </View>

            {/* High severity with no modifications */}
            {consideration.severity === 'high' && consideration.modifications.length === 0 && !altExercise && (
              <Text style={styles.skipWarning}>
                {language === 'he' ? '⚠ דלג / השתמש בחלופה' : '⚠ Skip / Use alternative'}
              </Text>
            )}

            {/* Modification bullets */}
            {consideration.modifications.map((mod, modIdx) => (
              <View key={`${mod.id}-${modIdx}`} style={styles.modRow}>
                <Text style={styles.bullet}>•</Text>
                <View style={styles.modTextWrap}>
                  <Text style={styles.modName}>{mod.name}</Text>
                  {mod.description ? (
                    <Text style={styles.modDescription}>{mod.description}</Text>
                  ) : null}
                </View>
              </View>
            ))}

            {/* Alternative exercise box */}
            {altExercise && (
              <View style={styles.altBox}>
                <Text style={styles.altLabel}>
                  {language === 'he' ? 'תרגיל חלופי' : 'Alternative exercise'}:
                </Text>
                <Text style={styles.altName}>{altExercise.name}</Text>
              </View>
            )}
          </View>
        );
      })}

      {/* Link to full detail screen */}
      <TouchableOpacity onPress={onFullDetails} style={styles.fullDetailsLink}>
        <Text style={styles.fullDetailsText}>
          {language === 'he' ? 'פרטים מלאים ←' : 'Full details →'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  considerationBlock: {
    gap: Spacing.xs,
  },
  injuryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  injuryName: {
    fontSize: Typography.base,
    fontWeight: '700',
  },
  severityLabel: {
    fontSize: Typography.sm,
    fontWeight: '500',
  },
  skipWarning: {
    color: Colors.danger,
    fontSize: Typography.base,
    fontWeight: '600',
  },
  modRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: Spacing.md,
    gap: Spacing.xs,
  },
  bullet: {
    color: Colors.textMuted,
    fontSize: Typography.base,
    lineHeight: 20,
  },
  modTextWrap: {
    flex: 1,
  },
  modName: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  modDescription: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  altBox: {
    backgroundColor: Colors.altExerciseBg,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    marginLeft: Spacing.md,
  },
  altLabel: {
    fontSize: Typography.sm,
    fontWeight: '700',
    color: Colors.altExerciseText,
    marginBottom: 2,
  },
  altName: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  fullDetailsLink: {
    alignSelf: 'flex-end',
    paddingTop: Spacing.xs,
  },
  fullDetailsText: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default ModificationPanel;
