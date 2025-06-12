import * as React from "react";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

import { useIsUserLoggedIn } from "@io/store";

const contextInitialState: ContextInterface = {};

interface ContextInterface {}

const AuthContext = React.createContext<ContextInterface>(contextInitialState);

// Hook to access auth context
export function useAuth(): ContextInterface {
  const context = React.useContext<ContextInterface>(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a Provider");
  }

  return context;
}

// Hook to protect routes based on user authentication
function useProtectedRoute(isLoggedIn: boolean) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!isLoggedIn && !inAuthGroup) {
      router.push("/(auth)");
    } else if (isLoggedIn && inAuthGroup) {
      router.push("/(tabs)");
    }
  }, [isLoggedIn, segments, router]);
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const isLoggedIn = useIsUserLoggedIn();

  useProtectedRoute(isLoggedIn);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
