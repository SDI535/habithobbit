import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

const SplashScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};
