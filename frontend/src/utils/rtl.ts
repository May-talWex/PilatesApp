/**
 * RTL layout helpers.
 *
 * We deliberately avoid I18nManager.forceRTL() because it requires an app
 * restart and disrupts Expo Go development. Instead we apply directional
 * styles conditionally via these helpers, so the layout mirrors correctly
 * for Hebrew without any restart.
 */

import { Language } from '../types';

export const isRTL = (language: Language): boolean => language === 'he';

/** Use as the flexDirection value for row containers. */
export const getFlexDirection = (language: Language): 'row' | 'row-reverse' =>
  language === 'he' ? 'row-reverse' : 'row';

/** Use as textAlign for headings and paragraph text. */
export const getTextAlign = (language: Language): 'left' | 'right' =>
  language === 'he' ? 'right' : 'left';

/**
 * Returns border widths that place the coloured accent strip on the reading-start
 * edge of the card (left in LTR, right in RTL). Always returns both sides so
 * one side is always explicitly zeroed — prevents both sides showing at once.
 */
export const getBorderAccentSide = (
  language: Language,
  width: number = 6
): { borderLeftWidth: number; borderRightWidth: number } =>
  language === 'he'
    ? { borderLeftWidth: 0, borderRightWidth: width }
    : { borderLeftWidth: width, borderRightWidth: 0 };

/**
 * Returns the back-arrow character that points toward the start of reading
 * direction (left for LTR, right for RTL).
 */
export const getBackArrow = (language: Language): string =>
  language === 'he' ? '→' : '←';
