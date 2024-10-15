import { View, Text } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function Header() {
    const { user } = useUser();

    console.log('User Data:', user);
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            marginTop: 50,
            marginBottom: 20, // Add space below the header
        }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                marginRight: 5,
            }}>
                Welcome back,
            </Text>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 24, // Make the username bigger
                paddingLeft: 0,
                color: '#333', // Optional: Change color for emphasis
            }}>
                {user?.firstName}
            </Text>
        </View>
    );
}
