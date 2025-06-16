import { ActivityIndicator, Alert, View } from "react-native";
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

      const prompt = `Generate a React Native login screen component with email and password fields and button to login designed beautifully.

      IMPORTANT: 
      - Return ONLY a JSON object with a "jsx" field containing the component code
      - Use ONLY inline styles (no StyleSheet)
      - The entire JSX must be in a single line
      - Escape all quotes in the JSX
      - Do not include any comments or explanations
      
      REQUIREMENTS:
      1. Use only these components: View, Text, TextInput, Button
      2. Style everything with inline styles
      3. Include proper padding and margins
      4. Make it clean and user-friendly
      5. Add placeholder text for inputs
      6. Include a login button with an onPress handler
      
      EXAMPLE RESPONSE:
      {
        "jsx": "<View style={{flex:1,justifyContent:'center',padding:20,backgroundColor:'#fff'}}><View style={{marginBottom:20}}><TextInput style={{height:40,borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:10,marginBottom:10}} placeholder='Email' /><TextInput style={{height:40,borderWidth:1,borderColor:'#ccc',borderRadius:5,padding:10}} placeholder='Password' secureTextEntry /></View><Button title='Login' onPress={() => {}} /></View>"
      }
      
      RULES:
      - NO StyleSheet
      - NO line breaks in JSX
      - NO template literals
      - NO comments
      - ONLY return the JSON object with jsx field`;

      const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llava:7b",
          prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let jsx = "";

      console.log(data.response);

      // Try to get JSX directly from common response formats
      if (typeof data === "object" && data !== null) {
        // Check for direct jsx property
        if (data.jsx) {
          jsx = data.jsx;
        }
        // Check for response property that might contain JSX
        else if (data.response) {
          const responseText = data.response;
          // Remove any escaped characters
          const cleanText = responseText.replace(/\\/g, "");
          // Try to find JSX in the response
          const jsxMatch = cleanText.match(/<[a-zA-Z][\s\S]*?<\/[a-zA-Z]+>/);
          if (jsxMatch) {
            jsx = jsxMatch[0];
          } else {
            // If no JSX found, use the whole response
            jsx = cleanText;
          }
        }
        // For OpenAI-style responses
        else if (data.choices?.[0]?.message?.content) {
          jsx = data.choices[0].message.content;
        }
        // For raw text responses
        else if (data.text) {
          jsx = data.text;
        }
      }

      // If we still don't have JSX, try to extract it from the stringified response
      if (!jsx) {
        const stringResponse = JSON.stringify(data);
        const jsxMatch = stringResponse.match(/<[a-zA-Z][\s\S]*?<\/[a-zA-Z]+>/);
        if (jsxMatch) {
          jsx = jsxMatch[0];
        }
      }

      // Final cleanup
      if (jsx) {
        // Clean up concatenated strings with +
        jsx = jsx.replace(/"\s*\+\s*"/g, "").replace(/\\"/g, '"');

        // Rest of your existing cleanup code...
        jsx = jsx.replace(/\\n/g, "").replace(/\s+/g, " ").trim();

        // Fix common JSX issues
        // 1. Ensure self-closing tags are properly closed
        jsx = jsx.replace(/<([A-Za-z][A-Za-z0-9]*)([^>]*)>/g, (match, tag, rest) => {
          if (rest.endsWith("/") || (!rest.includes("/>") && !match.endsWith("</"))) {
            return match;
          }
          return match;
        });

        // 2. Ensure all tags are properly closed
        const openTags = [];
        const tagRegex = /<\/?([A-Za-z][A-Za-z0-9]*)(?:\s+[^>]*)?>/g;
        let lastIndex = 0;
        let result = "";
        let match;

        while ((match = tagRegex.exec(jsx)) !== null) {
          const [fullMatch, tag] = match;
          const isClosing = fullMatch.startsWith("</");

          result += jsx.slice(lastIndex, match.index);
          lastIndex = match.index + fullMatch.length;

          if (isClosing) {
            if (openTags[openTags.length - 1] === tag) {
              openTags.pop();
            }
            result += fullMatch;
          } else {
            // Handle self-closing tags
            if (fullMatch.endsWith("/>")) {
              result += fullMatch;
            } else {
              openTags.push(tag);
              result += fullMatch;
            }
          }
        }

        // Add any unclosed tags
        while (openTags.length > 0) {
          const tag = openTags.pop();
          result += `</${tag}>`;
        }

        jsx = result + jsx.slice(lastIndex);

        // Final cleanup
        jsx = jsx
          .replace(/>\s+</g, "><") // Remove spaces between tags
          .replace(/\s{2,}/g, " ") // Replace multiple spaces with single space
          .trim();

        // Validate the JSX structure
        const openCount = (jsx.match(/<[^/]/g) || []).length;
        const closeCount = (jsx.match(/<\//g) || []).length;

        if (openCount !== closeCount) {
          console.warn("Warning: Mismatched tags in JSX");
        }
      } else {
        throw new Error("Could not extract JSX from the response");
      }

      console.log("Final JSX:", jsx);

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
