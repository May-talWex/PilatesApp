/**
 * InjurySelectionScreen — select the injuries present in today's class.
 *
 * Thin screen: navigation, context wiring, and layout only.
 * Group configuration comes from constants/injuryGroups.ts.
 * Each group is rendered by InjuryGroupSection.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { INJURY_GROUPS } from '../../constants/injuryGroups';
import { Colors, Spacing, Typography, BorderRadius, ShadowStrong } from '../../constants/theme';
import ScreenHeader from '../../components/ScreenHeader';
import InjuryGroupSection from './InjuryGroupSection';

const InjurySelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { language, selectedInjuries, setSelectedInjuries, injuries } = useApp();

  // Use local state while the teacher is selecting, then commit on Continue.
  const [localSelected, setLocalSelected] = useState<string[]>(selectedInjuries);

  const toggleInjury = (injuryId: string) => {
    setLocalSelected(prev =>
      prev.includes(injuryId) ? prev.filter(id => id !== injuryId) : [...prev, injuryId]
    );
  };

  const proceed = () => {
    setSelectedInjuries(localSelected);
    navigation.navigate('ClassPlan' as never);
  };

  const handleContinue = () => {
    if (localSelected.length === 0) {
      Alert.alert(
        language === 'he' ? 'לא נבחרו פציעות' : 'No Injuries Selected',
        language === 'he'
          ? 'אנא בחר לפחות פציעה אחת או המשך ללא פציעות.'
          : 'Please select at least one injury or continue without any.',
        [
          {
            text: language === 'he' ? 'המשך בכל מקרה' : 'Continue Anyway',
            onPress: proceed,
          },
          {
            text: language === 'he' ? 'חזור' : 'Go Back',
            style: 'cancel',
          },
        ]
      );
    } else {
      proceed();
    }
  };

  const isDisabled = localSelected.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={language === 'he' ? 'בחר פציעות בכיתה' : 'Select Injuries in Class'}
        subtitle={
          language === 'he'
            ? 'סמן את כל הפציעות הקיימות בשיעור של היום'
            : "Check all injuries that are present in today's class"
        }
        language={language}
        centered
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {INJURY_GROUPS.map(group => (
          <InjuryGroupSection
            key={group.nameEn}
            group={group}
            allInjuries={injuries}
            selectedInjuries={localSelected}
            onToggle={toggleInjury}
            language={language}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>
          {localSelected.length} {language === 'he' ? 'פציעות נבחרו' : 'injuries selected'}
        </Text>
        <TouchableOpacity
          style={[styles.continueButton, isDisabled && styles.continueButtonDisabled]}
          onPress={handleContinue}
        >
          <Text style={[styles.continueButtonText, isDisabled && styles.continueButtonTextDisabled]}>
            {language === 'he' ? 'המשך לשיעור' : 'Continue to Class'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.lg,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  selectedCount: {
    fontSize: Typography.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...ShadowStrong,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: Colors.cardBg,
    fontSize: Typography.lg,
    fontWeight: 'bold',
  },
  continueButtonTextDisabled: {
    color: Colors.textSecondary,
  },
});

export default InjurySelectionScreen;
