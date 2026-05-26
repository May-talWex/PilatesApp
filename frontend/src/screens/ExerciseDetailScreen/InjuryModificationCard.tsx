/**
 * InjuryModificationCard — full detail card for one injury's modifications.
 *
 * Used in ExerciseDetailScreen to render the complete picture for a single
 * injury: severity badge, description, modification steps, and alternative
 * exercise if applicable.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { getSeverityColor } from '../../utils/severity';
import { getFlexDirection, getTextAlign, getBorderAccentSide, isRTL } from '../../utils/rtl';
import SeverityBadge from '../../components/SeverityBadge';
import { ModificationResponse, Language } from '../../types';

interface InjuryModificationCardProps {
  modification: ModificationResponse;
  language: Language;
}

const InjuryModificationCard: React.FC<InjuryModificationCardProps> = ({
  modification,
  language,
}) => {
  const accentColor = getSeverityColor(modification.severity);
  const accentBorder = getBorderAccentSide(language, 4);
  const textAlign = getTextAlign(language);
  const flexDir = getFlexDirection(language);
  const rtl = isRTL(language);

  return (
    <View style={[styles.card, accentBorder, { borderLeftColor: accentColor, borderRightColor: accentColor }]}>
      {/* Header: injury name + severity badge */}
      <View style={[styles.header, { flexDirection: flexDir }]}>
        <Text style={[styles.injuryName, { textAlign }]}>{modification.injuryName}</Text>
        <SeverityBadge severity={modification.severity} language={language} size="sm" />
      </View>

      {/* Injury description */}
      <Text style={[styles.injuryDescription, { textAlign }]}>{modification.injuryDescription}</Text>

      {/* Modification steps */}
      {modification.hasModifications && modification.modifications.length > 0 && (
        <View style={styles.modSection}>
          <Text style={[styles.modSectionTitle, { textAlign }]}>
            {language === 'he' ? 'התאמות:' : 'Modifications:'}
          </Text>
          {modification.modifications.map((mod, idx) => (
            <View key={`${mod.id}-${idx}`} style={[styles.modItem, { flexDirection: flexDir }]}>
              <Text style={styles.bullet}>•</Text>
              <View style={styles.modTextWrap}>
                <Text style={[styles.modName, { textAlign }]}>{mod.name}</Text>
                <Text style={[styles.modDescription, { textAlign }]}>{mod.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Recommendation: avoid */}
      {modification.recommendation === 'avoid_exercise' && (
        <Text style={[styles.avoidText, { textAlign }]}>
          {language === 'he' ? '⚠ יש להימנע מתרגיל זה' : '⚠ Avoid this exercise'}
        </Text>
      )}

      {/* Alternative exercise */}
      {modification.alternativeExercise && (
        <View style={styles.altBox}>
          <Text style={[styles.altLabel, { textAlign }]}>
            {language === 'he' ? 'תרגיל חלופי:' : 'Alternative exercise:'}
          </Text>
          <Text style={[styles.altName, { textAlign }]}>{modification.alternativeExercise.name}</Text>
          <Text style={[styles.altDescription, { textAlign }]}>{modification.alternativeExercise.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  injuryName: {
    fontSize: Typography.md,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    flex: 1,
  },
  injuryDescription: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  modSection: {
    gap: Spacing.sm,
  },
  modSectionTitle: {
    fontSize: Typography.base,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  modItem: {
    gap: Spacing.xs,
    alignItems: 'flex-start',
  },
  bullet: {
    color: Colors.textMuted,
    fontSize: Typography.base,
    lineHeight: 20,
    flexShrink: 0,
  },
  modTextWrap: {
    flex: 1,
    gap: 2,
  },
  modName: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  modDescription: {
    fontSize: Typography.base,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  avoidText: {
    fontSize: Typography.base,
    fontWeight: '700',
    color: Colors.danger,
  },
  altBox: {
    backgroundColor: Colors.altExerciseBg,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  altLabel: {
    fontSize: Typography.base,
    fontWeight: '700',
    color: Colors.altExerciseText,
  },
  altName: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  altDescription: {
    fontSize: Typography.base,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});

export default InjuryModificationCard;
