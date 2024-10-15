import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetFavList } from "../../Shared/Shared";
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from '../../components/Home/PetListItem';

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("User loaded:", user?.primaryEmailAddress?.emailAddress);
      GetFavPetIds();
    }
  }, [user]);

  const GetFavPetIds = async () => {
    setLoader(true);
    try {
      const result = await GetFavList(user);
      console.log("Fetched favorite list:", result);

      const favorites = Array.isArray(result?.favorites) ? result.favorites : [];
      console.log("Parsed favorite IDs:", favorites);

      setFavIds(favorites);
      setLoader(false);

      if (favorites.length > 0) {
        GetFavPetList(favorites);
      } else {
        setFavPetList([]);
      }
    } catch (error) {
      console.error("Error fetching favorite pet IDs:", error);
      setLoader(false);
    }
  };

  const GetFavPetList = async (favIds) => {
    setLoader(true);
    setFavPetList([]);

    if (favIds.length > 0) {
      console.log("Fetching pets for fav IDs:", favIds);

      const q = query(collection(db, 'Pets'), where('id', 'in', favIds));
      const querySnapShot = await getDocs(q);

      const petList = [];
      querySnapShot.forEach((doc) => {
        petList.push({ id: doc.id, ...doc.data() });
      });

      setFavPetList(petList);
    } else {
      console.log("Favorite IDs list is empty, skipping pet query.");
    }

    setLoader(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>

      <FlatList
        data={favPetList}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <PetListItem pet={item} />
          </View>
        )}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontFamily: 'outfit-medium',
    fontSize: 26,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
