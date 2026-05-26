/**
 * HomeScreen — app entry point.
 *
 * Handles language selection and navigates to InjurySelection.
 * Simple enough to remain as a single file (no sub-components needed).
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Colors, Spacing, Typography, BorderRadius, ShadowStrong } from '../constants/theme';
import { Language } from '../types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { language, setLanguage, isLoading } = useApp();

  if (isLoading) {
    // Loading is handled by the LoadingScreen rendered from App.tsx
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            {language === 'he' ? 'מדריך פילאטיס' : 'Pilates Instructor'}
          </Text>
          <Text style={styles.subtitle}>
            {language === 'he' ? 'ניהול שיעורים מודע לפציעות' : 'Injury-Aware Class Management'}
          </Text>
        </View>

        {/* Language toggle */}
        <View style={styles.languageToggle}>
          {(['en', 'he'] as Language[]).map(lang => (
            <TouchableOpacity
              key={lang}
              style={[styles.langButton, language === lang && styles.langButtonActive]}
              onPress={() => setLanguage(lang)}
            >
              <Text style={[styles.langButtonText, language === lang && styles.langButtonTextActive]}>
                {lang === 'en' ? 'English' : 'עברית'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('InjurySelection' as never)}
        >
          <Text style={styles.startButtonText}>
            {language === 'he' ? 'התחל שיעור חדש' : 'Start New Class'}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: 40,
  },
  titleBlock: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.pill,
    padding: 4,
  },
  langButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.pill - 2,
    minWidth: 80,
    alignItems: 'center',
  },
  langButtonActive: {
    backgroundColor: Colors.primary,
  },
  langButtonText: {
    fontSize: Typography.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  langButtonTextActive: {
    color: Colors.cardBg,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    ...ShadowStrong,
  },
  startButtonText: {
    color: Colors.cardBg,
    fontSize: Typography.lg,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
