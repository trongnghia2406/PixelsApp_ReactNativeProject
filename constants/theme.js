import { Dimensions } from "react-native";

export const theme = {
    fontWeights: {
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    radius: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
    },

    colors: {
        white: '#fff',
        black: '#000',
        grayBG: '#e5e5e5',

        light: {
            background: '#fff',
            textTheme: '#fff',
            borderFrameActive: '#0a0a0a',
            borderFrameInActive: '#e5e5e5',
            text: (opacity) => `rgba(10, 10, 10, ${opacity})`,
            textSolid: '#0a0a0a',
            activeBackground: 'rgba(10, 10, 10, 0.8)',
            inactiveBackground: '#fff',
            borderColor: '#e5e5e5',
        },
        dark: {
            background: '#0a0a0a',
            textTheme: '#000',
            borderFrameActive: '#fff',
            borderFrameInActive: '#3a3a3a',
            text: (opacity) => `rgba(255, 255, 255, ${opacity})`,
            textSolid: '#fff',
            activeBackground: 'rgba(255, 255, 255, 0.2)',
            inactiveBackground: '#1f1f1f',
            borderColor: '#3a3a3a',
        }
    }
}