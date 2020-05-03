import React from "react";
import { View, ImageBackground } from "react-native";
import { Header } from "../components/Header";

const image = require("../../assets/background.jpg");

const BackGround = ({ children }) => {
  return (
    <View
      style={[
        { flex: 1, flexDirection: "column" },
        { flexDirection: "column" },
      ]}
    >
      <ImageBackground
        source={image}
        style={{ flex: 1, resizeMode: "cover", padding: 20 }}
      >
        <Header icon={true} />
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackGround;
