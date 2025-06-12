import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

import { STORAGE_KEYS } from "@io/constants";
import { User } from "@io/models";

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  setLoggedIn: (loggedIn: boolean) => void;
  handleAuthenticated: (data: { user: User; accessToken: string }) => void;
  logout: () => void;
}

// Custom storage object
const storage: StateStorage = {
  getItem: AsyncStorage.getItem,
  setItem: AsyncStorage.setItem,
  removeItem: AsyncStorage.removeItem,
};

export const useAuthStore = create(
  persist<AuthState>(
    set => ({
      isLoggedIn: false,
      user: null,
      accessToken: null,
      setLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
      handleAuthenticated: ({ user, accessToken }) => set(() => ({ user, accessToken })),
      logout: () => {
        set(() => ({ user: null, accessToken: null, isLoggedIn: false }));
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      storage: createJSONStorage(() => storage),
    }
  )
);

export const useIsUserLoggedIn = () => {
  return useAuthStore(state => state.isLoggedIn);
};

// Persisted Zustand state object
export interface PersistedAuthStore {
  state: {
    isLoggedIn: boolean;
    user: User;
    accessToken: string;
  };
}
