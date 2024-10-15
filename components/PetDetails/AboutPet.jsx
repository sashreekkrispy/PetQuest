import { View, Text } from 'react-native'
import React from 'react'

export default function AboutPet({pet}) {
  return (
    <View style={{
        padding:20,

    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }}>About {pet?.name}</Text>

      <Text style={{
        fontFamily:'outfit',
        fontSize:16,
        marginTop:10
      }}>
        {pet?.about}
      </Text>
    </View>
  )
}