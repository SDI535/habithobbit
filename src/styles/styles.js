import { StyleSheet, Dimensions, Platform } from "react-native";
import { DefaultTheme } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#FFFFFF",
    primary: "#4E53BA",
    secondary: "#110580",
    tertiary: "#E8E8F7",
    subtext: "#868AE0",
    error: "#f13a59",
  },
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomebg: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    width: windowWidth,
    // height: windowHeight,
  },
  welcomecontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    maxWidth: 340,
    marginTop: "110%",
  },
  welcomeheader: {
    fontSize: 32,
    color: theme.colors.text,
    fontFamily: "roboto-bold",
    paddingVertical: 12,
  },
  welcometext: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.text,
    textAlign: "center",
    fontFamily: "roboto-light",
    marginBottom: "50%",
  },
  button: {
    width: 160,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
  },
  buttontext: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    lineHeight: 16,
    color: theme.colors.text,
  },
  onboardcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: windowWidth,
    paddingBottom: "15%",
    height: windowHeight,
    backgroundColor: theme.colors.text,
  },
  onboard1: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  openingheader: {
    fontSize: 32,
    color: theme.colors.secondary,
    fontFamily: "roboto-bold",
    paddingVertical: 12,
  },
  openingtext: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.subtext,
    textAlign: "center",
    fontFamily: "roboto-light",
    marginBottom: "20%",
    paddingHorizontal: 45,
  },
  onboard2: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  onboard3: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  roundcontainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "20%",
  },
  darkround: {
    backgroundColor: theme.colors.primary,
    width: 8,
    height: 8,
    borderRadius: 50,
    marginRight: 9,
  },
  lightround: {
    backgroundColor: theme.colors.tertiary,
    width: 8,
    height: 8,
    borderRadius: 50,
    marginRight: 9,
  },
  registercontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    width: windowWidth,
    paddingTop: "5%",
    paddingBottom: "10%",
    height: windowHeight,
    backgroundColor: theme.colors.text,
    // backgroundColor: "blue",
  },
  registerrow: {
    flexDirection: "row",
    paddingTop: "5%",
  },
  link: {
    fontFamily: "roboto-bold",
    color: theme.colors.primary,
  },
  register: {
    flex: 1,
    resizeMode: "contain",
    width: "55%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20%",
  },
  registertext: {
    fontFamily: "roboto-regular",
    color: theme.colors.subtext,
  },
  logincontainer: {
    width: "80%",
    height: 50,
    marginVertical: 12,
  },
  reginputcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth,
    ...Platform.select({
      ios: {
        paddingBottom: "25%",
      },
      android: {
        paddingBottom: 0,
      },
    }),

    height: windowHeight,
  },
  logininput: {
    backgroundColor: "#FFFFFF",
  },
  logindescription: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  loginerror: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  backbtncontainer: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  backbtn: {
    width: 35,
    height: 35,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  login: {
    flex: 1,
    resizeMode: "contain",
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20%",
  },
  logininputcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth,
    // paddingBottom: "45%",
    height: windowHeight,
  },
  keyboardavoiding: {
    flex: 1,
    padding: 10,
    width: "100%",
    // width: windowWidth,
    // height: windowHeight,
    maxWidth: 400,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  // Text input component
  textinputcontainer: {
    width: "85%",
    marginVertical: 5,
  },
  textinput: {
    backgroundColor: theme.colors.text,
    borderRadius: 50,
    fontSize: 16,
  },
  textinputdescription: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  textinputerror: {
    fontSize: 12,
    color: theme.colors.error,
  },
  // Create Habit
  habitcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 50,
    // paddingHorizontal: 20,
    width: "100%",
  },
  topHeader: {
    color: "#110580",
    fontSize: 20,
    paddingBottom: "5%",
    fontFamily: "roboto-bold",
  },
  headerTxt: {
    color: "#110580",
    fontSize: 16,
    alignSelf: "flex-start",
    marginTop: 15,
    paddingLeft: 35,
    fontFamily: "roboto-medium",
  },
  freqDropdown: {
    paddingVertical: 20,
    borderWidth: 0.5,
    alignSelf: "center",
    width: "85%",
    borderRadius: 30,
    marginVertical: 15,
    fontSize: 20,
    zIndex: 1,
  },
  freqPlaceholder: {
    fontSize: 16,
    color: theme.colors.primary,
    fontFamily: "roboto-medium",
    paddingHorizontal: 8,
  },
  freqText: {
    fontSize: 16,
    fontFamily: "roboto-medium",
    paddingHorizontal: 8,
    color: theme.colors.primary,
  },
  dayDropdown: {
    fontSize: 16,
    fontFamily: "roboto-medium",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    alignSelf: "center",
    width: "85%",
    borderRadius: 50,
    marginBottom: 50,
  },
  dropDown: {
    width: "85%",
    alignSelf: "center",
    fontSize: 10,
    fontFamily: "roboto-medium",
    borderWidth: 0.5,
  },
  listItemDropdown: {
    fontFamily: "roboto-light",
    color: theme.colors.primary,
    fontSize: 16,
  },
  badgeTextDropdown: {
    fontFamily: "roboto-regular",
    fontSize: 14,
    color: theme.colors.text,
  },
  viewHabitTitle:{
    fontFamily: "roboto-regular",
    fontSize: 12,
    fontWeight: "400",
    alignSelf: "flex-start",
    paddingLeft: "5%",
    color: "#878585",
    marginTop: "3%"
  },
  viewHabitDescription:{
    fontFamily: "roboto-bold",
    fontSize: 16,
    alignSelf: "flex-start",
    paddingLeft: "5%",
    marginTop: "1%",
    color: "#110580"
  },
  viewHabit:{
    flexDirection: "row",
  },
  trashcan: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    right: 15,
    padding: 5,
    borderWidth: 1.5,
    borderRadius: "50%"
  },
});
