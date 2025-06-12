import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";

import { Typography, FormButton, TextType } from "@io/components";
import { CommonStyles, vs } from "@io/constants";
import { useAuthStore } from "@io/store";

const LoginScreen = () => {
  const { theme } = useTheme();
  const setLoggedIn = useAuthStore(state => state.setLoggedIn);

  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <View
      style={[
        CommonStyles.flexRoot,
        CommonStyles.paddingHorizontal24,
        { backgroundColor: theme.colors.background, paddingBottom: insets.bottom ?? vs.pd24 },
      ]}>
      <View style={CommonStyles.flexContainer}>
        <Typography text="Login Screen" type={TextType.HEADING} />
      </View>

      <FormButton title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
