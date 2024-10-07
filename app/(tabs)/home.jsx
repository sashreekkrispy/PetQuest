import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/header'
import Slider from '../../components/Home/slider'
import PetListBycategory from '../../components/Home/PetListBycategory'

export default function home() {
  return (

    <View>
  <Header />

  <Slider/>
  <PetListBycategory />
  

  </View>
  
  )
}