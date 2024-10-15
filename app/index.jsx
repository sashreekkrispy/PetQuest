import { Redirect } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { isLoaded, user } = useUser(); // Add isLoaded to check if data is ready

  console.log('User Data initial:', user);

  if (!isLoaded) {
    // Show a loading indicator while waiting for user data
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex:1  }}>
      {user ? (
        <Redirect href={'/(tabs)/home'} />
      ) : (
        <Redirect href={'/Login/LoginPage'} />
        //<Redirect href={'/(tabs)/home'} />
        
      )}
    </View>
  );
}
