import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function UserItem({ userInfo }) {
  return (
    <Link href={'/(screens)/ChatScreen?id=' + userInfo.docId}>
      <View style={styles.container}>
        <Image 
          source={{ uri: userInfo?.imageUrl }} 
          style={styles.avatar} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{userInfo?.name}</Text>
          {/* Uncomment if you want to show additional info like email */}
          {/* <Text style={styles.email}>{userInfo?.email}</Text> */}
        </View>
      </View>
      <View style={styles.separator} />
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f9f9f9', // Light background for better contrast
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1, // Optional: Add border for better definition
    borderColor: '#e0e0e0',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'outfit-medium',
    fontSize: 16, // Slightly smaller for balance
    color: '#333',
  },
  email: {
    fontFamily: 'outfit-regular',
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0', // A lighter color for a subtle separator
    marginVertical: 5,
  },
});
