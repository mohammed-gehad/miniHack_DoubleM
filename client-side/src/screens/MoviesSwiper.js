import React, { useContext } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import BackGround from "../components/BackGround";
import styles from "../../assets/style";
import { useFonts } from "@use-expo/font";
import { Context as MovieContext } from "../context/MoviesContext";

const MoviesSwiper = () => {
  const { state, getMovies } = useContext(MovieContext);
  React.useEffect(() => {
    getMovies();
  }, []);
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
        <Text style={styles.text}>Explore:</Text>
      </BackGround>
    );
  }
};
export default MoviesSwiper;
