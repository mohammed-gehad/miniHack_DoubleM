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
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//screens
import MoviesSwiper from "./src/screens/MoviesSwiper";
import SigninScreen from "./src/screens/SigninScreen";
import WatchListScreen from "./src/screens/WatchListScreen";

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
                if (route.name === "MovieStack") {
                  return (
                    <MaterialCommunityIcons
                      name={"gesture-swipe"}
                      size={30}
                      color={color}
                    />
                  );
                } else if (route.name === "WatchListScreen") {
                  return (
                    <MaterialIcons name={"favorite"} size={30} color={color} />
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
            <tab.Screen name="WatchListScreen" component={WatchListScreen} />
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
