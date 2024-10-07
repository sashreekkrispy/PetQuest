import { View, Text } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'



export default function Header() {
    const {user} =useUser();
    
    console.log('User Data:', user);
  return (

    
    <View>
      <Text style={{
        fontFamily:'outfit',
        padding:20,
        marginTop:50,
        fontSize:20
      }}> Welcome back</Text>

      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:25
      }}>
        {user?.firstName}
      </Text>
    </View>
  )
}