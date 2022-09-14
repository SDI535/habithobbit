import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
// import { theme } from "../core/theme";
import { styles } from "../styles/styles";

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.textinputcontainer}>
      <Input
        theme={{ roundness: 100 }}
        style={styles.textinput}
        selectionColor='#4E53BA'
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.textinputdescription}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.textinputerror}>{errorText}</Text> : null}
    </View>
  );
}

// const styles = StyleSheet.create({
//   textinputcontainer: {
//     width: "85%",
//     marginVertical: 5,
//   },
//   textinput: {
//     backgroundColor: theme.colors.surface,
//     borderRadius: 50,
//   },
//   textinputdescription: {
//     fontSize: 13,
//     color: theme.colors.secondary,
//     paddingTop: 8,
//   },
//   textinputerror: {
//     fontSize: 12,
//     color: theme.colors.error,
//     // paddingTop: -20,
//   },
// });
