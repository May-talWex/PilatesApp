/**
 * ClassPlanScreen — the primary during-class reference screen.
 *
 * This file is intentionally thin: navigation wiring, hook consumption,
 * and layout assembly only. All business logic lives in useExercisePlan.
 * All rendering details live in the sub-components in this folder.
 */

import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { useExercisePlan } from '../../hooks/useExercisePlan';
import ScreenHeader from '../../components/ScreenHeader';
import RiskSummaryCard from './RiskSummaryCard';
import ExerciseCard from './ExerciseCard';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { getBackArrow, getFlexDirection } from '../../utils/rtl';

const ClassPlanScreen: React.FC = () => {
  const navigation = useNavigation();
  const { language, selectedInjuries, setSelectedInjuries, exercises } = useApp();
  const plan = useExercisePlan();

  const handleEndClass = () => {
    setSelectedInjuries([]);
    navigation.navigate('Home' as never);
  };

  const subtitle =
    language === 'he'
      ? `${selectedInjuries.length} פציעות נבחרו`
      : `${selectedInjuries.length} ${selectedInjuries.length === 1 ? 'injury' : 'injuries'} selected`;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={language === 'he' ? 'תכנית השיעור' : 'Class Plan'}
        subtitle={subtitle}
        language={language}
        centered
      />

      <RiskSummaryCard summary={plan.riskSummary} language={language} />

      <FlatList
        data={plan.sortedExercises}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            severity={plan.getExerciseSeverity(item)}
            modifications={plan.getExerciseModifications(item.id)}
            allExercises={exercises}
            isExpanded={plan.expandedExerciseId === item.id}
            onPress={() => plan.toggleExpand(item.id)}
            onFullDetails={() =>
              navigation.navigate('ExerciseDetail' as never, { exerciseId: item.id } as never)
            }
            language={language}
          />
        )}
      />

      <View style={[styles.footer, { flexDirection: getFlexDirection(language) }]}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>
            {getBackArrow(language)} {language === 'he' ? 'שנה פציעות' : 'Change Injuries'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleEndClass}>
          <Text style={styles.primaryButtonText}>
            {language === 'he' ? 'סיים שיעור' : 'End Class'}
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
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  footer: {
    gap: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.neutral,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.cardBg,
    fontSize: Typography.md,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.cardBg,
    fontSize: Typography.md,
    fontWeight: '700',
  },
});

export default ClassPlanScreen;
