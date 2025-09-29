import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Exercise, ModificationResponse } from '../types';
import apiService from '../services/api';

const ExerciseDetailScreen: React.FC = () => {
  const { language, selectedInjuries } = useApp();
  const navigation = useNavigation();
  const route = useRoute();
  const { exerciseId } = route.params as { exerciseId: string };
  
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [modifications, setModifications] = useState<ModificationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExerciseDetails();
  }, [exerciseId, selectedInjuries]);

  const loadExerciseDetails = async () => {
    try {
      setLoading(true);
      
      // Load exercise details
      const exerciseData = await apiService.getExercise(exerciseId, language);
      setExercise(exerciseData);

      // Load modifications for each selected injury
      const modificationPromises = selectedInjuries.map(injuryId => 
        apiService.getModifications(exerciseId, injuryId, language)
      );
      
      const modificationResults = await Promise.all(modificationPromises);
      setModifications(modificationResults);
    } catch (error) {
      console.error('Failed to load exercise details:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E86AB" />
          <Text style={styles.loadingText}>
            {language === 'en' ? 'Loading exercise details...' : 'טוען פרטי התרגיל...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {language === 'en' ? 'Exercise not found' : 'התרגיל לא נמצא'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseDescription}>{exercise.description}</Text>
        </View>

        {/* Exercise Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Exercise Details' : 'פרטי התרגיל'}
          </Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {language === 'en' ? 'Category' : 'קטגוריה'}:
            </Text>
            <Text style={styles.detailValue}>{exercise.category}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {language === 'en' ? 'Difficulty' : 'רמת קושי'}:
            </Text>
            <Text style={styles.detailValue}>{exercise.difficulty}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {language === 'en' ? 'Duration' : 'משך'}:
            </Text>
            <Text style={styles.detailValue}>{exercise.duration}s</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {language === 'en' ? 'Repetitions' : 'חזרות'}:
            </Text>
            <Text style={styles.detailValue}>{exercise.repetitions}</Text>
          </View>
        </View>

        {/* Starting Position */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'en' ? 'Starting Position' : 'תנוחת התחלה'}
          </Text>
          <Text style={styles.sectionContent}>{exercise.startingPosition}</Text>
        </View>

        {/* Equipment */}
        {exercise.equipment.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'en' ? 'Equipment' : 'ציוד נדרש'}
            </Text>
            <Text style={styles.sectionContent}>{exercise.equipment.join(', ')}</Text>
          </View>
        )}

        {/* Cues */}
        {exercise.cues.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'en' ? 'Key Cues' : 'רמזים חשובים'}
            </Text>
            {exercise.cues.map((cue, index) => (
              <Text key={index} style={styles.cueItem}>• {cue}</Text>
            ))}
          </View>
        )}

        {/* Modifications for Selected Injuries */}
        {modifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {language === 'en' ? 'Injury Modifications' : 'התאמות לפציעות'}
            </Text>
            {modifications.map((mod, index) => (
              <View key={index} style={styles.modificationCard}>
                <View style={styles.modificationHeader}>
                  <Text style={styles.injuryName}>{mod.injuryName}</Text>
                  <Text style={[styles.severityText, { color: getSeverityColor(mod.severity) }]}>
                    {getSeverityText(mod.severity)}
                  </Text>
                </View>
                
                <Text style={styles.injuryDescription}>{mod.injuryDescription}</Text>
                
                {mod.hasModifications && mod.modifications.length > 0 && (
                  <View style={styles.modificationsList}>
                    <Text style={styles.modificationsTitle}>
                      {language === 'en' ? 'Modifications' : 'התאמות'}:
                    </Text>
                    {mod.modifications.map((modification, modIndex) => (
                      <View key={modIndex} style={styles.modificationItem}>
                        <Text style={styles.modificationName}>{modification.name}</Text>
                        <Text style={styles.modificationDescription}>{modification.description}</Text>
                      </View>
                    ))}
                  </View>
                )}
                
                {mod.alternativeExercise && (
                  <View style={styles.alternativeContainer}>
                    <Text style={styles.alternativeTitle}>
                      {language === 'en' ? 'Alternative Exercise' : 'תרגיל חלופי'}:
                    </Text>
                    <Text style={styles.alternativeName}>{mod.alternativeExercise.name}</Text>
                    <Text style={styles.alternativeDescription}>{mod.alternativeExercise.description}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>
            {language === 'en' ? '← Back to Class Plan' : '← חזור לתכנית השיעור'}
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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6C757D',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#DC3545',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#6C757D',
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  detailValue: {
    fontSize: 16,
    color: '#212529',
  },
  cueItem: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 4,
  },
  modificationCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2E86AB',
  },
  modificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  injuryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  severityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  injuryDescription: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
  },
  modificationsList: {
    marginBottom: 12,
  },
  modificationsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 8,
  },
  modificationItem: {
    marginBottom: 8,
  },
  modificationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  modificationDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  alternativeContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
    padding: 12,
  },
  alternativeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  alternativeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  alternativeDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
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

export default ExerciseDetailScreen;
