import { View, Text, Image } from 'react-native'
import React from 'react'

import MarkFav from './MarkFav';

export default function PetInfo({pet}) {

  console.log('Pet object krispy :', pet);
  return (
    <View>
    <Image 
    source={{ uri: pet.imageUrl }} 
    style={{ width: '100%', height: 450 }} 
    resizeMode='cover' 
    onError={() => console.error('Failed to load image at:', pet.imageUrl)}
/>



<View style={{
    padding:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
}}>

    <View>
        <Text style={{
            fontFamily:'outfit-Bold',
            fontSize:27
        }}>{pet.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:16
        }}>{pet.address}</Text>
    </View>

   <MarkFav pet={pet} />




</View>
    </View>
  )
}