import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  FlatList,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import BackGround from "../components/BackGround";
import style from "../../assets/style";
import { useFonts } from "@use-expo/font";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as MoviesContext } from "../context/MoviesContext";

const MoviesSwiper = ({ navigation }) => {
  const {
    state: { watchList },
  } = useContext(AuthContext);
  const { state } = useContext(MoviesContext);

  const render = () => {
    if (watchList.length) {
      watchList.map((i) => {
        i = state.filter((movie) => movie._id == i);
        return (
          <View>
            <Text>{i[0].name}</Text>
          </View>
        );
      });
    } else return null;
  };
  let [fontsLoaded] = useFonts({
    CircularStdBlack: require("../../assets/Fonts/CircularStd-Black.ttf"),
    CircularStdBold: require("../../assets/Fonts/CircularStd-Bold.ttf"),
    CircularStdBook: require("../../assets/Fonts/CircularStd-Book.ttf"),
    CircularStd: require("../../assets/Fonts/CircularStd.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#7041EE" />;
  } else {
    return (
      <BackGround>
        <Text style={style.text}>Explore:</Text>
        <View style={{ height: 40 }}></View>
        {render()}
      </BackGround>
    );
  }
};

export default MoviesSwiper;
