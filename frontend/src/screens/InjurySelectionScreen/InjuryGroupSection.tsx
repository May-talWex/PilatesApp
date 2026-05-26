/**
 * InjuryGroupSection — one body-part group with its injury cards.
 *
 * Renders the group title (bilingual) and maps the group's injury IDs
 * to InjuryCheckCard components. Injuries not found in the loaded list
 * are silently skipped (graceful degradation if backend data is incomplete).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { getTextAlign } from '../../utils/rtl';
import InjuryCheckCard from './InjuryCheckCard';
import { InjuryGroup } from '../../constants/injuryGroups';
import { Injury, Language } from '../../types';

interface InjuryGroupSectionProps {
  group: InjuryGroup;
  /** All injuries loaded from the API. */
  allInjuries: Injury[];
  selectedInjuries: string[];
  onToggle: (injuryId: string) => void;
  language: Language;
}

const InjuryGroupSection: React.FC<InjuryGroupSectionProps> = ({
  group,
  allInjuries,
  selectedInjuries,
  onToggle,
  language,
}) => {
  const groupInjuries = group.injuries
    .map(id => allInjuries.find(inj => inj.id === id))
    .filter((inj): inj is Injury => inj !== undefined);

  // Don't render a group if none of its injuries are available from the backend.
  if (groupInjuries.length === 0) return null;

  const groupName = language === 'he' ? group.nameHe : group.nameEn;

  return (
    <View style={styles.group}>
      <Text style={[styles.title, { textAlign: getTextAlign(language) }]}>
        {groupName}
      </Text>
      {groupInjuries.map(injury => (
        <InjuryCheckCard
          key={injury.id}
          injury={injury}
          isSelected={selectedInjuries.includes(injury.id)}
          onToggle={() => onToggle(injury.id)}
          language={language}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.textMuted,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
});

export default InjuryGroupSection;
