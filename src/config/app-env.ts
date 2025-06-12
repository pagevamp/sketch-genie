export const APP_ENV = {
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV as string,
  API_URL: process.env.EXPO_PUBLIC_API_URL as string,
} as const;
