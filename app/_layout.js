import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeContextProvider } from '../hooks/useTheme';

const Layout = () => {
    return (
        <ThemeContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <Stack>
                        <Stack.Screen
                            name='index'
                            options={{
                                headerShown: false
                            }} />
                        <Stack.Screen name="welcome" options={{ headerShown: false }} />
                        <Stack.Screen
                            name='home/index'
                            options={{
                                headerShown: false
                            }} />
                        <Stack.Screen
                            name='home/image'
                            options={{
                                headerShown: false,
                                presentation: 'transparentModal',
                                animation: 'fade'
                            }} />
                    </Stack>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeContextProvider>
    )
}

export default Layout