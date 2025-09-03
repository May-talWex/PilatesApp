# Pilates Injury-Smart Instructor Assistant (MVP)

## Project Summary

This is a mobile POC app built with React Native and Expo, designed to help Pilates instructors deliver safe and personalized classes. The app is focused on the beginner classical mat repertoire, and assists instructors in identifying exercises that may not be appropriate for students with injuries, offering safe alternatives in real time.

---

## MVP Scope

This MVP includes the following features:

- **Preset Beginner Sequence**  
  A fixed list of classical mat Pilates exercises (beginner level).

- **Injury Tags Per Exercise**  
  Each exercise is tagged with common injuries for which it is contraindicated (e.g., lower back pain, wrist issues, knee instability).

- **Replacement Exercises**  
  For every exercise-injury conflict, the app displays an instructor approved alternative exercise that can be used instead.

- **Start Lesson Flow**  
  A “Start Lesson” screen allows the instructor to select one or more injuries present in the class. This applies real-time filters to the preset plan.

- **Smart Highlighting & Modifications**  
  During the lesson, exercises that are not suitable for the selected injuries are flagged visually. Each flagged exercise will also show its replacement(s), corresponding to the injury types selected.

---

## Design Philosophy

- Built for new or growing Pilates instructors who want to plan safer classes with confidence  
- Based on the classical method and actual instructor workflows  
- No client data or profile saving in this version. This is a pure, offline-first POC  
- Fully functional on iPhone via Expo Go

---

## Features Planned for Post-MVP Phase

These features are intentionally not included in the MVP, but are potential candidates for future development after validation and user feedback:

- Custom class builder (create your own sequences)
- Backend and user authentication
- Save class plans or student profiles
- Support for equipment based repertoire (Reformer, Cadillac, etc.)


## Technology Stack

### Core Framework & Development
- **React Native + Expo** - Cross-platform mobile development with iPhone-first design
- **TypeScript** - Type-safe development for better code quality and maintainability
- **Expo EAS** - Build and deployment pipeline for TestFlight distribution

### Navigation & State Management
- **React Navigation (Native Stack)** - iOS-native navigation experience
- **Zustand** - Lightweight global state management for app-wide data
- **AsyncStorage** - Local persistence for user preferences and selected injuries

### Data & Logic
- **Static JSON files** - Offline-first data storage for exercises, injuries, and substitution rules
- **Pure TypeScript services** - Business logic separation for substitution engine and data management

### Testing & Quality Assurance
- **Jest** - JavaScript testing framework for unit and integration tests
- **@testing-library/react-native** - Component testing utilities for React Native
- **TypeScript strict mode** - Enhanced type checking for runtime error prevention

### Development Approach
- **Modular component architecture** - Isolated, testable components for maintainable code
- **Test-driven development** - Comprehensive test coverage for core functionality
- **Incremental development** - Designed for 1-hour daily development sessions




