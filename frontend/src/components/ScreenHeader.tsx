/**
 * ScreenHeader — reusable screen title + subtitle block.
 *
 * Consolidates the near-identical header pattern that was copy-pasted
 * across HomeScreen, InjurySelectionScreen, and ClassPlanScreen.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { getTextAlign } from '../utils/rtl';
import { Language } from '../types';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  language: Language;
  /** When true the header is centred (e.g. HomeScreen). Default: false (text aligned to reading direction). */
  centered?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  language,
  centered = false,
}) => {
  const textAlign = centered ? 'center' : getTextAlign(language);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { textAlign }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});

export default ScreenHeader;
