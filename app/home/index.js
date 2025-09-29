import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { theme } from '../../constants/theme';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView, TextInput } from 'react-native';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import { debounce } from 'lodash';
import FiltersModal from '../../components/filtersModal';
import { useRouter } from 'expo-router';


var page = 1;
const HomeScreen = () => {
    const { isDark, toggleTheme, currentTheme } = useTheme();
    const colors = theme.colors[currentTheme] || theme.colors.light;
    const styles = getStyles(colors);
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [search, setSearch] = useState('');
    const [images, setImages] = useState([]);
    const [filters, setFilters] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const searchInputRef = useRef(null);
    const modalRef = useRef(null);
    const scrollRef = useRef(null);
    const router = useRouter();
    const [isEndReached, setIsEndReached] = useState(false);



    useEffect(() => {
        fetchImages();
    }, []);
    const fetchImages = async (params = { page: 1 }, append = true) => {
        console.log("params: ", params, append);
        let res = await apiCall(params);
        if (res.success && res?.data?.hits) {
            if (append)
                setImages([...images, ...res.data.hits])
            else
                setImages([...res.data.hits])
        }
    }

    const openFiltersModal = () => {
        modalRef?.current?.present();
    }
    const closeFiltersModal = () => {
        modalRef?.current?.close();
    }

    const applyFilters = () => {
        if (filters) {
            page = 1;
            setImages([]);
            let params = {
                page,
                ...filters
            }
            if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params, false)
        }
        closeFiltersModal();
    }

    const resetFilters = () => {
        if (filters) {
            page = 1;
            setFilters(null);
            let params = {
                page,
                ...filters
            }
            if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params, false)
        }

        closeFiltersModal();
    }

    const clearThisFilter = (filterName) => {
        let filterz = { ...filters };
        delete filterz[filterName];
        setFilters({ ...filterz });
        page = 1;
        setImages([]);
        let params = {
            page,
            ...filterz
        }
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params, false);
    }

    const handleChangeCategory = (cat) => {
        setActiveCategory(cat);
        clearSearch();
        setImages([]);
        page = 1;
        let params = {
            page,
            ...filters
        }
        if (cat) params.category = cat;
        fetchImages(params, false);
    }

    const handleSearch = (text) => {
        setSearch(text);
        if (text.length > 2) {
            // search for this text
            page = 1;
            setImages([]);
            setActiveCategory(null); // clear category when searching
            fetchImages({ page, q: text, ...filters }, false)
        }
        if (text == "") {
            // reset results
            page = 1;
            searchInputRef?.current?.clear();
            setImages([]);
            setActiveCategory(null); // clear category when searching
            fetchImages({ page, ...filters }, false)
        }
    }
    const clearSearch = () => {
        setSearch("");
        searchInputRef?.current?.clear();
    }

    const handleScroll = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
        const bottomPosition = contentHeight - scrollViewHeight;
        if (scrollOffset >= bottomPosition - 1) {
            if (!isEndReached) {
                setIsEndReached(true);
                console.log('reached the bottom of scrollview');
                // fetch more images
                ++page;
                let params = {
                    page,
                    ...filters
                }
                if (activeCategory) params.category = activeCategory;
                if (search) params.q = search;
                fetchImages(params);
            }
        } else if (isEndReached) {
            setIsEndReached(false);
        }
    }
    const handleScrollUp = () => {
        scrollRef?.current?.scrollTo({
            y: 0,
            animated: true
        })
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <View style={[styles.container, { paddingTop, backgroundColor: colors.background }]}>
            {/* header */}
            <View style={styles.header}>
                <Pressable onPress={handleScrollUp}>
                    <Text style={[styles.title, { color: colors.textSolid }]}>Pixels</Text>
                </Pressable>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <Pressable onPress={toggleTheme}>
                        <Feather
                            name={isDark ? "sun" : "moon"}
                            size={22}
                            color={colors.text(0.7)}
                        />
                    </Pressable>
                    <Pressable onPress={openFiltersModal}>
                        <FontAwesome6 name="bars-staggered" size={22} color={colors.text(0.7)} />
                    </Pressable>
                </View>
            </View>
            <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={5} // how often scroll event will fire while scrolling (in ms)
                ref={scrollRef}
                contentContainerStyle={{ gap: 15 }}
            >
                {/* search bar */}
                <View style={[styles.searchBar, {
                    borderColor: colors.grayBG,
                    backgroundColor: colors.grayBG
                }]}>
                    <View style={styles.searchIcon}>
                        <Feather name='search' size={24} color={colors.text(0.4)} />
                    </View>
                    <TextInput
                        placeholder='Search for photos....'
                        placeholderTextColor={colors.text(0.5)}
                        ref={searchInputRef}
                        onChangeText={handleTextDebounce}
                        style={[styles.searchInput, { color: colors.text(0.9) }]}
                    />
                    {
                        search && (
                            <Pressable onPress={() => handleSearch("")} style={[styles.closeIcon, { backgroundColor: colors.text(0.1) }]}>
                                <Ionicons name='close' size={24} color={colors.text(0.6)} />
                            </Pressable>
                        )
                    }
                </View>
                {/* categories */}
                <View style={styles.categories}>
                    <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                </View>
                {/* filters */}
                {
                    filters && (
                        <View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                                {
                                    Object.keys(filters).map((key, index) => {
                                        return (
                                            <View
                                                key={key}
                                                style={[styles.filterItem]}
                                            >
                                                {
                                                    key == 'colors' ? (
                                                        <View style={{
                                                            height: 20,
                                                            width: 30,
                                                            borderRadius: 7,
                                                            backgroundColor: filters[key]
                                                        }} />
                                                    ) : (
                                                        <Text style={[styles.filterItemText, { color: colors.textSolid }]}>{filters[key]}</Text>
                                                    )
                                                }
                                                <Pressable style={[styles.filterCloseIcon, { backgroundColor: colors.text(0.2) }]} onPress={() => clearThisFilter(key)}>
                                                    <Ionicons name='close' size={14} color={colors.textSolid} />
                                                </Pressable>
                                            </View>
                                        )

                                    })
                                }
                            </ScrollView>
                        </View>
                    )
                }
                {/* images masonry grid */}
                <View>
                    {
                        images.length > 0 && <ImageGrid images={images} router={router} />
                    }
                </View>
                {/* loading */}
                <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
                    <ActivityIndicator size={'large'} color={colors.textSolid} />
                </View>
            </ScrollView >
            {/* filter modal */}
            < FiltersModal
                modalRef={modalRef}
                filters={filters}
                setFilters={setFilters}
                onClose={closeFiltersModal}
                onApply={applyFilters}
                onReset={resetFilters}
            />
        </View >
    )
}

const getStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        gap: 15
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
    },
    searchBar: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg,
    },
    searchIcon: {
        padding: 8
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 10,
        fontSize: hp(1.8)
    },
    closeIcon: {
        padding: 8,
        borderRadius: theme.radius.sm
    },
    filters: {
        paddingHorizontal: wp(4),
        gap: 10
    },
    filterItem: {
        backgroundColor: colors.inactiveBackground,
        borderWidth: 1,
        borderColor: colors.borderColor,

        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.radius.xs,
        gap: 10,
        paddingHorizontal: 10,
    },
    filterItemText: {
        fontSize: hp(1.9)
    },
    filterCloseIcon: {
        padding: 4,
        borderRadius: 7
    }
});

export default HomeScreen