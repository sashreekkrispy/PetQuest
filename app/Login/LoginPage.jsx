import { View, Text, Pressable,Image } from 'react-native'
import Colors from '@/constants/Colors'
import React from 'react'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {


  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
       
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View style={{backgroundColor:Colors.WHITE,height:'100%'}}>
      
      <Image source={require('./../../assets/images/LoginImageBackground.webp')}
      
      style={{width:'100%',
      height:500}}/>

      <View style={{
        padding:35,
        display:'flex',
        alignItems:'center'
      }}>

    <Text style={{
      fontFamily:'outfit-Bold',
      fontSize:30,
      textAlign:'center'

    }}>
      Ready to make a  new friend ? 
    </Text>

    <Text style={{fontFamily:'outfit',
      textAlign:'center',
      padding:15,
      fontSize:18,
      color:Colors.GRAY
    }}>
      
      
      Let's choose a pet that you love and bring joy back into their life!

    </Text>


    <Pressable 
    onPress={onPress}
    
    style={{
      padding:15,
      marginTop:70,
      backgroundColor:Colors.PRIMARY,
      width:'100%',
      borderRadius:14
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20,
        textAlign:'center'
      }}>
        Get Started
      </Text>
    </Pressable>
      </View>

       
      
    </View>
  )
}