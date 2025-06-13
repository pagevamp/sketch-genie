import "@rneui/themed";
type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module "@rneui/themed" {
  export interface Colors {
    background: string;
    backgroundSecondary: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
    tabBarBackground: string;
    inputText: string;
    inputBackground: string;
    border: string;
    borderSecondary: string;
    buttonPrimary: string;
    buttonPrimaryText: string;
    buttonSecondary: string;
    buttonSecondaryText: string;
    buttonDisabled: string;
    buttonDisabledText: string;
    errorText: string;
    disabledText: string;
    overlay20: string;
    overlay50: string;
    shadow: string;
  }
}
