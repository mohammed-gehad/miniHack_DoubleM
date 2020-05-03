import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export const Header = ({ backgroundColor, onPress, icon }) => {
  const insets = useSafeArea();
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <View style={{ height: insets.top }}></View>

      {!icon && (
        <TouchableOpacity onPress={onPress} style={{ paddingLeft: 20 }}>
          <Ionicons name="ios-arrow-back" size={32} />
        </TouchableOpacity>
      )}
    </View>
  );
};
