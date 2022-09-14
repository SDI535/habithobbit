import * as SecureStore from "expo-secure-store";

const saveUser = async (value) => {
  return await SecureStore.setItemAsync("user", value);
};

const saveToken = async (token) => {
  return await SecureStore.setItemAsync("token", token);
};

const getUser = async () => {
  return await SecureStore.getItemAsync("user");
};

const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

const removeUser = async () => {
  return await SecureStore.deleteItemAsync("user");
};

const removeToken = async () => {
  return await SecureStore.deleteItemAsync("token");
};

export { saveUser, getUser, removeUser, saveToken, getToken, removeToken };
