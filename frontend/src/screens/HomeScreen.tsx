import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

const HomeScreen: React.FC = () => {
  const { language, setLanguage, isLoading } = useApp();
  const navigation = useNavigation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  if (isLoading) {
    return null; // Loading is handled by App.tsx
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {language === 'en' ? 'Pilates Instructor' : 'מדריך פילאטיס'}
          </Text>
          <Text style={styles.subtitle}>
            {language === 'en' 
              ? 'Injury-Aware Class Management' 
              : 'ניהול שיעורים מודע לפציעות'
            }
          </Text>
        </View>

        <View style={styles.languageToggle}>
          <TouchableOpacity 
            style={[styles.languageButton, language === 'en' && styles.activeLanguage]}
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.languageText, language === 'en' && styles.activeLanguageText]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.languageButton, language === 'he' && styles.activeLanguage]}
            onPress={() => setLanguage('he')}
          >
            <Text style={[styles.languageText, language === 'he' && styles.activeLanguageText]}>
              עברית
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => navigation.navigate('InjurySelection' as never)}
          >
            <Text style={styles.startButtonText}>
              {language === 'en' ? 'Start New Class' : 'התחל שיעור חדש'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E86AB',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#E9ECEF',
    borderRadius: 25,
    padding: 4,
    marginBottom: 40,
  },
  languageButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  activeLanguage: {
    backgroundColor: '#2E86AB',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  activeLanguageText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  startButton: {
    backgroundColor: '#2E86AB',
    paddingVertical: 16,
    paddingHorizontal: 32,
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
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;