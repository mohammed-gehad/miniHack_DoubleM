import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
  ImageBackground,
} from "react-native";
import { Button, Input, Divider, Image } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { Context as AuthContext } from "../context/AuthContext";
import styles from "../../assets/style";
import { LoginForm } from "../components/LoginForm";
const validator = require("validator");
const _ = require("lodash");

const SigninScreen = ({ navigation }) => {
  const { login, signup, getToken, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [username, setUsername] = useState("");

  // [enter_email,login,create_account]
  const [loginFlow, setLoginFlow] = useState("enter_email");

  let [fontsLoaded] = useFonts({
    CircularStdBlack: require("../../assets/Fonts/CircularStd-Black.ttf"),
    CircularStdBold: require("../../assets/Fonts/CircularStd-Bold.ttf"),
    CircularStdBook: require("../../assets/Fonts/CircularStd-Book.ttf"),
    CircularStd: require("../../assets/Fonts/CircularStd.ttf"),
  });

  const image = require("../../assets/background.jpg");
  //event clears error message when navigate to another screen
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      null;
    });

    return unsubscribe;
  }, [navigation]);

  const _loginFlow = () => {
    switch (loginFlow) {
      case "enter_email":
        return (
          <>
            <LoginForm
              text="welcome"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              title="next"
              onPress={() => _login(email, password)}
            />
          </>
        );
      case "login":
        return (
          <>
            <LoginForm
              text={`Hi ${username}!`}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              title="login"
              onPress={() => _login(email, password)}
              password={true}
            />
          </>
        );
      case "create_account":
        return (
          <View style={{ margin: 20, alignItems: "center" }}>
            <Text style={[styles.text, { textAlign: "center" }]}>
              Oops you dont have account!
            </Text>
            <Divider style={styles.divider} />
            <Divider style={styles.divider} />

            <Input
              placeholder="username"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Divider style={styles.divider} />

            <Input
              placeholder="password"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Divider style={styles.divider} />
            <Button
              title="create account"
              type="solid"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitleStyle}
              onPress={() => _signup(username, email, password)}
            />
          </View>
        );
      default:
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              height: 310,
            }}
          >
            <ActivityIndicator size="large" color="#7041EE" />
          </View>
        );
    }
  };

  const _login = (email, password) => {
    setErrMessage(null);
    setLoginFlow(null);
    email = _.trim(email);

    if (validator.isEmail(email)) {
      login(email, password).catch((e) => {
        console.log(e);
        //setLoginFlow [enter_email,login,create_account]
        if (e.message == "invalid password") {
          if (loginFlow == "login") setErrMessage("invalid password");
          setLoginFlow("login");
          setUsername(e.username);
        } else if (e.message == "invalid email") {
          console.log("create account");
          setLoginFlow("create_account");
        }
      });
    } else {
      setLoginFlow("enter_email");
      setErrMessage("invalid email");
    }
  };

  const _signup = (username, email, password) => {
    setErrMessage(null);
    setLoginFlow(null);
    signup(username, email, password).catch((e) => {
      setErrMessage(e);
      setLoginFlow("enter_email");
    });
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#7041EE" />;
  } else {
    return (
      <View
        style={[
          { flex: 1, flexDirection: "column" },
          { flexDirection: "column" },
        ]}
      >
        <ImageBackground
          source={image}
          style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
        >
          <View style={{ flex: 1 }}></View>

          <View style={{ flex: 9, alignItems: "center" }}>
            {_loginFlow()}
            {errMessage ? (
              <Text style={styles.errMessage}>{errMessage}</Text>
            ) : null}

            <Divider style={styles.divider} />
            {loginFlow == "create_account" || loginFlow == "login" ? (
              <TouchableOpacity
                onPress={() => {
                  setLoginFlow("enter_email");
                  setErrMessage(null);
                }}
              >
                <Text style={[styles.subText, { color: "#7041EE" }]}>
                  use a different email
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ImageBackground>
      </View>
    );
  }
};

export default SigninScreen;
