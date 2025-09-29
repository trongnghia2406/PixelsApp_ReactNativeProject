import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@PixelsApp:theme';
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (storedTheme !== null) {
                    setIsDark(JSON.parse(storedTheme));
                }
            } catch (error) {
                console.error("Lỗi tải theme:", error);
            } finally {
                setIsReady(true);
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newIsDark));
        } catch (error) {
            console.error("Lỗi lưu theme:", error);
        }
    };

    const value = {
        isDark,
        toggleTheme,
        currentTheme: isDark ? 'dark' : 'light'
    };

    if (!isReady) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};