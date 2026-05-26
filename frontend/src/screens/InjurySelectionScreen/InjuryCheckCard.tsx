/**
 * InjuryCheckCard — a single selectable injury item.
 *
 * Shows the injury name, description, and a SeverityBadge reflecting the
 * typical risk level for that injury type across the classical repertoire.
 * Selected state is communicated via a border + background colour change.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Shadow, BorderRadius } from '../../constants/theme';
import { getFlexDirection } from '../../utils/rtl';
import SeverityBadge from '../../components/SeverityBadge';
import { INJURY_DEFAULT_SEVERITY } from '../../constants/injuryGroups';
import { Injury, Language } from '../../types';

interface InjuryCheckCardProps {
  injury: Injury;
  isSelected: boolean;
  onToggle: () => void;
  language: Language;
}

const InjuryCheckCard: React.FC<InjuryCheckCardProps> = ({
  injury,
  isSelected,
  onToggle,
  language,
}) => {
  const defaultSeverity = INJURY_DEFAULT_SEVERITY[injury.id] ?? 'low';

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selected]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={[styles.row, { flexDirection: getFlexDirection(language) }]}>
        <View style={styles.textBlock}>
          <Text style={[styles.name, isSelected && styles.nameSelected]}>
            {injury.name}
          </Text>
          <Text style={[styles.description, isSelected && styles.descriptionSelected]}>
            {injury.description}
          </Text>
        </View>

        <SeverityBadge severity={defaultSeverity} language={language} size="sm" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadow,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.selectedBg,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
    marginRight: Spacing.md,
    gap: Spacing.xs,
  },
  name: {
    fontSize: Typography.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  nameSelected: {
    color: Colors.primary,
  },
  description: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  descriptionSelected: {
    color: Colors.primary,
  },
});

export default InjuryCheckCard;
