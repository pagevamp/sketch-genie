import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";

import { SketchCanvasComponent } from "@io/components";
import { CommonStyles } from "@io/constants";

const LoginScreen = () => {
  const { theme } = useTheme();

  const handleSave = (base64Image: string) => {
    // Handle the saved image (base64 string)
    console.log("Image saved!");
    // You can save it to AsyncStorage, upload to a server, etc.
  };

  return (
    <SafeAreaView style={[CommonStyles.flexRoot, { backgroundColor: theme.colors.background }]}>
      <SketchCanvasComponent onSave={handleSave} />
    </SafeAreaView>
  );
};

export default LoginScreen;
