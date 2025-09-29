import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading Pilates App...' 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2E86AB" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: '#2E86AB',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoadingScreen;