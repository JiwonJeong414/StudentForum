import { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import firebase from "firebase";
import "firebase/firestore";

export default function AdminScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const pinkHouseRef = firebase
      .firestore()
      .collection("users")
      .doc("Pink House");
    pinkHouseRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setUsers(snapshot.data().users);
      } else {
        console.log("Pink House document does not exist");
      }
    });
  }, []);

  return (
    <View styles={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Text>{item.firstname + " " + item.lastname}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
