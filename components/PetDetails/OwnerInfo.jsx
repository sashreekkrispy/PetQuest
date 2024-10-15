import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from "@/constants/Colors"
import { StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
     <Image source={{uri:pet.ownerImage}} style={{
        width:40,
        height:40,
        borderRadius:99
     }}/>

     <View> 

        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20
        }}>{pet?.ownerName}</Text>
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
        }}>Pet Owner</Text>


     </View>

     </View>

     <MaterialCommunityIcons name="message" size={24} color="black" />


    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:30,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        borderWidth:1.5,
        borderRadius:45,
        marginHorizontal:20,
        backgroundColor:Colors.WHITE,
        justifyContent:'space-between',
        padding:15
        

    }
})