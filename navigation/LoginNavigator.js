import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { moderateScale } from "react-native-size-matters";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import LearnScreen from "../screens/LearnScreen";
import PointsHistoryScreen from "../screens/PointsHistoryScreen";
import AdminScreen from "../screens/AdminScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import MultipleScreen from "../screens/MultipleScreen";
import PasswordScreen from "../screens/PasswordScreen";

const HomeTabStack = createNativeStackNavigator();

export function HomeTabNavigator({ navigation }) {
  return (
    <HomeTabStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: "slide_from_bottom",
      }}
    >
      <HomeTabStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <HomeTabStack.Screen
        options={{
          headerShown: true,
        }}
        name="Learn"
        component={LearnScreen}
      />
      <HomeTabStack.Screen
        options={{
          headerShown: false,
        }}
        name="History"
        component={PointsHistoryScreen}
      />
    </HomeTabStack.Navigator>
  );
}

const AdminTabStack = createNativeStackNavigator();

export function AdminTabNavigator({ navigation }) {
  return (
    <AdminTabStack.Navigator
      initialRouteName="Admin"
      screenOptions={{
        animation: "slide_from_bottom",
      }}
    >
      <AdminTabStack.Screen
        options={{
          headerShown: false,
        }}
        name="Admin"
        component={AdminScreen}
      />
      <AdminTabStack.Screen
        options={{
          headerShown: false,
        }}
        name="Attendance"
        component={AttendanceScreen}
      />
      <AdminTabStack.Screen
        options={{
          headerShown: false,
        }}
        name="Multiple"
        component={MultipleScreen}
      />
    </AdminTabStack.Navigator>
  );
}
