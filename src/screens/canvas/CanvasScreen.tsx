import { SafeAreaView, ActivityIndicator, View } from "react-native";
import { SafeAreaView as SafeAreaViewComponent } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
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

      const prompt = `Generate a React Native component for a login screen with email and password fields and a login button. 
Return a JSON object with a single "jsx" field containing the JSX code.
Example response:
{
  "jsx": "<View style={{flex:1,justifyContent:'center',padding:20}}><TextInput placeholder='Email'/><TextInput placeholder='Password' secureTextEntry/><Button title='Login'/></View>"
}

Important:
- Return only the JSON object with no additional text
- Do not include markdown code blocks
- Keep the JSX in a single line
- Escape all quotes in the JSX properly
- Do not include any imports or component definitions`;

      const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llava:7b",
          prompt,
          stream: false, // Set to false to get a single response
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Full response:", data);

      // Extract the JSX from the response
      const responseText = data.response || data.message?.content || data.text;
      if (!responseText) {
        throw new Error("No valid response from server");
      }

      // Parse the JSON response
      let jsonResponse;
      let cleanResponse = responseText
        .trim()
        // Remove any escaped quotes
        .replace(/\\"/g, '"')
        // Remove any escaped angle brackets
        .replace(/\\</g, "<")
        .replace(/\\>/g, ">")
        // Remove any leading/trailing quotes
        .replace(/^"|"$/g, "")
        // Remove any leading/trailing whitespace
        .trim();

      // Try to parse the cleaned response
      try {
        // If the response is already valid JSON, parse it directly
        jsonResponse = JSON.parse(cleanResponse);
      } catch (e) {
        // If not, try to extract JSON from the string
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            jsonResponse = JSON.parse(jsonMatch[0]);
          } catch (innerError) {
            console.error("Failed to extract JSON from response:", cleanResponse);
            throw new Error("Could not parse response as JSON");
          }
        } else {
          throw new Error("No valid JSON found in response");
        }
      }

      const { jsx } = jsonResponse;
      if (!jsx) {
        throw new Error("No JSX found in response");
      }

      console.log("Extracted JSX:", jsx);

      router.push({
        pathname: "/design",
        params: { jsx },
      });
    } catch (error) {
      console.error("Error in handleSave:", error);
      // Show error to user
    } finally {
      setIsLoading(false);
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
