import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import UserItem from '../../components/Inbox/UserItem';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, 'Chat'),
      where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setUserList(prevList => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  const MapOtherUserList = () => {
    return userList.map(record => {
      const otherUser = record.users?.find(u => u.email !== user?.primaryEmailAddress?.emailAddress);
      return {
        docId: record.id,
        ...otherUser,
      };
    }).filter(Boolean); // Filter out undefined results
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>

      {loader ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          onRefresh={GetUserList}
          refreshing={loader}
          style={styles.list}
          data={MapOtherUserList()}
          renderItem={({ item }) => (
            <UserItem userInfo={item} />
          )}
          keyExtractor={(item) => item.docId} 
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff', // Clean background color
  },
  title: {
    fontFamily: 'outfit-medium',
    fontSize: 30,
    marginBottom: 15, // Space below the title
  },
  list: {
    marginTop: 10,
  },
  separator: {
    height: 10, // Space between items
    backgroundColor: 'transparent',
  },
  loader: {
    marginTop: 20,
  },
});
