import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator, // Import the ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../../config/FirebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const { user } = useUser(); // Correct hook usage
  const [formData, setFormData] = useState({});
  const [gender, setGender] = useState();
  const [image, setImage] = useState(); // State for image
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const onSubmit = () => {
    if (!formData.name || !formData.category || !formData.age || !formData.sex || !formData.breed || !formData.weight || !formData.about || !image) {
      ToastAndroid.show("Please enter all the details", ToastAndroid.SHORT);
      return;
    }

    // Check if user data is available
    if (!user || !user.fullName || !user.imageUrl || !user.primaryEmailAddress?.emailAddress) {
      ToastAndroid.show("User information missing. Please log in again.", ToastAndroid.LONG);
      return;
    }

    setLoading(true); // Show loading indicator
    uploadImage();
  };

  const uploadImage = async () => {
    try {
      const resp = await fetch(image);
      const blobImage = await resp.blob();
      const storageRef = ref(storage, '/PetQuest/' + Date.now() + '.jpg');
      await uploadBytes(storageRef, blobImage);
      console.log('File uploaded');
      const downloadUrl = await getDownloadURL(storageRef);
      saveFormData(downloadUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false); // Hide loading indicator if there's an error
    }
  };

  const saveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, 'Pets', docId), {
        ...formData,
        imageUrl: imageUrl,
        ownerName: user.fullName,
        ownerImage: user.imageUrl,
        email: user.primaryEmailAddress.emailAddress,
        id: docId,
      });
      console.log('Pet added successfully!');
      ToastAndroid.show("Pet added successfully!", ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving form data:', error);
      ToastAndroid.show("Error adding pet", ToastAndroid.SHORT);
    } finally {
      setLoading(false); // Hide loading indicator once data is saved
    }
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleInputChange("imageUrl", result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.title}>Add new pet for adoption</Text>
      
      {/* Loading indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#E8B20E" style={{ marginBottom: 20 }} />
      )}

      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("./../../../assets/images/palceholder.png")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Pet name"
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType='number-pad'
          placeholder="Pet age"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed</Text>
        <TextInput
          style={styles.input}
          placeholder="Pet breed"
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Pet weight"
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About pet</Text>
        <TextInput
          numberOfLines={5}
          multiline={true}
          style={styles.input}
          placeholder="About"
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'SUBMIT'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    paddingBottom: 20,
  },
  image: {
    padding: 40,
    height: 100,
    width: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 7,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: "#E8B20E",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 55,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    textAlign: "center",
  },
});
