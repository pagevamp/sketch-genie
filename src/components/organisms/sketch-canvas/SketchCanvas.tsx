import React, { useRef, useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { SketchCanvas } from "@wwimmo/react-native-sketch-canvas";
import { makeStyles, useTheme } from "@rneui/themed";

import { TextType, Typography } from "@io/components";
import { CommonStyles, hs, vs } from "@io/constants";
import { generateColorVariations } from "@io/utils";
import { BASE_COLORS } from "./BaseColors";

interface SketchCanvasProps {
  onSave: (path: string) => void;
}

export const SketchCanvasComponent: React.FC<SketchCanvasProps> = ({ onSave }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const sketchRef = useRef<SketchCanvas>(null);

  const [selectedColor, setSelectedColor] = useState(BASE_COLORS[0]);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [selectedBaseColor, setSelectedBaseColor] = useState(BASE_COLORS[0]);
  const [showIntensityPicker, setShowIntensityPicker] = useState(false);

  const handleBaseColorSelect = (color: string) => {
    setSelectedBaseColor(color);
    setShowIntensityPicker(true);
  };

  const handleIntensitySelect = (color: string) => {
    setSelectedColor(color);
    setShowIntensityPicker(false);
  };

  const clearCanvas = () => {
    sketchRef.current?.clear();
  };

  const undo = () => {
    sketchRef.current?.undo();
  };

  const saveDrawing = () => {
    const filename = `sketch-${Date.now()}`;
    sketchRef.current?.save(
      "png", // imageType
      true, // transparent
      "SketchGenie", // folder
      filename, // filename
      true, // includeImage
      true // cropToImageSize
    );
  };

  const handleSaveSketch = (success: boolean, path: string) => {
    if (success && path) {
      onSave(path);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Toolbar */}
      <View style={styles.topToolbar}>
        <TouchableOpacity style={styles.actionButton} onPress={undo} activeOpacity={0.7}>
          <Typography
            text="Undo"
            type={TextType.SMALL_TEXT}
            color={theme.colors.buttonDisabledText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.error }]}
          onPress={clearCanvas}
          activeOpacity={0.7}>
          <Typography
            text="Clear"
            type={TextType.SMALL_TEXT}
            color={theme.colors.buttonPrimaryText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
          onPress={saveDrawing}
          activeOpacity={0.7}>
          <Typography
            text="Save"
            type={TextType.SMALL_TEXT}
            color={theme.colors.buttonPrimaryText}
          />
        </TouchableOpacity>
      </View>

      {/* Canvas */}
      <View style={styles.canvasContainer}>
        <SketchCanvas
          ref={sketchRef}
          style={CommonStyles.flexRoot}
          strokeColor={selectedColor}
          strokeWidth={strokeWidth}
          onSketchSaved={handleSaveSketch}
        />
      </View>

      {/* Color Picker */}
      <View style={styles.colorPickerContainer}>
        {!showIntensityPicker ? (
          // Base color selection
          <FlatList
            data={BASE_COLORS}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.baseColorPalette}
            keyExtractor={item => item}
            renderItem={({ item: color }) => (
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => handleBaseColorSelect(color)}
              />
            )}
          />
        ) : (
          // Intensity selection for the selected base color
          <View style={styles.intensityPalette}>
            {selectedBaseColor &&
              generateColorVariations(selectedBaseColor).map((color, index) => (
                <TouchableOpacity
                  key={`${color}-${index}`}
                  style={[
                    styles.intensityButton,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedIntensity,
                  ]}
                  onPress={() => handleIntensitySelect(color)}
                />
              ))}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowIntensityPicker(false)}>
              <Typography text="←" color={theme.colors.textPrimary} type={TextType.SUBHEADING} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Stroke Width Picker */}
      <View style={styles.strokeWidthContainer}>
        {[2, 4, 6, 8, 12].map(width => (
          <TouchableOpacity
            style={styles.strokeButton}
            key={width}
            onPress={() => setStrokeWidth(width)}>
            <View
              style={[
                styles.strokeWidthButton,
                { width: width * 2, height: width * 2, borderRadius: width },
                strokeWidth === width && styles.selectedStroke,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topToolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: vs.pd10,
    backgroundColor: theme.colors.background,
    borderBottomWidth: hs.r1,
    borderBottomColor: theme.colors.border,
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  colorPickerContainer: {
    minHeight: vs.ht24,
    backgroundColor: theme.colors.background,
    borderTopWidth: hs.r1,
    borderTopColor: theme.colors.border,
  },
  baseColorPalette: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
    padding: vs.pd10,
  },
  intensityPalette: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: vs.pd10,
  },
  colorButton: {
    width: vs.ht24,
    height: vs.ht24,
    borderRadius: hs.r40,
    margin: vs.mr2,
    borderWidth: hs.r1,
    borderColor: theme.colors.border,
  },
  intensityButton: {
    flex: 1,
    height: vs.ht24,
    marginHorizontal: vs.mr2,
    borderRadius: hs.r4,
  },
  selectedColor: {
    borderWidth: hs.r2,
    borderColor: theme.colors.borderSecondary,
  },
  selectedIntensity: {
    borderWidth: hs.r2,
    borderColor: theme.colors.borderSecondary,
  },
  backButton: {
    marginLeft: vs.mr10,
  },
  strokeWidthContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: vs.pd8,
    backgroundColor: theme.colors.background,
    borderTopWidth: hs.r1,
    borderTopColor: theme.colors.border,
  },
  strokeButton: {
    width: vs.ht24,
    height: vs.ht24,
    alignItems: "center",
    justifyContent: "center",
  },
  strokeWidthButton: {
    backgroundColor: theme.colors.shadow,
  },
  selectedStroke: {
    outlineWidth: hs.r2,
    outlineColor: theme.colors.borderSecondary,
  },
  actionButton: {
    padding: vs.pd4,
    paddingHorizontal: vs.pd12,
    borderRadius: hs.r4,
    backgroundColor: theme.colors.buttonDisabled,
  },
}));

export default SketchCanvasComponent;
