import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider, useApp } from './src/context/AppContext';
import LoadingScreen from './src/components/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import InjurySelectionScreen from './src/screens/InjurySelectionScreen';
import ClassPlanScreen from './src/screens/ClassPlanScreen';
import ExerciseDetailScreen from './src/screens/ExerciseDetailScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { isLoading } = useApp();

  if (isLoading) {
    return <LoadingScreen message="Loading Pilates App..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F8F9FA' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InjurySelection" component={InjurySelectionScreen} />
        <Stack.Screen name="ClassPlan" component={ClassPlanScreen} />
        <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
