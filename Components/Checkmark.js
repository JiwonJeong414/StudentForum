import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "react-native-size-matters";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";

const Checkmark = ({ item, handleAddTwo, handleUndoTwo, comment, point }) => {
  const [checkMark, showCheckMark] = useState(false);
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const firestore = firebase.firestore();

  const handleAdd = (id) => {
    handleAddTwo(id);
    if (comment !== "" && point !== 0) showCheckMark(true);
  };

  const handleUndo = (id) => {
    handleUndoTwo(id);
    if (comment !== "" && point !== 0) showCheckMark(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: moderateScale(10),
          marginLeft: moderateScale(40),
        }}
      >
        {checkMark === false ? (
          <TouchableOpacity onPress={() => handleAdd(item.id)}>
            <View style={styles.box}></View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleUndo(item.id)}>
            <View style={styles.checkedBox}></View>
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: moderateScale(25),
            fontFamily: "Ubuntu",
            top: moderateScale(5),
            left: moderateScale(5),
          }}
        >
          {item.firstname + " " + item.lastname}
        </Text>
      </View>
    </View>
  );
};

export default Checkmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    backgroundColor: "#D4D4D4",
    borderRadius: moderateScale(5),
    width: moderateScale(35),
    height: moderateScale(35),
    marginRight: moderateScale(5),
  },
  checkedBox: {
    backgroundColor: "#ADD8E6",
    borderRadius: moderateScale(5),
    width: moderateScale(35),
    height: moderateScale(35),
    marginRight: moderateScale(5),
  },
});
