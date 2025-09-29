import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from '../hooks/useTheme';
import { BlurView } from 'expo-blur';
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated, { Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../constants/theme';
import { CommonFilter, CommonFilterRow, SectionView } from './filterViews';
import { capitalize } from 'lodash';
import { data } from '../constants/data';

const FiltersModal = ({
    modalRef,
    onClose,
    onApply,
    onReset,
    filters,
    setFilters
}) => {
    const snapPoints = useMemo(() => ['75%'], []);
    const { currentTheme } = useTheme();
    const colors = theme.colors[currentTheme] || theme.colors.light;

    const styles = StyleSheet.create({
        contentContainer: {
            flex: 1,
            alignItems: 'center',
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        content: {
            flex: 1,
            gap: 15,
            paddingVertical: 10,
            paddingHorizontal: 20
        },
        filterText: {
            fontSize: hp(4),
            fontWeight: theme.fontWeights.semibold,
            color: colors.text(0.8),
            marginBottom: 5
        },
        buttons: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        },
        applyButton: {
            flex: 1,
            backgroundColor: colors.text(0.8),
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.radius.md,
            borderCurve: 'continuous'
        },
        resetButton: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.radius.md,
            borderCurve: 'continuous',
            borderWidth: 2,
            borderColor: colors.borderColor
        },
        buttonText: {
            fontSize: hp(1.8)
        }
    })

    return (
        <BottomSheetModal
            ref={modalRef}
            backgroundStyle={{ backgroundColor: colors.background }}
            handleIndicatorStyle={{ backgroundColor: colors.borderColor }}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={CustomBackdrop}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.filterText}>Filters</Text>
                    {
                        Object.keys(sections).map((sectionName, index) => {
                            let sectionView = sections[sectionName];
                            let sectionData = data.filters[sectionName];
                            let title = capitalize(sectionName);
                            return (
                                <Animated.View
                                    entering={FadeInDown.delay((index * 100) + 100).springify().damping(11)}
                                    key={sectionName}
                                >
                                    <SectionView
                                        title={title}
                                        content={sectionView({
                                            data: sectionData,
                                            filters,
                                            setFilters,
                                            filterName: sectionName
                                        })}
                                    />
                                </Animated.View>
                            )
                        })
                    }
                    {/* action */}
                    <Animated.View
                        entering={FadeInDown.delay(500).springify().damping(11)}
                        style={styles.buttons}>
                        <Pressable style={styles.resetButton} onPress={onReset}>
                            <Text style={[styles.buttonText, { color: colors.text(0.9) }]}>Reset</Text>
                        </Pressable>
                        <Pressable style={styles.applyButton} onPress={onApply}>
                            <Text style={[styles.buttonText, { color: colors.textTheme }]}>Apply</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </BottomSheetView>
        </BottomSheetModal >
    )
}
const sections = {
    "order": (props) => <CommonFilterRow  {...props} />,
    "orientation": (props) => <CommonFilterRow  {...props} />,
    "type": (props) => <CommonFilterRow  {...props} />,
    "colors": (props) => <CommonFilter  {...props} />
}


const CustomBackdrop = ({ animatedIndex, style }) => {
    const { currentTheme } = useTheme();
    const colors = theme.colors[currentTheme] || theme.colors.light;

    const modalStyles = StyleSheet.create({
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
    })

    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
        return {
            opacity
        }
    })
    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        modalStyles.overlay,
        containerAnimatedStyle
    ]
    return (
        <Animated.View style={containerStyle}>
            {/* blur view */}
            <BlurView
                style={StyleSheet.absoluteFill}
                tint="dark"
                intensity={25}
            />
        </Animated.View>
    )
}


export default FiltersModal