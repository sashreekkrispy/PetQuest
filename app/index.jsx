
import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";
import LoginScreen from './Login/LoginPage';
import { useUser } from "@clerk/clerk-expo";

export default function Index() {

  const {user}=useUser();





 
  return (
    <View style={{flex:1}}>


      {user?
      <Redirect href={'/(tabs)/home'} />
    :<Redirect href={'/Login/LoginPage'}/>}

      
     
    </View>
  );
}
