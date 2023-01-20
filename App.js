import LoginScreen from "./screens/LoginScreen";
import { RootContext } from "./config/RootContext";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Provider as PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import HouseScreen from "./screens/HouseScreen";
import firebase from "./firebase"; // don't get rid (intializing firebase)
import { useFonts } from "expo-font";
import PasswordScreen from "./screens/PasswordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import {
  AdminTabNavigator,
  HomeTabNavigator,
} from "./navigation/LoginNavigator";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [onboarded, setOnboard] = useState(false);
  const [adminboarded, setAdminboard] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      let userName = await AsyncStorage.getItem("FirstName");
      let Admin = await AsyncStorage.getItem("Admin");
      userName = JSON.parse(userName);
      Admin = JSON.parse(Admin);
      if (userName !== null) {
        setOnboard(true);
      } else if (Admin !== null) setAdminboard(true);
    };
    setLoading(true);
    checkIfLoggedIn();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  let [fontsLoaded] = useFonts({
    Robot: require("./assets/fonts/NotoSans-Medium.ttf"),
    RobotBold: require("./assets/fonts/NotoSans-Bold.ttf"),
    Ubuntu: require("./assets/fonts/UbuntuMono-Regular.ttf"),
  });
  if (fontsLoaded) {
    return (
      <PaperProvider>
        <NavigationContainer>
          <RootContext.Provider
            value={{
              onboarded: onboarded,
              setOnboard: setOnboard,
              adminboarded: adminboarded,
              setAdminboard: setAdminboard,
            }}
          >
            {loading === true ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator animating={true} color="black" />
              </View>
            ) : onboarded === false && adminboarded === false ? (
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                  animation: "slide_from_bottom",
                }}
              >
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="House"
                  component={HouseScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Password"
                  component={PasswordScreen}
                />
              </Stack.Navigator>
            ) : onboarded === true && adminboarded === false ? (
              <Stack.Navigator
                screenOptions={{
                  animation: "slide_from_bottom",
                }}
              >
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Root"
                  component={HomeTabNavigator}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                screenOptions={{
                  animation: "slide_from_bottom",
                }}
              >
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Secondary"
                  component={AdminTabNavigator}
                />
              </Stack.Navigator>
            )}
          </RootContext.Provider>
        </NavigationContainer>
      </PaperProvider>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={true} color="black" />
      </View>
    );
  }
}
