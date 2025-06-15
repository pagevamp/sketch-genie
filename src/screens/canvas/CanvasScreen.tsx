import { SafeAreaView, ActivityIndicator, View } from "react-native";
import { SafeAreaView as SafeAreaViewComponent } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useState } from "react";

import { SketchCanvasComponent, TextType, Typography } from "@io/components";
import { CommonStyles, vs } from "@io/constants";

const CanvasScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (path: string) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("sketch", {
        uri: path,
        type: "image/png",
        name: "sketch.png",
      } as any);

      // TODO: Replace backend URL
      // const response = await fetch("http://your-backend-url/generate-jsx", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // const { jsx } = await response.json();
      // router.push({
      //   pathname: "/design",
      //   params: { jsx },
      // });
    } catch (error) {
      console.error("Error saving sketch:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[CommonStyles.flexContainer, { gap: vs.pd10 }]}>
        <ActivityIndicator size="large" color={theme.colors.buttonPrimary} />
        <Typography text="Generating JSX..." type={TextType.SMALL_TEXT} />
      </View>
    );
  }

  return (
    <SafeAreaViewComponent
      style={[CommonStyles.flexRoot, { backgroundColor: theme.colors.background }]}>
      <SketchCanvasComponent onSave={handleSave} />
    </SafeAreaViewComponent>
  );
};

export default CanvasScreen;
