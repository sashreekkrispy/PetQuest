import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import PetInfo from '../../../components/PetDetails/PetInfo';
import PetSubInfo from '../../../components/PetDetails/PetSubInfo';
import AboutPet from '../../../components/PetDetails/AboutPet';
import OwnerInfo from '../../../components/PetDetails/OwnerInfo';
import { StyleSheet } from 'react-native';
import Colors from "@/constants/Colors"
import { useUser } from '@clerk/clerk-expo';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';

export default function PetDetails() {

    const pet=useLocalSearchParams();
    const navigator=useNavigation();
    const {user}=useUser();
    const router=useRouter();

    useEffect(()=>{
        navigator.setOptions({

            headerTransparent:true,
            headerTitle:''
            },[])})

            const InitiateChat = async () => {
                const userEmail = user?.primaryEmailAddress?.emailAddress;
                const petEmail = pet?.email;
              
                if (!userEmail || !petEmail) {
                  console.error('User or Pet email is undefined.');
                  return; // Prevent setDoc if either email is undefined
                }
              
                const docId1 = `${userEmail}_${petEmail}`;
                const docId2 = `${petEmail}_${userEmail}`;
              
                const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
                const querySnapshot = await getDocs(q);
              
                if (!querySnapshot.empty) {
                  querySnapshot.forEach((doc) => {
                    router.push({
                      pathname: "/(screens)/ChatScreen",
                      params: { id: doc.id },
                    });
                  });
                } else {
                  const newChatId = docId1;
              
                  const newChatData = {
                    id: newChatId,
                    users: [
                      {
                        email: userEmail,
                        imageUrl: user?.imageUrl || '', // Fallback to empty string if undefined
                        name: user?.fullName || 'Anonymous', // Fallback to 'Anonymous' if undefined
                      },
                      {
                        email: petEmail,
                        imageUrl: pet?.ownerImage || '', // Fallback to empty string if undefined
                        name: pet?.ownerName || 'Unknown', // Fallback to 'Unknown' if undefined
                      },
                    ],
                    userIds: [userEmail, petEmail],
                    createdAt: new Date(), // Timestamp
                  };
              
                  console.log('Chat Data:', newChatData); // Log the data to check for issues
              
                  try {
                    await setDoc(doc(db, 'Chat', newChatId), newChatData);
                    router.push({
                      pathname: "/(screens)/ChatScreen",
                      params: { id: newChatId },
                    });
                  } catch (error) {
                    console.error('Error creating chat:', error); // Handle Firestore errors
                  }
                }
              };
              
              
              

            


  return (
    <View>

        <ScrollView>

        {/* pet info  */}

        <PetInfo pet={pet} />



        {/* pet subInfo */}

        <PetSubInfo pet={pet}/>



        {/* about  */}

        <AboutPet pet={pet}/>



        {/* owner details*/}

        <OwnerInfo pet={pet}/>
        <View style={{height:70}}></View>




        </ScrollView>



        {/* adopt me button  */}

        <View style={styles.bottomContainer}> 

            <TouchableOpacity style={styles.adoptbtn} onPress={InitiateChat}>

                <Text style={{
                    fontFamily:'outfit-medium',
                    textAlign:'center',
                    fontSize:20
                }}>Adopt Me</Text>

            </TouchableOpacity>
        </View>



    </View>
  )
}

const styles = StyleSheet.create({
    adoptbtn:{
        padding:15,
        backgroundColor:Colors.PRIMARY
    },
    bottomContainer:{

        position:'absolute',
        width:'100%',
        bottom:0





    }
})