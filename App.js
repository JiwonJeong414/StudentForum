import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { RootContext } from "./config/RootContext";
import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import HouseScreen from "./screens/HouseScreen";
import AdminScreen from "./screens/AdminScreen";
import firebase from "./firebase"; // don't get rid (intializing firebase)
import { useFonts } from "expo-font";
import AttendanceScreen from "./screens/AttendanceScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Robot: require("./assets/fonts/NotoSans-Medium.ttf"),
    Ubuntu: require("./assets/fonts/UbuntuMono-Regular.ttf"),
  });

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

function RootNavigator() {
  const [userId, setUserId] = useState("");

  return (
    <RootContext.Provider value={{ userId: userId, setUserId: setUserId }}>
      <Stack.Navigator
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
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Admin"
          component={AdminScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Attendance"
          component={AttendanceScreen}
        />
      </Stack.Navigator>
    </RootContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
