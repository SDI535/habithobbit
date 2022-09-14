import { StyleSheet, Text, View, Animated, Image } from "react-native";
import React from "react";

const AnimatedLoader = ({ text }) => {
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  Animated.loop(
    Animated.spring(position, {
      toValue: { x: 0, y: -50 },
      bounciness: 20,
      speed: 15,
      useNativeDriver: true,
    }),
    -1
  ).start();

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Animated.Image
        source={require("../assets/bouncinghobbit.png")}
        style={[styles.image, { transform: [{ translateY: position.y }] }]}
      />
      {text ? <Text>{`${text}`}</Text> : null}
    </View>
  );
};

export default AnimatedLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
