import AsyncStorage from "@react-native-async-storage/async-storage";

import { isJson } from "@io/utils";
import { STORAGE_KEYS } from "@io/constants";

export type AppStorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export type StorageItem<T> = {
  key: AppStorageKey;
  value: T;
};

export async function getStorageDataByKey<T>(key: AppStorageKey): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);

    if (!value) return null;

    if (isJson(value)) {
      return JSON.parse(value);
    }

    return value as T;
  } catch (_) {
    return null;
  }
}

export async function storeData<T>({ key, value }: StorageItem<T>): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export const removeStorageItem = async (key: AppStorageKey) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
