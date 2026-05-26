/**
 * ExerciseDetailScreen — full exercise info with injury-specific modifications.
 *
 * Thin screen: pulls data via useExerciseDetail, handles loading/error states,
 * and assembles layout from InjuryModificationCard.
 *
 * Modifications section is shown FIRST — it's the most actionable information
 * for a teacher who has navigated here during a live class.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { useExerciseDetail } from '../../hooks/useExerciseDetail';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { getFlexDirection, getBackArrow } from '../../utils/rtl';
import InjuryModificationCard from './InjuryModificationCard';

const ExerciseDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exerciseId } = route.params as { exerciseId: string };
  const { language } = useApp();

  const { exercise, modifications, isLoading, error } = useExerciseDetail(exerciseId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centred}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>
            {language === 'he' ? 'טוען פרטי התרגיל...' : 'Loading exercise details...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centred}>
          <Text style={styles.errorText}>
            {language === 'he' ? 'התרגיל לא נמצא' : 'Exercise not found'}
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>
              {getBackArrow(language)} {language === 'he' ? 'חזור' : 'Back'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Exercise title */}
      <View style={styles.titleBlock}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseDescription}>{exercise.description}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Modifications first — most actionable during class ── */}
        {modifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'he' ? 'התאמות לפציעות' : 'Injury Modifications'}
            </Text>
            {modifications.map((mod, idx) => (
              <InjuryModificationCard key={`${mod.injuryId}-${idx}`} modification={mod} language={language} />
            ))}
          </View>
        )}

        {/* ── Exercise details ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'he' ? 'פרטי התרגיל' : 'Exercise Details'}
          </Text>
          {[
            { labelEn: 'Category',    labelHe: 'קטגוריה',  value: exercise.category },
            { labelEn: 'Difficulty',  labelHe: 'רמת קושי', value: exercise.difficulty },
            { labelEn: 'Duration',    labelHe: 'משך',       value: `${exercise.duration}s` },
            { labelEn: 'Repetitions', labelHe: 'חזרות',    value: exercise.repetitions },
          ].map(row => (
            <View key={row.labelEn} style={[styles.detailRow, { flexDirection: getFlexDirection(language) }]}>
              <Text style={styles.detailLabel}>
                {language === 'he' ? row.labelHe : row.labelEn}:
              </Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* ── Starting position ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'he' ? 'תנוחת התחלה' : 'Starting Position'}
          </Text>
          <Text style={styles.bodyText}>{exercise.startingPosition}</Text>
        </View>

        {/* ── Equipment ── */}
        {exercise.equipment.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'he' ? 'ציוד נדרש' : 'Equipment'}
            </Text>
            <Text style={styles.bodyText}>{exercise.equipment.join(', ')}</Text>
          </View>
        )}

        {/* ── Key cues ── */}
        {exercise.cues.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'he' ? 'רמזים חשובים' : 'Key Cues'}
            </Text>
            {exercise.cues.map((cue, idx) => (
              <Text key={idx} style={styles.cue}>• {cue}</Text>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>
            {getBackArrow(language)} {language === 'he' ? 'חזור לתכנית השיעור' : 'Back to Class Plan'}
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
  centred: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.base,
  },
  loadingText: {
    fontSize: Typography.md,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: Typography.lg,
    color: Colors.danger,
  },
  titleBlock: {
    backgroundColor: Colors.cardBg,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  exerciseName: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  exerciseDescription: {
    fontSize: Typography.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  scroll: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.cardBg,
    marginTop: Spacing.md,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  detailRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: Typography.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: Typography.md,
    color: Colors.textPrimary,
  },
  bodyText: {
    fontSize: Typography.md,
    color: Colors.textMuted,
    lineHeight: 24,
  },
  cue: {
    fontSize: Typography.md,
    color: Colors.textMuted,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: Colors.cardBg,
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  backButton: {
    backgroundColor: Colors.neutral,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.cardBg,
    fontSize: Typography.md,
    fontWeight: '600',
  },
});

export default ExerciseDetailScreen;
