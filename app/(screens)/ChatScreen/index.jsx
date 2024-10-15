import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';
import moment from 'moment';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, 'Chat', params?.id, 'Messages'),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, 'Chat', params?.id);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    console.log(result);
    const otherUser = result?.users.filter(
      (item) => item.email !== user?.primaryEmailAddress.emailAddress
    );
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };

  const onSend = async (newMessages = []) => {
    // Append new message to the local state
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    // Add timestamp to the message
    const messageToSend = {
      ...newMessages[0], // Grab the new message
      createdAt: moment().format('MM-DD-YYYY HH:mm:ss'), // Format the date
    };

    try {
      // Add the message to the Firestore database
      await addDoc(collection(db, 'Chat', params.id, 'Messages'), messageToSend);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
