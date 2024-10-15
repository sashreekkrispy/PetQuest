import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function PetListItem({ pet }) {


  const router=useRouter();

   
  return (
    <TouchableOpacity  onPress={()=>router.push({

      pathname:'/(screens)/PetDetailsScreen',
      params:pet


    })} style={styles.card}>
      {/* Pet Image */}
      <Image source={{ uri: pet?.imageUrl }} style={styles.petImage} />

      {/* Pet Details */}
      <View style={styles.petInfo}>
        {/* Name */}
        <Text style={styles.petName}>{pet?.name}</Text>
        {/* Breed */}
        <Text style={styles.petBreed}>{pet?.breed}</Text>
      </View>

      {/* Age Badge */}
      <View style={styles.ageBadge}>
        <Text style={styles.ageText}>{pet?.age} YRS</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    alignItems: 'center',
    width: 160, // Adjust width for uniform cards
   
   
   
  },
  petImage: {
    width: '100%',
    height: 135,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
   
  },
  petInfo: {
    padding: 10,
    alignItems: 'center',
  },
  petName: {
    fontSize: 18,
  
    color: '#333',
    fontFamily:'outfit-Bold'
  },
  petBreed: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    fontFamily:'outfit'
  },
  ageBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor:Colors.PRIMARY,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 8,
  },
  ageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily:'outfit'
  },
});
