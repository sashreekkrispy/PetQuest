import { View, Text, Pressable, Image } from 'react-native';
import Colors from '@/constants/Colors';
import React from 'react';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }), // Ensure scheme matches your app config
      });

      if (createdSessionId) {
        setActive({ session: createdSessionId }); // Activate session if created
      } else if (signIn || signUp) {
        // Handle multi-factor authentication or other steps
        console.log('Sign in or sign up required:', signIn, signUp);
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  }, []);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image
        source={require('./../../assets/images/LoginImageBackground.webp')}
        style={{ width: '100%', height: 500 }}
      />
      <View style={{ padding: 35, display: 'flex', alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'outfit-Bold',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          Ready to make a new friend?
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            textAlign: 'center',
            padding: 15,
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          Let's choose a pet that you love and bring joy back into their life!
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            padding: 15,
            marginTop: 70,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
