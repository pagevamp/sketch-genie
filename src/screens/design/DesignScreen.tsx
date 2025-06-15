import React from "react";
import { View, Text } from "react-native";

interface DesignScreenProps {
  jsxCode: string;
}

const DesignScreen: React.FC<DesignScreenProps> = ({ jsxCode }) => {
  const RenderedComponent = React.useMemo(() => {
    try {
      const component = new Function("React", `return ${jsxCode}`)(React);
      return component;
    } catch (error) {
      console.error("Error rendering JSX:", error);
      return () => (
        <View>
          <Text>Error rendering component</Text>
        </View>
      );
    }
  }, [jsxCode]);

  return (
    <View style={{ flex: 1 }}>
      <RenderedComponent />
    </View>
  );
};

export default DesignScreen;
