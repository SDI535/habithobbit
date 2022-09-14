import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "roboto-light": require("../assets/fonts/Roboto-Light.ttf"),
  });
