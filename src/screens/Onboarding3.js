import React from "react";
import Header from "../components/loginHeader";
import Button from "../components/loginButton";
import Paragraph from "../components/loginParagraph";
import { Image, View } from "react-native";
import { styles } from "../styles/styles";

export default function Onboarding3({ navigation }) {
  return (
    <View style={styles.onboardcontainer}>
      <Image
        source={require("../assets/onboarding3.png")}
        style={styles.onboard3}
        resizeMode="contain"
      />
      <Header>Track Progress</Header>
      <Paragraph>
        Be an acountable hobbit! Give yourself a pat on the back when you
        completed!
      </Paragraph>
      <View style={styles.roundcontainer}>
        <View style={styles.lightround} />
        <View style={styles.lightround} />
        <View style={styles.darkround} />
      </View>
      <Button mode="contained" onPress={() => navigation.navigate("Register")}>
        Get Started!
      </Button>
    </View>
  );
}
