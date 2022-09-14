import RootNavigation from "./src/routes/RootNavigation";
import React from "react";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
