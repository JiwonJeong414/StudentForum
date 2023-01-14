import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "react-native-size-matters";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";

const Checkmark = ({ item, handleAddTwo, handleUndoTwo, comment }) => {
  const [checkMark, showCheckMark] = useState(false);
  const [today, setToday] = useState(moment().format("MM/DD/YYYY"));
  const firestore = firebase.firestore();

  const handleAdd = (id) => {
    handleAddTwo(id);
    if (comment !== "") showCheckMark(true);
  };

  const handleUndo = (id) => {
    handleUndoTwo(id);
    if (comment !== "") showCheckMark(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: moderateScale(10) }}>
        {checkMark === false ? (
          <TouchableOpacity onPress={() => handleAdd(item.id)}>
            <View style={styles.box}></View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleUndo(item.id)}>
            <View style={styles.checkedBox}></View>
          </TouchableOpacity>
        )}
        <Text style={{ fontSize: moderateScale(20) }}>
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
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "gray",
    borderRadius: moderateScale(5),
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: moderateScale(5),
  },
  checkedBox: {
    backgroundColor: "blue",
    borderRadius: moderateScale(5),
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: moderateScale(5),
  },
});
