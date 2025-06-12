import React, { FC } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { Controller, Control } from "react-hook-form";

import { Colors, CommonStyles, hs, vs } from "@io/constants";
import { CustomTextInput, Typography, TextType } from "../../atoms";

interface FormTextInputProps extends TextInputProps {
  refField?: React.RefObject<TextInput>;
  name: string;
  defaultValue?: string;
  control: Control;
  rules?: object;
}

const FormTextInput: FC<FormTextInputProps> = ({
  refField,
  name,
  defaultValue,
  control,
  rules = {},
  ...restProps
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View style={[CommonStyles.flexRoot, { gap: vs.pd4 }]}>
          <Typography
            text="Field"
            fontSize={hs.fs12}
            darkColor={Colors.neutral400}
            lightColor={Colors.neutral800}
            type={TextType.LABEL}
          />

          <CustomTextInput
            ref={refField}
            customContainerStyle={{ marginBottom: vs.mr20 }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={error?.message}
            {...restProps}
          />
        </View>
      )}
    />
  );
};

export default FormTextInput;
