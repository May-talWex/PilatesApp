/**
 * Design tokens — single source of truth for colors, spacing, typography, and elevation.
 * Import from here everywhere instead of using magic numbers in StyleSheets.
 */

export const Colors = {
  primary: '#2E86AB',
  background: '#F8F9FA',
  cardBg: '#FFFFFF',
  border: '#E9ECEF',
  textPrimary: '#212529',
  textSecondary: '#6C757D',
  textMuted: '#495057',
  danger: '#DC3545',
  warning: '#FFC107',
  success: '#28A745',
  neutral: '#6C757D',
  selectedBg: '#E3F2FD',
  altExerciseBg: '#E3F2FD',
  altExerciseText: '#1976D2',
} as const;

/** Maps severity level → brand color. Use everywhere severity is visualised. */
export const SeverityColors: Record<string, string> = {
  high: Colors.danger,
  medium: Colors.warning,
  low: Colors.success,
  safe: Colors.neutral,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
} as const;

export const Typography = {
  xs: 12,
  sm: 13,
  base: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  pill: 25,
} as const;

/**
 * Shared shadow style — spread into a StyleSheet object.
 * @example
 * card: { backgroundColor: Colors.cardBg, ...Shadow }
 */
export const Shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
} as const;

/** Stronger shadow for primary action buttons. */
export const ShadowStrong = {
  shadowColor: Colors.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
} as const;
