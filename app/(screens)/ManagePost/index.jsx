import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react';
import db from './../../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo';
import { getDocs, QuerySnapshot } from 'firebase/firestore';
import PetListItem from './../../../components/Home/PetListItem'
import { collection,  query, where } from 'firebase/firestore';


export default function index() {

    const {user}=useUser();
    const [userPostList,setUserPostList]=useState([]);

    const navigation=useNavigation();
    useEffect(()=>{

        navigation.setOptions({
            headerTitle:'User Post'
        })

        user&&getUserPost();

    },[user])

    const getUserPost=async()=>{
        const q=query(collection(db,'Pets'),where('email','==',user.emailAddress));
        const querySnapshot=await getDocs(q);   
        querySnapshot.forEach((doc)=>{
            setUserPostList(prev=>[...prev,doc.data()]);
            console.log(doc.data())
        })
    }


  return (
    <View style={{padding:20}}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>UserPost</Text>

      <FlatList
      data={userPostList}
      numColumns={2}
      renderItem={({item,index})=>(
        <PetListItem pet={item} key={index}/>
      ) }
      
      />


    </View>
  )
}