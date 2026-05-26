/**
 * InjuryModificationCard — full detail card for one injury's modifications.
 *
 * Used in ExerciseDetailScreen to render the complete picture for a single
 * injury: severity badge, description, modification steps, and alternative
 * exercise if applicable.
 *
 * This was previously an inline .map() block inside ExerciseDetailScreen (~40 lines).
 * Extracting it makes each injury card independently readable and testable.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { getSeverityColor } from '../../utils/severity';
import { getFlexDirection, getBorderAccentSide } from '../../utils/rtl';
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

  return (
    <View style={[styles.card, accentBorder, { borderLeftColor: accentColor, borderRightColor: accentColor }]}>
      {/* Header: injury name + severity badge */}
      <View style={[styles.header, { flexDirection: getFlexDirection(language) }]}>
        <Text style={styles.injuryName}>{modification.injuryName}</Text>
        <SeverityBadge severity={modification.severity} language={language} size="sm" />
      </View>

      {/* Injury description */}
      <Text style={styles.injuryDescription}>{modification.injuryDescription}</Text>

      {/* Modification steps */}
      {modification.hasModifications && modification.modifications.length > 0 && (
        <View style={styles.modSection}>
          <Text style={styles.modSectionTitle}>
            {language === 'he' ? 'התאמות:' : 'Modifications:'}
          </Text>
          {modification.modifications.map((mod, idx) => (
            <View key={`${mod.id}-${idx}`} style={styles.modItem}>
              <Text style={styles.modName}>{mod.name}</Text>
              <Text style={styles.modDescription}>{mod.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Recommendation: avoid */}
      {modification.recommendation === 'avoid_exercise' && (
        <Text style={styles.avoidText}>
          {language === 'he' ? '⚠ יש להימנע מתרגיל זה' : '⚠ Avoid this exercise'}
        </Text>
      )}

      {/* Alternative exercise */}
      {modification.alternativeExercise && (
        <View style={styles.altBox}>
          <Text style={styles.altLabel}>
            {language === 'he' ? 'תרגיל חלופי:' : 'Alternative exercise:'}
          </Text>
          <Text style={styles.altName}>{modification.alternativeExercise.name}</Text>
          <Text style={styles.altDescription}>{modification.alternativeExercise.description}</Text>
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
    // Border width set dynamically via accentBorder in the component.
    gap: Spacing.sm,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
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
