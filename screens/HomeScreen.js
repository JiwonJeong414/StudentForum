import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";

export default function HomeScreen() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // retrieve points from firebase
    // retrieve house color as well
  }, []);

  return (
    <View style={styles.container}>
      <Text styles={styles.text}>You currently have</Text>
      <Text>{points}</Text>
      <Text>points!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: moderateScale(40),

    textAlign: "center",
  },
});
