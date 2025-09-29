import { Pressable, StyleSheet, Text, View } from "react-native"
import { theme } from "../constants/theme"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { capitalize } from "lodash";
import { useTheme } from "../hooks/useTheme";

const getStyles = (colors) => StyleSheet.create({
    sectionContainer: {
        gap: 8
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium,
    },
    flexRowWrap: {
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    outlinedButton: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: colors.grayBG,
        borderRadius: theme.radius.xs,
        borderCurve: 'continuous'
    },
    outlinedButtonText: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium
    },
    color: {
        height: 30,
        width: 40,
        borderRadius: theme.radius.sm - 3,
        borderCurve: 'continuous'
    },
    colorWrapper: {
        padding: 3,
        borderRadius: theme.radius.sm,
        borderWidth: 2,
        borderCurve: 'continuous'
    }
});

export const SectionView = ({ title, content }) => {
    const { currentTheme } = useTheme();
    const colors = theme.colors[currentTheme] || theme.colors.light;
    const styles = getStyles(colors);
    return (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.textSolid }]}>{title}</Text>
            <View>
                {content}
            </View>
        </View>
    )
}

export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {
    const { currentTheme } = useTheme();
    const colors = theme.colors[currentTheme] || theme.colors.light;
    const styles = getStyles(colors);
    const onSelect = (item) => {
        setFilters({ ...filters, [filterName]: item })
    }
    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {
                    let isActive = filters && filters[filterName] == item;

                    const isLight = currentTheme === 'light';
                    let backgroundColor = isActive
                        ? colors.activeBackground
                        : isLight ? colors.background : colors.inactiveBackground;

                    let color = isActive
                        ? colors.textSolid
                        : isLight ? colors.textSolid : theme.colors.white;

                    if (isActive) {
                        color = theme.colors.white;
                    }
                    if (currentTheme === 'light') {
                        backgroundColor = isActive ? colors.activeBackground : colors.background;
                        color = isActive ? theme.colors.white : colors.textSolid;
                    } else {
                        backgroundColor = isActive ? colors.activeBackground : colors.inactiveBackground;
                        color = theme.colors.white;
                    }
                    return (
                        <Pressable
                            onPress={() => onSelect(item)}
                            key={item}
                            style={[styles.outlinedButton, { backgroundColor }]}
                        >
                            <Text style={[styles.outlinedButtonText, { color }]}>
                                {capitalize(item)}
                            </Text>
                        </Pressable>
                    )
                })
            }
        </View >
    )
}

export const CommonFilter = ({ data, filterName, filters, setFilters }) => {
    const { currentTheme } = useTheme();
    const colors = theme.colors[currentTheme] || theme.colors.light;
    const styles = getStyles(colors);

    const onSelect = (item) => {
        setFilters({ ...filters, [filterName]: item })
    }
    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {
                    let isActive = filters && filters[filterName] == item;
                    let borderColor = isActive ? colors.borderFrameActive : colors.borderFrameInActive;
                    return (
                        <Pressable
                            onPress={() => onSelect(item)}
                            key={item}
                        >
                            <View style={[styles.colorWrapper, { borderColor }]}>
                                <View style={[styles.color, { backgroundColor: item }]} />
                            </View>
                        </Pressable>
                    )
                })
            }
        </View >
    )
}