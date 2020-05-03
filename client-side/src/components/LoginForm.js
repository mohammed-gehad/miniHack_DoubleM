import React from "react";
import { View, Text } from "react-native";
import { Button, Input, Divider, Image } from "react-native-elements";
import styles from "../../assets/style";

export const LoginForm = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  title,
  text,
  password,
  username,
  setUsername,
  showUsernameField,
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        height: 310,
      }}
    >
      <Text style={[styles.text, { color: "#7041EE", textAlign: "center" }]}>
        {text}
      </Text>
      <Divider style={styles.divider} />

      {showUsernameField ? (
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
      ) : null}
      <Divider style={styles.divider} />
      <Input
        placeholder={placeholder}
        containerStyle={[styles.input]}
        inputContainerStyle={[styles.inputContainerStyle]}
        inputStyle={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={password || false}
      />
      <Divider style={styles.divider} />
      <Button
        title={title}
        type="solid"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitleStyle}
        onPress={onPress}
      />
    </View>
  );
};
