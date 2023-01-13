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
import firebase from "./firebase";
import AttendanceScreen from "./screens/AttendanceScreen";
const Stack = createNativeStackNavigator();

export default function App() {
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
            cardStyle: {
              transform: [{ translateY: "100%" }],
            },
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="House" component={HouseScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
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
