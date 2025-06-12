import React from "react";
import { StyleSheet, StyleProp, ViewStyle, TextInput } from "react-native";
import { Input, InputProps, useTheme } from "@rneui/themed";

import { Colors, hs, vs, TextTypeStyles } from "@io/constants";

interface CustomTextInputProps extends InputProps {
  customContainerStyle?: StyleProp<ViewStyle>;
  customInputContainerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
}

type ForwardedRefComponentProps = CustomTextInputProps & {
  forwardedRef?: React.Ref<TextInput>;
};

const STYLES = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingHorizontal: hs.pd14,
    height: vs.ht44,
    backgroundColor: Colors.neutral100,
  },
  inputStyle: {
    ...TextTypeStyles.inputText,
  },
  errorStyle: {
    textAlign: "left",
  },
});

const CustomTextInput = React.forwardRef<TextInput, ForwardedRefComponentProps>(
  (
    { forwardedRef, customContainerStyle, customInputContainerStyle, errorMessage, ...restProps },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <Input
        ref={forwardedRef || ref}
        containerStyle={[STYLES.containerStyle, customContainerStyle]}
        inputContainerStyle={[
          STYLES.inputContainerStyle,
          customInputContainerStyle,
          { backgroundColor: theme.colors.inputBackground },
        ]}
        inputStyle={[STYLES.inputStyle, { color: theme.colors.inputText }]}
        placeholderTextColor={theme.colors.inputText}
        cursorColor={theme.colors.inputText}
        renderErrorMessage={false}
        errorMessage={errorMessage}
        errorStyle={STYLES.errorStyle}
        {...restProps}
      />
    );
  }
);

export default CustomTextInput;
