/**
 * RiskSummaryCard — fixed (non-scrolling) bar above the exercise list.
 *
 * Shows the count of exercises at each risk level so the instructor can
 * see the class-wide picture at a glance before the session begins.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, SeverityColors, Spacing, Typography, Shadow, BorderRadius } from '../../constants/theme';
import { Language } from '../../types';
import { RiskSummary } from '../../hooks/useExercisePlan';

interface RiskSummaryCardProps {
  summary: RiskSummary;
  language: Language;
}

interface ChipProps {
  count: number;
  labelEn: string;
  labelHe: string;
  color: string;
  language: Language;
}

const Chip: React.FC<ChipProps> = ({ count, labelEn, labelHe, color, language }) => (
  <View style={styles.chip}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={[styles.chipText, { color }]}>
      {count} {language === 'he' ? labelHe : labelEn}
    </Text>
  </View>
);

const RiskSummaryCard: React.FC<RiskSummaryCardProps> = ({ summary, language }) => (
  <View style={styles.card}>
    <Chip count={summary.high}   labelEn="High"   labelHe="גבוה"  color={SeverityColors.high}   language={language} />
    <Chip count={summary.medium} labelEn="Med"    labelHe="בינוני" color={SeverityColors.medium} language={language} />
    <Chip count={summary.low}    labelEn="Low"    labelHe="נמוך"  color={SeverityColors.low}    language={language} />
    <Chip count={summary.safe}   labelEn="Safe"   labelHe="בטוח"  color={SeverityColors.safe}   language={language} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chipText: {
    fontSize: Typography.sm,
    fontWeight: '700',
  },
});

export default RiskSummaryCard;
