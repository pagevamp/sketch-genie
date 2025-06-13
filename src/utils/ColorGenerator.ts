export const generateColorVariations = (baseColor: string) => {
  // Generate 5 intensity variations of the base color
  const colors = [];
  for (let i = 0; i < 5; i++) {
    const intensity = 1 - i * 0.2;
    colors.push(adjustColorIntensity(baseColor, intensity));
  }
  return colors;
};

export const adjustColorIntensity = (color: string, intensity: number) => {
  // Convert hex to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Adjust intensity
  const newR = Math.round(r * intensity);
  const newG = Math.round(g * intensity);
  const newB = Math.round(b * intensity);

  // Convert back to hex
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};
