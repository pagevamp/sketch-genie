import { StyleSheet } from "react-native";

import { AppFonts } from "./AppFonts";
import { hs } from "./Scaling";

export const CommonTextFont = {
  fontFamily: AppFonts.SpaceMono,
};

export const TextTypeStyles = StyleSheet.create({
  heading: {
    ...CommonTextFont,
    fontSize: hs.fs24,
  },
  subheading: {
    ...CommonTextFont,
    fontSize: hs.fs22,
  },
  largeText: {
    ...CommonTextFont,
    fontSize: hs.fs18,
  },
  smallText: {
    ...CommonTextFont,
    fontSize: hs.fs12,
  },
  bodyText: {
    ...CommonTextFont,
    fontSize: hs.fs14,
  },
  secondaryText: {
    ...CommonTextFont,
    fontSize: hs.fs14,
  },
  buttonText: {
    ...CommonTextFont,
    fontSize: hs.fs16,
    textTransform: "uppercase",
  },
  buttonLinkText: {
    ...CommonTextFont,
    fontSize: hs.fs16,
    textDecorationLine: "underline",
  },
  linkText: {
    ...CommonTextFont,
    fontSize: hs.fs16,
    textDecorationLine: "underline",
  },
  errorMessage: {
    ...CommonTextFont,
    fontSize: hs.fs14,
  },
  inputText: {
    ...CommonTextFont,
    fontSize: hs.fs16,
  },
  label: {
    ...CommonTextFont,
    fontSize: hs.fs14,
  },
  placeholderText: {
    ...CommonTextFont,
    fontSize: hs.fs16,
  },
  disabledText: {
    ...CommonTextFont,
    fontSize: hs.fs16,
  },
});

export const CommonStyles = StyleSheet.create({
  flexRoot: {
    flex: 1,
  },
  flexGrowRoot: {
    flexGrow: 1,
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  alignItemsEnd: {
    alignItems: "flex-end",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  alignSelfEnd: {
    alignSelf: "flex-end",
  },
  alignTextCenter: {
    textAlign: "center",
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  justifyContentEvenly: {
    justifyContent: "space-evenly",
  },
  justifyContentEnd: {
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  width100: {
    width: "100%",
  },
  paddingHorizontal24: {
    paddingHorizontal: hs.pd24,
  },
});
