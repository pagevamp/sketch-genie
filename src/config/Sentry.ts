import * as Sentry from "@sentry/react-native";

const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

export const sentryConfig: Sentry.ReactNativeOptions = {
  // dsn: 'YOUR DSN HERE',
  tracesSampleRate: 1.0,
  debug: false,
  environment: "production",
  integrations: [routingInstrumentation],
};
