import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from './../../constants/Colors';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using MaterialIcons as an example
import * as AuthSession from 'expo-auth-session';

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      
      router.replace('/Login/LoginPage');
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  
  return (
    <View style={{ padding: 20, marginTop: 20,gap:30 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Profile</Text>

      <View style={{ display: 'flex', alignItems: 'center', marginVertical: 25 }}>
        <Image source={{ uri: user?.imageUrl }} style={{ width: 80, height: 80, borderRadius: 99 }} />
        <Text style={{ fontFamily: 'outfit-Bold', fontSize: 20, marginTop: 6 }}>{user?.fullName}</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      {/* Add New Pet Button */}
      <TouchableOpacity
        style={{
          backgroundColor: Colors.SECONDARY,
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => router.push('/(screens)/AddNewPetScreen')}
      >
        <Icon name="add" size={24} color="white" />
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, color: 'white', marginLeft: 8 }}>Add New Pet</Text>
      </TouchableOpacity>

      {/* Favorites Button */}
      <TouchableOpacity
        style={{
          backgroundColor: Colors.SECONDARY,
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => router.push('/(tabs)/favorite')}
      >
        <Icon name="favorite" size={24} color="white" />
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, color: 'white', marginLeft: 8 }}>Favorites</Text>
      </TouchableOpacity>

      {/* Manage Post Button */}
      {/* <TouchableOpacity
        style={{
          backgroundColor: Colors.SECONDARY,
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={() => router.push('/(screens)/ManagePost')}
      >
        <Icon name="post-add" size={24} color="white" />
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, color: 'white', marginLeft: 8 }}>Manage Posts</Text>
      </TouchableOpacity> */}

      {/* Log Out Button */}
      <TouchableOpacity
        style={{
          backgroundColor: Colors.SECONDARY,
          padding: 15,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={handleLogout}
      >
        <Icon name="logout" size={24} color="white" />
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, color: 'white', marginLeft: 8 }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
