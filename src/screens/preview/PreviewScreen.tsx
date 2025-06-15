import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@rneui/themed";

import { FormButton, Typography } from "@io/components";
import { CommonStyles } from "@io/constants";

const PreviewScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { imageData } = useLocalSearchParams<{ imageData: string }>();

  console.log("Preview image data:", imageData); // Add this for debugging

  if (!imageData) {
    return (
      <SafeAreaView style={[CommonStyles.flexRoot, { backgroundColor: theme.colors.background }]}>
        <View style={styles.noImageContainer}>
          <Typography>No image to display</Typography>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageData as string }} style={styles.image} resizeMode="contain" />
      </View>

      <FormButton onPress={() => router.back()} title="Back to Canvas" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default PreviewScreen;
