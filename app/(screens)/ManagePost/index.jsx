import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import db from './../../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { getDocs } from 'firebase/firestore';
import PetListItem from './../../../components/Home/PetListItem';
import { collection, query, where } from 'firebase/firestore';

export default function Index() {
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Set header title
    navigation.setOptions({
      headerTitle: 'User Post',
    });

    // Check if user is logged in before fetching posts
    if (user) {
      console.log('User is logged in:', user);
      getUserPost();
    } else {
      console.log('No user logged in');
    }
  }, [user]); // Run when the user changes

  const getUserPost = async () => {
    console.log('Fetching user posts...');
    
    const email = user?.primaryEmailAddress?.emailAddress || 'default-email@example.com';
    console.log('Using email for query:', email);
    
    const q = query(collection(db, 'Pets'), where('email', '==', email));
    
    try {
      console.log('Executing query...');
      const querySnapshot = await getDocs(q);
      
      // Log the number of documents found
      console.log('Query executed, number of documents found:', querySnapshot.size);
      
      if (querySnapshot.empty) {
        console.log('No matching documents found.');
      } else {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
          console.log('Fetched post data:', doc.data());
        });
  
        // Update state with fetched posts
        setUserPostList(posts);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>User Posts</Text>

      <FlatList
        data={userPostList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <PetListItem pet={item} key={index} />
        )}
        keyExtractor={(item, index) => index.toString()} // Add a key extractor for better performance
      />
    </View>
  );
}
