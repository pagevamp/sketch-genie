import React, { useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  ActivityIndicator,
  FlatList,
  SectionList,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput as RNTextInput,
  VirtualizedList,
  DrawerLayoutAndroid,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { transform } from "@babel/standalone";
import { CommonStyles } from "@io/constants";
import { useTheme } from "@rneui/themed";

const DesignScreen = () => {
  const { jsx } = useLocalSearchParams<{ jsx: string }>();
  const { theme } = useTheme();

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
        // Core components
        "View",
        "Text",
        "TextInput",
        "Button",
        "ScrollView",
        "Image",
        "TouchableOpacity",
        "TouchableHighlight",
        "TouchableWithoutFeedback",
        "TouchableNativeFeedback",
        "ActivityIndicator",
        "FlatList",
        "SectionList",
        "ImageBackground",
        "KeyboardAvoidingView",
        "Modal",
        "RefreshControl",
        "SafeAreaView",
        "StatusBar",
        "StyleSheet",
        "Switch",
        "RNTextInput",
        "VirtualizedList",
        "DrawerLayoutAndroid",
        "Pressable",
        "Animated",
        "Easing",
        // Return the component
        `return ${code}`
      );

      // Return the component
      return () => {
        try {
          return createElement(
            React,
            // Pass all components in the same order
            View,
            Text,
            TextInput,
            Button,
            ScrollView,
            Image,
            TouchableOpacity,
            TouchableHighlight,
            TouchableWithoutFeedback,
            TouchableNativeFeedback,
            ActivityIndicator,
            FlatList,
            SectionList,
            ImageBackground,
            KeyboardAvoidingView,
            Modal,
            RefreshControl,
            SafeAreaView,
            StatusBar,
            StyleSheet,
            Switch,
            RNTextInput,
            VirtualizedList,
            DrawerLayoutAndroid,
            Pressable,
            Animated,
            Easing
          );
        } catch (e) {
          console.error("Error rendering component:", e);
          return (
            <View style={CommonStyles.flexContainer}>
              <Text>Error rendering component</Text>
            </View>
          );
        }
      };
    } catch (error) {
      console.error("Error creating component:", error);
      return () => (
        <View style={[CommonStyles.flexContainer, { backgroundColor: theme.colors.background }]}>
          <Text>Error creating component</Text>
        </View>
      );
    }
  }, [jsx]);

  if (!jsx) {
    return (
      <View style={[CommonStyles.flexContainer, { backgroundColor: theme.colors.background }]}>
        <Text>No component to render</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[CommonStyles.flexRoot, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={[
          CommonStyles.flexGrowRoot,
          { backgroundColor: theme.colors.background },
        ]}
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        {RenderedComponent && <RenderedComponent />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DesignScreen;
