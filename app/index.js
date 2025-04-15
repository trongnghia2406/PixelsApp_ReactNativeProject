import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FadeInDown } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';


const WelcomeScreen = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={require('../assets/images/blossom.jpg')}
                style={styles.bgImage}
                resizeMode='cover'
            />
            {/* linear gradient */}
            <Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'white', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                >
                </LinearGradient>
                {/* content */}
                <View style={styles.contentContainer}>
                    {/* use animated text to use animation, text can't apply animation */}
                    <Animated.Text
                        entering={FadeInDown.delay(400).springify()}
                        style={styles.title}>
                        Pixels
                    </Animated.Text>
                    <Animated.Text
                        entering={FadeInDown.delay(500).springify()}
                        style={styles.punchline}>
                        Every Pixel Tell a story
                    </Animated.Text>
                    <Animated.View
                        entering={FadeInDown.delay(600).springify()}
                    >
                        <Pressable onPress={() => router.push('home')} style={styles.startButton}>
                            <Text style={styles.startText}>Start Explore</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </Animated.View >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        width: wp(100),
        height: hp(100),
        position: 'absolute'
    },
    gradient: {
        width: wp(100),
        height: hp(65),
        bottom: 0,
        position: 'absolute'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 14,
    },
    title: {
        fontSize: hp(7),
        color: theme.colors.neutral(0.9),
        fontWeight: theme.fontWeights.bold
    },
    punchline: {
        fontSize: hp(2),
        letterSpacing: 1,
        marginBottom: 10,
        fontWeight: theme.fontWeights.medium
    },
    startButton: {
        marginBottom: 50,
        backgroundColor: theme.colors.neutral(0.9),
        padding: 15,
        paddingHorizontal: 90,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous'
    },
    startText: {
        color: theme.colors.white,
        fontSize: hp(3),
        fontWeight: theme.fontWeights.medium,
        letterSpacing: 1
    }
});
export default WelcomeScreen;