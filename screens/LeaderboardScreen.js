import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LeaderboardScreen = () => {
  return (
    <View>
      <Text>LeaderboardScreen</Text>
      <LottieView
        autoPlay
        loop
        speed={0.9}
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../assets/lottie/lizard.json")}
      />
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({});
