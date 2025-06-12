/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

import { Colors } from "./Colors";

const tintColorLight = Colors.primary400;
const tintColorDark = Colors.primary400;

export const CustomTheme = {
  light: {
    // Base colors
    background: Colors.neutral100,
    backgroundSecondary: Colors.neutral200,
    textPrimary: Colors.neutral800,
    textSecondary: Colors.neutral700,
    textTertiary: Colors.neutral500,

    // Component colors
    icon: Colors.neutral400,
    tabIconDefault: Colors.neutral400,
    tabIconSelected: tintColorLight,
    inputText: Colors.neutral800,
    inputBackground: Colors.neutral300,
    inputBorder: Colors.neutral400,
    inputError: Colors.angry500,

    // Button colors
    buttonPrimary: Colors.primary300,
    buttonPrimaryText: Colors.neutral100,
    buttonSecondary: Colors.secondary300,
    buttonSecondaryText: Colors.neutral100,

    // Card colors
    cardBackground: Colors.neutral200,
    cardBorder: Colors.neutral400,

    // Status colors
    success: Colors.accent400,
    warning: Colors.accent500,
    error: Colors.angry500,
    info: Colors.secondary400,

    // Overlay colors
    overlay20: Colors.overlay20,
    overlay50: Colors.overlay50,

    // Border colors
    border: Colors.neutral400,
    borderSecondary: Colors.neutral300,

    // Shadow colors
    shadow: Colors.neutral600,
  },
  dark: {
    // Base colors
    background: Colors.neutral800,
    backgroundSecondary: Colors.neutral700,
    textPrimary: Colors.neutral100,
    textSecondary: Colors.neutral400,
    textTertiary: Colors.neutral500,

    // Component colors
    icon: Colors.neutral500,
    tabIconDefault: Colors.neutral500,
    tabIconSelected: tintColorDark,
    inputText: Colors.neutral200,
    inputBackground: Colors.black100,
    inputBorder: Colors.neutral600,
    inputError: Colors.angry500,

    // Button colors
    buttonPrimary: Colors.primary400,
    buttonPrimaryText: Colors.neutral100,
    buttonSecondary: Colors.secondary400,
    buttonSecondaryText: Colors.neutral100,

    // Card colors
    cardBackground: Colors.neutral700,
    cardBorder: Colors.neutral600,

    // Status colors
    success: Colors.accent400,
    warning: Colors.accent500,
    error: Colors.angry500,
    info: Colors.secondary400,

    // Overlay colors
    overlay20: Colors.overlay20,
    overlay50: Colors.overlay50,

    // Border colors
    border: Colors.neutral600,
    borderSecondary: Colors.neutral500,

    // Shadow colors
    shadow: Colors.neutral200,
  },
};
