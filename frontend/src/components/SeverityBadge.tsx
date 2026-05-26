/**
 * SeverityBadge — reusable risk-level indicator.
 *
 * Renders a small filled coloured square next to a localised label.
 * Replaces the emoji circles (🔴🟡🟢⚪) that were previously scattered
 * across three screen files — coloured squares are more professional
 * and fully accessible via VoiceOver / TalkBack.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getSeverityColor, getSeverityText } from '../utils/severity';
import { Language } from '../types';
import { Typography, Spacing } from '../constants/theme';

interface SeverityBadgeProps {
  severity: string;
  language: Language;
  /** 'sm' is used inside compact list cards; 'md' (default) in detail views. */
  size?: 'sm' | 'md';
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  language,
  size = 'md',
}) => {
  const color = getSeverityColor(severity);
  const label = getSeverityText(severity, language);
  const isSmall = size === 'sm';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.square,
          {
            width: isSmall ? 8 : 10,
            height: isSmall ? 8 : 10,
            backgroundColor: color,
          },
        ]}
      />
      <Text
        style={[
          styles.label,
          {
            color,
            fontSize: isSmall ? Typography.xs : Typography.sm,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  square: {
    borderRadius: 2,
  },
  label: {
    fontWeight: '700',
  },
});

export default SeverityBadge;
