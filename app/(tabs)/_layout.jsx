import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen name='home' 
        options={{
            headerShown:false,
            tabBarIcon:({color})=><MaterialCommunityIcons name="home" size={24} color={color} />
        }}
         />
        <Tabs.Screen name='favorite' 
          options={{
            headerShown:false,
            tabBarIcon:({color})=><MaterialCommunityIcons name="heart" size={24} color={color} />
        }} />
        <Tabs.Screen name='inbox' 
          options={{
            headerShown:false,
            tabBarIcon:({color})=><MaterialCommunityIcons name="message" size={24} color={color} />
        }}/>
        <Tabs.Screen name='profile'
          options={{
            headerShown:false,
            tabBarIcon:({color})=><MaterialCommunityIcons name="face-man" size={24} color={color} />
        }} />
    </Tabs>
    
  )
}