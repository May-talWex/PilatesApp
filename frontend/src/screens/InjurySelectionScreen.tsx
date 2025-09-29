import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Injury } from '../types';

const InjurySelectionScreen: React.FC = () => {
  const { language, selectedInjuries, setSelectedInjuries, injuries } = useApp();
  const [localSelectedInjuries, setLocalSelectedInjuries] = useState<string[]>(selectedInjuries);
  const navigation = useNavigation();

  // Group injuries by body part
  const injuryGroups = {
    'Neck & Spine': ['neck_injury', 'spine_injury'],
    'Back': ['lower_back_injury'],
    'Upper Body': ['shoulder_injury', 'wrist_injury'],
    'Lower Body': ['hip_injury', 'knee_injury'],
  };

  const toggleInjury = (injuryId: string) => {
    const newSelection = localSelectedInjuries.includes(injuryId)
      ? localSelectedInjuries.filter(id => id !== injuryId)
      : [...localSelectedInjuries, injuryId];
    setLocalSelectedInjuries(newSelection);
  };

  const handleContinue = () => {
    if (localSelectedInjuries.length === 0) {
      Alert.alert(
        language === 'en' ? 'No Injuries Selected' : 'לא נבחרו פציעות',
        language === 'en' 
          ? 'Please select at least one injury or continue without any.' 
          : 'אנא בחר לפחות פציעה אחת או המשך ללא פציעות.',
        [
          { text: language === 'en' ? 'Continue Anyway' : 'המשך בכל מקרה', onPress: () => proceed() },
          { text: language === 'en' ? 'Go Back' : 'חזור', style: 'cancel' }
        ]
      );
    } else {
      proceed();
    }
  };

  const proceed = () => {
    setSelectedInjuries(localSelectedInjuries);
    navigation.navigate('ClassPlan' as never);
  };

  const getSeverityColor = (injuryId: string) => {
    // This would be determined by checking exercise considerations
    // For now, we'll use a simple mapping
    const severityMap: Record<string, string> = {
      'neck_injury': '#DC3545',
      'lower_back_injury': '#DC3545',
      'spine_injury': '#DC3545',
      'shoulder_injury': '#FFC107',
      'hip_injury': '#FFC107',
      'wrist_injury': '#28A745',
      'knee_injury': '#28A745',
    };
    return severityMap[injuryId] || '#6C757D';
  };

  const getSeverityText = (injuryId: string) => {
    const severityMap: Record<string, string> = {
      'neck_injury': language === 'en' ? 'High Risk' : 'סיכון גבוה',
      'lower_back_injury': language === 'en' ? 'High Risk' : 'סיכון גבוה',
      'spine_injury': language === 'en' ? 'High Risk' : 'סיכון גבוה',
      'shoulder_injury': language === 'en' ? 'Medium Risk' : 'סיכון בינוני',
      'hip_injury': language === 'en' ? 'Medium Risk' : 'סיכון בינוני',
      'wrist_injury': language === 'en' ? 'Low Risk' : 'סיכון נמוך',
      'knee_injury': language === 'en' ? 'Low Risk' : 'סיכון נמוך',
    };
    return severityMap[injuryId] || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {language === 'en' ? 'Select Injuries in Class' : 'בחר פציעות בכיתה'}
        </Text>
        <Text style={styles.subtitle}>
          {language === 'en' 
            ? 'Check all injuries that are present in today\'s class' 
            : 'סמן את כל הפציעות הקיימות בשיעור של היום'
          }
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {Object.entries(injuryGroups).map(([groupName, injuryIds]) => (
          <View key={groupName} style={styles.group}>
            <Text style={styles.groupTitle}>
              {language === 'en' ? groupName : 
                groupName === 'Neck & Spine' ? 'צוואר ועמוד שדרה' :
                groupName === 'Back' ? 'גב' :
                groupName === 'Upper Body' ? 'פלג גוף עליון' : 'פלג גוף תחתון'
              }
            </Text>
            {injuryIds.map(injuryId => {
              const injury = injuries.find(i => i.id === injuryId);
              if (!injury) return null;
              
              const isSelected = localSelectedInjuries.includes(injuryId);
              const severityColor = getSeverityColor(injuryId);
              const severityText = getSeverityText(injuryId);

              return (
                <TouchableOpacity
                  key={injuryId}
                  style={[styles.injuryItem, isSelected && styles.selectedInjury]}
                  onPress={() => toggleInjury(injuryId)}
                >
                  <View style={styles.injuryContent}>
                    <View style={styles.injuryInfo}>
                      <Text style={[styles.injuryName, isSelected && styles.selectedText]}>
                        {injury.name}
                      </Text>
                      <Text style={[styles.injuryDescription, isSelected && styles.selectedText]}>
                        {injury.description}
                      </Text>
                    </View>
                    <View style={styles.severityContainer}>
                      <View style={[styles.severityDot, { backgroundColor: severityColor }]} />
                      <Text style={[styles.severityText, { color: severityColor }]}>
                        {severityText}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>
          {localSelectedInjuries.length} {language === 'en' ? 'injuries selected' : 'פציעות נבחרו'}
        </Text>
        <TouchableOpacity 
          style={[styles.continueButton, localSelectedInjuries.length === 0 && styles.disabledButton]}
          onPress={handleContinue}
        >
          <Text style={[styles.continueButtonText, localSelectedInjuries.length === 0 && styles.disabledText]}>
            {language === 'en' ? 'Continue to Class' : 'המשך לשיעור'}
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
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  group: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 12,
    paddingLeft: 4,
  },
  injuryItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedInjury: {
    borderColor: '#2E86AB',
    backgroundColor: '#E3F2FD',
  },
  injuryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  injuryInfo: {
    flex: 1,
    marginRight: 12,
  },
  injuryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  injuryDescription: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },
  selectedText: {
    color: '#2E86AB',
  },
  severityContainer: {
    alignItems: 'center',
  },
  severityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  selectedCount: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#2E86AB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2E86AB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#E9ECEF',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#6C757D',
  },
});

export default InjurySelectionScreen;