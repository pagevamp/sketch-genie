import axios from "axios";

import { APP_ENV } from "./app-env";
import { getStorageDataByKey, removeStorageItem } from "@io/lib";
import { STORAGE_KEYS } from "@io/constants";
import { PersistedAuthStore } from "@io/store";

export const apiClient = axios.create({
  baseURL: APP_ENV.API_URL,
});

apiClient.interceptors.request.use(async config => {
  const persistedAuthState = await getStorageDataByKey<PersistedAuthStore>(STORAGE_KEYS.AUTH_TOKEN);
  if (persistedAuthState?.state) {
    config.headers.Authorization = `Bearer ${persistedAuthState.state.accessToken}`;
  }
  return config;
});

// Add response interceptor to catch errors globally
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Unauthorized error detected

      // Clear persisted auth data
      await removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);

      // Perform logout actions

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
