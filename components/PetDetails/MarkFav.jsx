import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GetFavList, UpdateFav } from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({ pet }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    try {
      const result = await GetFavList(user);
      console.log("Favorite List Response:", result);

      const favorites = Array.isArray(result?.favorites) ? result.favorites : [];
      setFavList(favorites);
    } catch (error) {
      console.error("Error fetching favorite list:", error);
      setFavList([]);
    }
  };

  const AddToFav = async () => {
    try {
      const favResult = [...favList];
      if (!favResult.includes(pet.id)) {
        favResult.push(pet.id);
      }
      await UpdateFav(user, favResult);
      GetFav();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const RemoveFromFav = async () => {
    try {
      const favResult = favList.filter(item => item !== pet.id);
      await UpdateFav(user, favResult);
      GetFav();
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={RemoveFromFav}>
          <AntDesign name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <AntDesign name="hearto" size={30} color="black" />
        </Pressable>
      )}
    </View>
  );
}
