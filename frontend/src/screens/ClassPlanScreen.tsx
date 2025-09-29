import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Exercise } from '../types';

// Define the navigation parameter types
type RootStackParamList = {
  Home: undefined;
  InjurySelection: undefined;
  ClassPlan: undefined;
  ExerciseDetail: { exerciseId: string };
};

const ClassPlanScreen: React.FC = () => {
  const { language, selectedInjuries, exercises, getExerciseModifications } = useApp();
  const navigation = useNavigation();

  // Sort exercises by sequence order
  const sortedExercises = [...exercises].sort((a, b) => a.sequenceOrder - b.sequenceOrder);

  const getExerciseSeverity = (exercise: Exercise) => {
    const modifications = getExerciseModifications(exercise.id);
    if (modifications.length === 0) return 'safe';

    const hasHighSeverity = modifications.some(mod => mod.severity === 'high');
    const hasMediumSeverity = modifications.some(mod => mod.severity === 'medium');

    if (hasHighSeverity) return 'high';
    if (hasMediumSeverity) return 'medium';
    return 'low';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#DC3545';
      case 'medium': return '#FFC107';
      case 'low': return '#28A745';
      default: return '#6C757D';
    }
  };

  const getSeverityText = (severity: string) => {
    if (language === 'en') {
      switch (severity) {
        case 'high': return 'High Risk';
        case 'medium': return 'Medium Risk';
        case 'low': return 'Low Risk';
        default: return 'Safe';
      }
    } else {
      switch (severity) {
        case 'high': return 'סיכון גבוה';
        case 'medium': return 'סיכון בינוני';
        case 'low': return 'סיכון נמוך';
        default: return 'בטוח';
      }
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const handleExercisePress = (exerciseId: string) => {
    (navigation as any).navigate('ExerciseDetail', { exerciseId });
  };

  const renderExercise = ({ item: exercise }: { item: Exercise }) => {
    const severity = getExerciseSeverity(exercise);
    const modifications = getExerciseModifications(exercise.id);
    const hasModifications = modifications.length > 0;

    return (
      <TouchableOpacity
        style={styles.exerciseCard}
        onPress={() => handleExercisePress(exercise.id)}
      >
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
            <View style={styles.exerciseMeta}>
              <Text style={styles.exerciseMetaText}>
                {language === 'en' ? 'Duration' : 'משך'}: {exercise.duration}s
              </Text>
              <Text style={styles.exerciseMetaText}>
                {language === 'en' ? 'Reps' : 'חזרות'}: {exercise.repetitions}
              </Text>
            </View>
          </View>
          <View style={styles.severityContainer}>
            <Text style={styles.severityIcon}>{getSeverityIcon(severity)}</Text>
            <Text style={[styles.severityText, { color: getSeverityColor(severity) }]}>
              {getSeverityText(severity)}
            </Text>
          </View>
        </View>

        {hasModifications && (
          <View style={styles.modificationsContainer}>
            <Text style={styles.modificationsTitle}>
              {language === 'en' ? 'Modifications Needed' : 'התאמות נדרשות'}:
            </Text>
            {modifications.map((mod, index) => (
              <View key={index} style={styles.modificationItem}>
                <Text style={styles.modificationText}>
                  • {mod.injuryName}: {mod.severity === 'high' ? '⚠️' : mod.severity === 'medium' ? '⚡' : '✓'}
                  {mod.modifications.length > 0
                    ? ` ${mod.modifications.length} ${language === 'en' ? 'modifications' : 'התאמות'}`
                    : ` ${language === 'en' ? 'Alternative exercise needed' : 'נדרש תרגיל חלופי'}`
                  }
                </Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === 'en' ? 'Class Plan' : 'תכנית השיעור'}
        </Text>
        <Text style={styles.subtitle}>
          {language === 'en'
            ? `${selectedInjuries.length} injuries selected`
            : `${selectedInjuries.length} פציעות נבחרו`
          }
        </Text>
      </View>

      <FlatList
        data={sortedExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        style={styles.exercisesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.exercisesListContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>
            {language === 'en' ? '← Back to Injury Selection' : '← חזור לבחירת פציעות'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86AB',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
  exercisesList: {
    flex: 1,
  },
  exercisesListContent: {
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseMetaText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  severityContainer: {
    alignItems: 'center',
    minWidth: 80,
  },
  severityIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  severityText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modificationsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  modificationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC3545',
    marginBottom: 8,
  },
  modificationItem: {
    marginBottom: 4,
  },
  modificationText: {
    fontSize: 13,
    color: '#495057',
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  backButton: {
    backgroundColor: '#6C757D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ClassPlanScreen;