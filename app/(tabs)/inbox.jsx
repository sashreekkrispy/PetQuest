import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserItem from '../../components/Inbox/UserItem'

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
    const list = [];
    userList.forEach(record => {
      const otherUser = record.users?.filter(u => u.email !== user?.primaryEmailAddress?.emailAddress);
      const result = {
        docId: record.id,
        ...otherUser[0]
      };
      list.push(result);
    });
    return list;
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Inbox</Text>

      <FlatList
        onRefresh={GetUserList} // Pass the function reference without invoking it
        refreshing={loader}
        style={{ marginTop: 20 }}
        data={MapOtherUserList()}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
    </View>
  );
}
