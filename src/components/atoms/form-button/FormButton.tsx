import React, { FC } from "react";
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle, StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "@rneui/themed";

import { Colors, hs, TextTypeStyles, vs } from "@io/constants";

interface FormButtonProps extends ButtonProps {
  title?: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  customButtonStyle?: StyleProp<ViewStyle>;
  customDisabledButtonStyle?: StyleProp<ViewStyle>;
  customTitleStyle?: StyleProp<TextStyle>;
  customDisabledTitleStyle?: StyleProp<TextStyle>;
}

const ButtonStyles = StyleSheet.create({
  buttonHeight60: {
    height: vs.ht44,
  },
  formDisabledButton: {
    borderColor: "transparent",
  },
  formButtonTitle: {
    ...TextTypeStyles.buttonText,
    fontSize: hs.fs15,
    color: Colors.neutral200,
  },
  formDisabledTitleStyle: {
    ...TextTypeStyles.buttonText,
    opacity: 0.8,
  },
});

const FormButton: FC<FormButtonProps> = ({
  title,
  onPress,
  customButtonStyle = ButtonStyles.buttonHeight60,
  customDisabledButtonStyle = ButtonStyles.formDisabledButton,
  customTitleStyle = ButtonStyles.formButtonTitle,
  customDisabledTitleStyle = ButtonStyles.formDisabledTitleStyle,
  ...restProps
}) => {
  const { theme } = useTheme();

  return (
    <Button
      title={title}
      buttonStyle={[customButtonStyle, { backgroundColor: theme.colors.buttonPrimary }]}
      titleStyle={[customTitleStyle, { color: theme.colors.buttonPrimaryText }]}
      onPress={onPress}
      disabledStyle={customDisabledButtonStyle}
      disabledTitleStyle={customDisabledTitleStyle}
      activeOpacity={0.9}
      loadingProps={{ color: theme.colors.buttonPrimaryText }}
      {...restProps}
    />
  );
};

export default FormButton;
