import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { SafeAreaView as SafeAreaViewComponent } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

import { SketchCanvasComponent, TextType, Typography } from "@io/components";
import { CommonStyles, Images, vs } from "@io/constants";
import { JsxParser } from "@io/utils";

const CanvasScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const getBase64FromFile = async (uri: string): Promise<string> => {
    try {
      // Read the file as base64 string
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Return with data URI prefix
      return base64;
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  };

  const handleSave = async (path: string) => {
    try {
      setIsLoading(true);

      const prompt = `Generate a React Native ui with the sketched image designed beautifully with the following rules:

      IMPORTANT:
      - Return ONLY a JSON object with a single "jsx" field containing the complete component code
      - The JSX must be in ONE SINGLE LINE
      - All quotes in the JSX must be properly escaped
      - DO NOT include any explanations, comments, or extra fields
      - All components must be syntactically valid React Native elements
      - Check if the structure is properly nested
      - DO NOT use any external state, variables, or functions that aren't defined within the JSX
      
      STYLING:
      - Use ONLY inline styles (no StyleSheet.create)
      - Make the layout visually appealing, with good spacing, padding, and colors
      
      RULES:
      - DO NOT use any image components (Image or ImageBackground)
      - DO NOT wrap children inside <Image> tags (Image is a self-closing component)
      - DO NOT use template literals, backticks, or newlines
      - Ensure proper React Native syntax and valid component hierarchy
      - The JSX string must be properly escaped for use in a JSON response
      - Use TouchableOpacity or Pressable for button component
      
      EXAMPLE RESPONSE FORMAT:
      {
        "jsx": "<View>{/* JSX content here */}</View>"
      }
      `;

      const base64Image = await getBase64FromFile(path);

      const response = await fetch("http://127.0.0.1:11500/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llava:7b",
          prompt,
          images: [base64Image],
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Response data:", data.response);

      const jsx = JsxParser(data);
      if (!jsx) {
        throw new Error("Could not extract JSX from the response");
      }

      console.log("Extracted JSX:", jsx);

      router.push({
        pathname: "/design",
        params: { jsx },
      });
    } catch (error) {
      console.error("Error in handleSave:", error);
      Alert.alert("Error", `Failed to generate JSX`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          CommonStyles.flexContainer,
          { gap: vs.pd10, backgroundColor: theme.colors.background },
        ]}>
        <ActivityIndicator size="large" color={theme.colors.buttonPrimary} />
        <Typography text="Generating UI..." type={TextType.SMALL_TEXT} />
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
