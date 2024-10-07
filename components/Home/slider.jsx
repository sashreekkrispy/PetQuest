import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'

export default function Slider() {

    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        GetSliders();
    }, []);

    const GetSliders = async () => {
        setSliderList([]);
        const snapshot = await getDocs(collection(db, 'Sliders'));
        snapshot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(sliderList => [...sliderList, doc.data()]);
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: item?.imageUrl }} style={styles.sliderImage} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,  // Adds vertical padding to the entire slider
       marginTop:-30
    },
    imageWrapper: {
        marginHorizontal: 10, // Space between images
        alignItems: 'center', // Center align images horizontally
    },
    sliderImage: {
        width: Dimensions.get('screen').width * 0.7, // Slightly smaller image width
        height: 180, // Reduced height for a balanced look
        borderRadius: 12, // More rounded corners
        resizeMode: 'cover', // Ensure the image covers the container without stretching
        overflow: 'hidden',
    }
});
