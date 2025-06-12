import { View } from "react-native";
import { useTheme } from "@rneui/themed";

import { Typography, TextType } from "@io/components";
import { CommonStyles } from "@io/constants";

const TeamsTabScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={[CommonStyles.flexContainer, { backgroundColor: theme.colors.background }]}>
      <Typography text="Teams Screen" type={TextType.HEADING} />
    </View>
  );
};

export default TeamsTabScreen;
