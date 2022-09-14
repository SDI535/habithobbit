import React from "react";
import Background from "../components/loginBackground";
import Logo from "../components/loginLogo";
import Header from "../components/welcomeHeader";
import Button from "../components/loginButton";
import Paragraph from "../components/welcomeParagraph";

export default function Welcome({ navigation }) {
  return (
    <Background>
      <Header>Habits Tracker</Header>
      <Paragraph>Knock! knock! Who's there? WYD? HBU?</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Onboarding1")}
      >
        Let's go
      </Button>
    </Background>
  );
}
