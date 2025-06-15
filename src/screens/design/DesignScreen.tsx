import React, { useMemo } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { transform } from "@babel/standalone";

const DesignScreen = () => {
  const { jsx } = useLocalSearchParams<{ jsx: string }>();

  const RenderedComponent = useMemo(() => {
    if (!jsx) return null;

    try {
      // Transform JSX to React.createElement calls
      const { code } = transform(jsx, {
        presets: ["react"],
        filename: "component.js",
      });

      // Create a function that returns the JSX
      const createElement = new Function(
        "React",
        "View",
        "Text",
        "TextInput",
        "Button",
        `return ${code}`
      );

      // Return the component
      return () => {
        try {
          return createElement(React, View, Text, TextInput, Button);
        } catch (e) {
          console.error("Error rendering component:", e);
          return <Text>Error rendering component</Text>;
        }
      };
    } catch (error) {
      console.error("Error creating component:", error);
      return () => <Text>Error creating component</Text>;
    }
  }, [jsx]);

  if (!jsx) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No component to render</Text>
      </View>
    );
  }

  return <View style={{ flex: 1, padding: 16 }}>{RenderedComponent && <RenderedComponent />}</View>;
};

export default DesignScreen;
