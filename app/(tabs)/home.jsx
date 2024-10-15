import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Home/header";
import Slider from "../../components/Home/slider";
import PetListBycategory from "../../components/Home/PetListBycategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function home() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Slider />
      <PetListBycategory />

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(screens)/AddNewPetScreen",
          })
        }
        style={styles.addButtonContainer}
      >
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text style={styles.addButtonText}>Add new pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the content takes the full height of the screen
  },
  addButtonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 10, // Reduced padding to fit better
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 10, // Added margin at the bottom to give space
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderStyle: "dashed",
    justifyContent: "center",
    borderRadius: 10, // Added border radius to improve aesthetics
  },
  addButtonText: {
    fontFamily: "outfit-Bold",
    color: Colors.PRIMARY,
  },
});
