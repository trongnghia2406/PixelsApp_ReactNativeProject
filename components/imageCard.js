import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react';
import { getImageSize } from '../helpers/common';
import { theme } from '../constants/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Image } from 'expo-image';

const ImageCard = ({ item, index, columns, router }) => {

    const isLastInRow = () => {
        return (index + 1) % columns === 0;
    }

    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = item;
        return { height: getImageSize(height, width) };
    }
    return (
        <Pressable onPress={() => router.push({ pathname: 'home/image', params: { ...item } })} style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
            {/* <Image
                style={styles.image}
                source={item?.webformatURL}
                transition={100}
            /> */}
            <Image style={[styles.image, getImageHeight()]} source={{ uri: item?.webformatURL }} />
        </Pressable>
    )
}
const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%',

    },
    imageWrapper: {
        backgroundColor: theme.colors.grayBG,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        overflow: 'hidden',
        marginBottom: wp(2)
    },
    spacing: {
        marginRight: wp(2)
    }
})
export default ImageCard
