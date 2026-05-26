/**
 * ModificationPanel — expanded modification content for an exercise card.
 *
 * Rendered inside ExerciseCard when the card is expanded. Kept as a
 * separate component so the expansion logic stays isolated and the card
 * itself remains easy to read.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { getSeverityColor, getSeverityText } from '../../utils/severity';
import { getFlexDirection, getTextAlign, isRTL } from '../../utils/rtl';
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

  const textAlign = getTextAlign(language);
  const flexDir = getFlexDirection(language);
  const rtl = isRTL(language);

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
            {/* Injury name + severity — RTL-aware row */}
            <View style={[styles.injuryHeader, { flexDirection: flexDir }]}>
              <View style={[styles.severityDot, { backgroundColor: color }]} />
              <Text style={[styles.injuryName, { color, textAlign }]}>
                {consideration.injuryName}
              </Text>
              <Text style={[styles.severityLabel, { color }]}> · {severityLabel}</Text>
            </View>

            {/* High severity with no modifications */}
            {consideration.severity === 'high' &&
              consideration.modifications.length === 0 &&
              !altExercise && (
                <Text style={[styles.skipWarning, { textAlign }]}>
                  {language === 'he' ? '⚠ דלג / השתמש בחלופה' : '⚠ Skip / Use alternative'}
                </Text>
              )}

            {/* Modification bullets */}
            {consideration.modifications.map((mod, modIdx) => (
              <View
                key={`${mod.id}-${modIdx}`}
                style={[
                  styles.modRow,
                  { flexDirection: flexDir },
                  rtl ? { paddingRight: Spacing.md } : { paddingLeft: Spacing.md },
                ]}
              >
                <Text style={styles.bullet}>•</Text>
                <View style={styles.modTextWrap}>
                  <Text style={[styles.modName, { textAlign }]}>{mod.name}</Text>
                  {mod.description ? (
                    <Text style={[styles.modDescription, { textAlign }]}>{mod.description}</Text>
                  ) : null}
                </View>
              </View>
            ))}

            {/* Alternative exercise box */}
            {altExercise && (
              <View
                style={[
                  styles.altBox,
                  rtl ? { marginRight: Spacing.md } : { marginLeft: Spacing.md },
                ]}
              >
                <Text style={[styles.altLabel, { textAlign }]}>
                  {language === 'he' ? 'תרגיל חלופי' : 'Alternative exercise'}:
                </Text>
                <Text style={[styles.altName, { textAlign }]}>{altExercise.name}</Text>
              </View>
            )}
          </View>
        );
      })}

      {/* Link to full detail screen — on the reading-start edge */}
      <TouchableOpacity
        onPress={onFullDetails}
        style={[styles.fullDetailsLink, { alignSelf: rtl ? 'flex-start' : 'flex-end' }]}
      >
        <Text style={styles.fullDetailsText}>
          {language === 'he' ? '← פרטים מלאים' : 'Full details →'}
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
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  injuryName: {
    fontSize: Typography.base,
    fontWeight: '700',
    flex: 1,
  },
  severityLabel: {
    fontSize: Typography.sm,
    fontWeight: '500',
    flexShrink: 0,
  },
  skipWarning: {
    color: Colors.danger,
    fontSize: Typography.base,
    fontWeight: '600',
  },
  modRow: {
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  bullet: {
    color: Colors.textMuted,
    fontSize: Typography.base,
    lineHeight: 20,
    flexShrink: 0,
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
    paddingTop: Spacing.xs,
  },
  fullDetailsText: {
    fontSize: Typography.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default ModificationPanel;
