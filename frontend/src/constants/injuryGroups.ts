/**
 * Static configuration for how injuries are grouped by body part.
 * Keeping this here (not inline in a screen) means both the UI and any
 * future logic can import a single authoritative list.
 *
 * After Track 4 adds hamstring_injury, hip_flexor_strain, and osteoporosis
 * to the backend, add them to the appropriate groups below.
 */

export interface InjuryGroup {
  nameEn: string;
  nameHe: string;
  /** Ordered list of injury IDs belonging to this group. */
  injuries: string[];
}

export const INJURY_GROUPS: InjuryGroup[] = [
  {
    nameEn: 'Neck & Spine',
    nameHe: 'צוואר ועמוד שדרה',
    injuries: ['neck_injury', 'spine_injury'],
  },
  {
    nameEn: 'Back',
    nameHe: 'גב',
    injuries: ['lower_back_injury'],
  },
  {
    nameEn: 'Upper Body',
    nameHe: 'פלג גוף עליון',
    injuries: ['shoulder_injury', 'wrist_injury'],
  },
  {
    nameEn: 'Lower Body',
    nameHe: 'פלג גוף תחתון',
    injuries: ['hip_injury', 'knee_injury', 'hamstring_injury', 'hip_flexor_strain'],
  },
  {
    nameEn: 'Bone Health',
    nameHe: 'בריאות העצמות',
    injuries: ['osteoporosis'],
  },
];

/**
 * Default severity for each injury as shown on the injury selection screen.
 * Based on the typical impact across the classical mat repertoire.
 * This is a UX indicator only — actual exercise-level severity comes from the API.
 */
export const INJURY_DEFAULT_SEVERITY: Record<string, 'high' | 'medium' | 'low'> = {
  neck_injury: 'high',
  spine_injury: 'high',
  lower_back_injury: 'high',
  osteoporosis: 'high',
  shoulder_injury: 'medium',
  hip_injury: 'medium',
  hamstring_injury: 'medium',
  hip_flexor_strain: 'medium',
  wrist_injury: 'low',
  knee_injury: 'low',
};
