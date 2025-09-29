import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../hooks/useTheme';
import { data } from '../constants/data'
import { theme } from '../constants/theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInRight } from 'react-native-reanimated';


const Categories = ({ activeCategory, handleChangeCategory }) => {
    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatListContainer}
            showsHorizontalScrollIndicator={false}
            data={data.categories}
            keyExtractor={item => item}
            renderItem={({ item, index }) => (
                <CategoryItem
                    isActive={activeCategory == item}
                    handleChangeCategory={handleChangeCategory}
                    title={item}
                    index={index}
                />
            )}
        />
    )
}
const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
    const { currentTheme } = useTheme();
    const colors = theme.colors[currentTheme] || theme.colors.light;
    let color = isActive ? theme.colors.white : colors.textSolid;
    let backgroundColor = isActive ? colors.activeBackground : colors.inactiveBackground;

    return (
        <Animated.View entering={FadeInRight.delay(index * 200).duration(1000).springify().damping(14)}>
            <Pressable
                onPress={() => handleChangeCategory(isActive ? null : title)}
                style={[styles.category, { backgroundColor }]}
            >
                <Text style={[styles.title, { color }]}>{title}</Text>
            </Pressable>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: wp(4),
        gap: 8
    },
    category: {
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: theme.radius.lg,
        borderCurve: 'continuous'
    },
    title: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium
    }
})


export default Categories