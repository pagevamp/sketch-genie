const IS_PROD = process.env.EXPO_PUBLIC_APP_ENV === "production";

const environmentConfig = {
  production: {
    name: "Starter Kit",
    slug: "starter-kit",
    scheme: "starter-kit",
    bundleIdentifier: "io.outside.starterkit",
    package: "io.outside.starterkit",
  },
  development: {
    name: "StarterKitDev",
    slug: "starter-kit-dev",
    scheme: "starter-kit-dev",
    bundleIdentifier: "io.outside.starterkit.dev",
    package: "io.outside.starterkit.dev",
  },
};

const envConfig = environmentConfig[IS_PROD ? "production" : "development"];

export default ({ config }) => {
  const buildNumber = "1";
  const versionCode = 1;

  return {
    ...config,
    name: envConfig.name,
    slug: envConfig.slug,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: envConfig.scheme,
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: false,
      bundleIdentifier: envConfig.bundleIdentifier,
      buildNumber,
      splash: {
        image: "./src/assets/images/splash-light.png",
        resizeMode: "contain",
        backgroundColor: "#9F5F45",
        dark: {
          image: "./src/assets/images/splash-dark.png",
          resizeMode: "contain",
          backgroundColor: "#252525",
        },
      },
      privacyManifests: {
        NSPrivacyCollectedDataTypes: [
          {
            NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeCrashData",
            NSPrivacyCollectedDataTypeLinked: false,
            NSPrivacyCollectedDataTypeTracking: false,
            NSPrivacyCollectedDataTypePurposes: [
              "NSPrivacyCollectedDataTypePurposeAppFunctionality",
            ],
          },
          {
            NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypePerformanceData",
            NSPrivacyCollectedDataTypeLinked: false,
            NSPrivacyCollectedDataTypeTracking: false,
            NSPrivacyCollectedDataTypePurposes: [
              "NSPrivacyCollectedDataTypePurposeAppFunctionality",
            ],
          },
          {
            NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeOtherDiagnosticData",
            NSPrivacyCollectedDataTypeLinked: false,
            NSPrivacyCollectedDataTypeTracking: false,
            NSPrivacyCollectedDataTypePurposes: [
              "NSPrivacyCollectedDataTypePurposeAppFunctionality",
            ],
          },
        ],
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
          },
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategorySystemBootTime",
            NSPrivacyAccessedAPITypeReasons: ["35F9.1"],
          },
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryFileTimestamp",
            NSPrivacyAccessedAPITypeReasons: ["C617.1"],
          },
        ],
      },
    },
    android: {
      package: envConfig.package,
      versionCode,
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#252525",
      },
      splash: {
        image: "./src/assets/images/splash-light.png",
        resizeMode: "contain",
        backgroundColor: "#9F5F45",
        dark: {
          image: "./src/assets/images/splash-dark.png",
          resizeMode: "contain",
          backgroundColor: "#252525",
        },
      },
    },
    plugins: [
      "expo-router",
      [
        "@sentry/react-native/expo",
        {
          organization: "sentry org slug, or use the `SENTRY_ORG` environment variable",
          project: "sentry project name, or use the `SENTRY_PROJECT` environment variable",
        },
      ],
      "expo-font",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      ...config.extra,
      router: {
        origin: false,
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };
};
