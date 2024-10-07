import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function Category({ category }) {
  const [sliderList, setSliderList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dogs');

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              category(item.name);
            }}
            style={styles.categoryContainer}
          >
            <View style={[styles.imageWrapper, selectedCategory === item.name && styles.selectCategory]}>
              <Image source={{ uri: item?.imageUrl }} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryText}>
              {item?.name ? item.name : 'Unnamed'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20, // Use marginBottom to separate the category from the pet list below
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 10,
    marginBottom: 10, // Adjust margin to ensure spacing is correct
    color: '#333',
    fontFamily: 'outfit-Bold',
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#FFE5B4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    margin: 8,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'outfit-Bold',
  },
  selectCategory: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
});
