import React, { useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as MoviesProvider } from "./src/context/MoviesContext";
import Ionicons from "react-native-vector-icons/Ionicons";

//screens
import MoviesSwiper from "./src/screens/MoviesSwiper";
import SigninScreen from "./src/screens/SigninScreen";

const stack = createStackNavigator();
const tab = createBottomTabNavigator();

function MovieStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="MoviesSwiper" component={MoviesSwiper} />
    </stack.Navigator>
  );
}

function App() {
  const {
    state: { token },
    getUserInfo,
    getToken,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    //for fast,auto login
    getToken().then((result) => setIsLoading(result));
  }, [isLoading]);

  if (isLoading)
    return (
      <View
        style={{
          backgroundColor: "#FAFBFD",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );

  return (
    <NavigationContainer>
      {!token ? (
        <>
          <stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <stack.Screen name="signin" component={SigninScreen} />
          </stack.Navigator>
        </>
      ) : (
        <>
          <tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "noteStack") {
                  return <Ionicons name={"ios-list"} size={30} color={color} />;
                } else if (route.name === "createNote") {
                  return (
                    <Ionicons
                      name={"md-add-circle-outline"}
                      size={40}
                      color={color}
                    />
                  );
                } else if (route.name === "account") {
                  return (
                    <Ionicons name={"ios-options"} size={30} color={color} />
                  );
                }

                // You can return any component that you like here!
              },
            })}
            tabBarOptions={{
              activeTintColor: "#7041EE",
              inactiveTintColor: "gray",
              showLabel: false,
            }}
          >
            <tab.Screen name="MovieStack" component={MovieStack} />
          </tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <MoviesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MoviesProvider>
  );
};
