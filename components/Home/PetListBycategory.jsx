import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Category from './Category'
import { collection, doc, getDocs, query ,where} from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'

import PetListItem from './PetListItem'
import { useEffect } from 'react'
import { FlatList } from 'react-native'



export default function PetListBycategory() {


  const[petList,setPetList]=useState([]);

  useEffect(() => {
    GetPetList('Dogs');
}, []);

const GetPetList=async(category)=>{

  setPetList([]);


const q=query(collection(db,'Pets'),where('category','==',category));
const querySnapshot=await getDocs(q);

querySnapshot.forEach(doc=>{

  console.log(doc.data());
  setPetList(petList=>[...petList,doc.data()])
})


}









  return (
    <View>
      <Category  category={(value)=>GetPetList(value)}/>

        <FlatList
        horizontal={true} 

        style={{
          
         paddingBottom:20,
          backgroundColor: '#f5f5f5', 
        }}

        data={petList}
        renderItem={({item,index})=>(

          <PetListItem pet={item}/>
        )}

        
        
        />
    </View>
  )
}