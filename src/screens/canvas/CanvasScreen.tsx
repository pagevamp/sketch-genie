import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";

import { SketchCanvasComponent } from "@io/components";
import { CommonStyles } from "@io/constants";

type PreviewScreenParams = {
  imageData: string;
};

const CanvasScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleSave = (path: string) => {
    const params: PreviewScreenParams = { imageData: path };
    router.push({
      pathname: "/preview",
      params: params,
    });
  };

  return (
    <SafeAreaView style={[CommonStyles.flexRoot, { backgroundColor: theme.colors.background }]}>
      <SketchCanvasComponent onSave={handleSave} />
    </SafeAreaView>
  );
};

export default CanvasScreen;
