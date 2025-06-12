import React, { FC } from "react";
import { Text, StyleSheet, TextProps, TextStyle, StyleProp } from "react-native";
import { useTheme } from "@rneui/themed";

import { AppFonts, Colors, TextTypeStyles } from "@io/constants";

export enum TextType {
  HEADING = "heading",
  SUBHEADING = "subheading",
  LARGE_TEXT = "largeText",
  SMALL_TEXT = "smallText",
  BODY_TEXT = "bodyText",
  SECONDARY_TEXT = "secondaryText",
  BUTTON_TEXT = "buttonText",
  BUTTON_LINK_TEXT = "buttonLinkText",
  LINK_TEXT = "linkText",
  ERROR_MESSAGE = "errorMessage",
  LABEL = "label",
  PLACEHOLDER_TEXT = "placeholderText",
  DISABLED_TEXT = "disabledText",
  INPUT_TEXT = "inputText",
}

interface TypographyProps extends TextProps {
  text?: string;
  fontFamily?: AppFonts;
  fontSize?: number;
  color?: string;
  type?: TextType;
  lightColor?: string;
  darkColor?: string;
  numberOfLines?: number;
  customTextStyle?: StyleProp<TextStyle>;
  onTextPress?: () => void;
}

export const Typography: FC<TypographyProps> = ({
  text = "",
  fontFamily = AppFonts.SpaceMono,
  fontSize,
  color,
  type = TextType.BODY_TEXT,
  lightColor,
  darkColor,
  numberOfLines,
  customTextStyle,
  onTextPress,
  ...restProps
}) => {
  const { theme } = useTheme();

  const textStyle: StyleProp<TextStyle> = [
    TextTypeStyles[type],
    { color: color || theme.colors.textPrimary },
    { fontFamily },
    customTextStyle || {},
  ];
  if (fontSize !== undefined) {
    textStyle.push({ fontSize });
  }
  return (
    <Text
      style={StyleSheet.flatten(textStyle)}
      onPress={onTextPress}
      numberOfLines={numberOfLines}
      {...restProps}>
      {text}
    </Text>
  );
};
