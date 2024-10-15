import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

export default function PetSubInfo({ pet }) {
  return (
    <View style={{
      padding: 20,
      marginTop:-20
   
    }}>
      {/* Row 1: Age and Breed */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
        
        {/* Age */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
          padding: 10,
          margin: 5,
          borderRadius: 8,
          flex: 1
        }}>
          <Image source={require('./../../assets/images/calendar.png')} style={{
            width: 30,
            height: 30
          }}/>
          <View style={{ marginLeft: 10 }}>
            <Text style={{
              fontFamily: 'outfit',
              color: Colors.GRAY,
              fontSize: 14
            }}>Age</Text>
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 16
            }}>{pet?.age+" Years"}</Text>
          </View>
        </View>

        {/* Breed */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
          padding: 10,
          margin: 5,
          borderRadius: 8,
          flex: 1
        }}>
          <Image source={require('./../../assets/images/bone.png')} style={{
            width: 30,
            height: 30
          }}/>
          <View style={{ marginLeft: 10 }}>
            <Text style={{
              fontFamily: 'outfit',
              color: Colors.GRAY,
              fontSize: 14
            }}>Breed</Text>
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 16
            }}>{pet?.breed}</Text>
          </View>
        </View>
      </View>

      {/* Row 2: Sex and Weight */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        
        {/* Sex */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
          padding: 10,
          margin: 5,
          borderRadius: 8,
          flex: 1
        }}>
          <Image source={require('./../../assets/images/sex.png')} style={{
            width: 30,
            height: 30
          }}/>
          <View style={{ marginLeft: 10 }}>
            <Text style={{
              fontFamily: 'outfit',
              color: Colors.GRAY,
              fontSize: 14
            }}>Sex</Text>
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 16
            }}>{pet?.sex}</Text>
          </View>
        </View>

        {/* Weight */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
          padding: 10,
          margin: 5,
          borderRadius: 8,
          flex: 1
        }}>
          <Image source={require('./../../assets/images/weight.png')} style={{
            width: 30,
            height: 30
          }}/>
          <View style={{ marginLeft: 10 }}>
            <Text style={{
              fontFamily: 'outfit',
              color: Colors.GRAY,
              fontSize: 14
            }}>Weight</Text>
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 16
            }}>{pet?.weight} kg</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
