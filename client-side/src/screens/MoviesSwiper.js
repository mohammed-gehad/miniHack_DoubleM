import React, { useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import BackGround from "../components/BackGround";
import style from "../../assets/style";
import { useFonts } from "@use-expo/font";
import { Context as MovieContext } from "../context/MoviesContext";
import CardStack, { Card } from "react-native-card-stack-swiper";

const MoviesSwiper = () => {
  const { state, getMovies } = useContext(MovieContext);
  React.useEffect(() => {
    getMovies();
  }, []);
  const data = [
    {
      __v: 0,
      _id: "5eae074631cea34678224e48",
      genres: ["Horror"],
      name: "The Hole in the Ground",
      overview:
        "Sarah flees to the Irish countryside. It's implied that she is fleeing an abusive husband, with",
      poster:
        "https://winteriscoming.net/files/2019/02/mgot_s8_character_art_jon_snow.jpg",
    },
  ];

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
        <CardStack style={cardStyle.content}>
          {state.map((item, i) => {
            return (
              <Card
                onSwipedRight={() => {
                  console.log("right");
                }}
                style={[cardStyle.card, { backgroundColor: "#FAFBFD" }]}
                key={1}
              >
                <ImageBackground
                  source={{
                    uri: item.poster,
                  }}
                  style={{ flex: 1, resizeMode: "cover", padding: 20 }}
                >
                  <Text
                    style={[
                      style.text,
                      {
                        fontSize: 24,
                        textAlign: "center",
                        textShadowColor: "#2C2929",
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 10,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </ImageBackground>
              </Card>
            );
          })}
        </CardStack>
      </BackGround>
    );
  }
};

const cardStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 5,
    alignItems: "center",
    // justifyContent: "center",
  },
  card: {
    width: 320,
    height: 470,
    borderRadius: 5,
  },

  label: {
    lineHeight: 400,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderRadius: 55,
    marginTop: -15,
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#01df8a",
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fd267d",
  },
});

export default MoviesSwiper;
