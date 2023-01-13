import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale } from "react-native-size-matters";

export default function HomeScreen() {
  const [points, setPoints] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    // retrieve points from firebase
    // retrieve house color as well
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: screenWidth,
          height: screenHeight,
          position: "absolute",
        }}
        source={require("../assets/images/pink-01.png")}
      />
      {/* <Text style={styles.text}>You currently have</Text>
      <Text style={styles.text}>{points}</Text>
      <Text style={styles.text}>points!</Text> */}
      <Text
        style={{
          fontSize: moderateScale(100),
          marginTop: moderateScale(50),
          fontFamily: "Robot",
        }}
      >
        10
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: moderateScale(40),
  },
});
