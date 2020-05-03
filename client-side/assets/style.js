import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFBFD",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 24,
    backgroundColor: "#7041EE",

    width: 305,
    height: 58,
  },
  text: {
    fontFamily: "CircularStdBlack",
    color: "#FAFBFD",
    fontSize: 36,
  },
  errMessage: {
    fontFamily: "CircularStdBlack",
    color: "#FA4F3B",
    fontSize: 15,
  },
  subText: {
    fontFamily: "CircularStdBlack",
    color: "#FAFBFD",
    fontSize: 15,
  },
  input: {
    width: 305,
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  inputStyle: {
    color: "#2C2929",
    fontFamily: "CircularStd",
    fontSize: 20,
  },
  divider: {
    height: 10,
    backgroundColor: "transparent",
  },
  buttonTitleStyle: {
    color: "#FFFFFF",
    fontFamily: "CircularStd",
    fontSize: 20,
  },
});
