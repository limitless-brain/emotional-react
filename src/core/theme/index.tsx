import {applyTheme, IThemes} from "./utils";
import base from "./base";
import dark from "./dark";
import React, {createContext, useContext, useEffect, useState} from "react";

interface IThemeContext {
    name: string
    switchTheme: Function
}

const themeContext = createContext({} as IThemeContext)

function useThemeProvider() {
    const [theme, setTheme] = useState(DEFAULT_THEME)
    const switchTheme = (newTheme: string) => {
        setTheme(newTheme)
        applyTheme(theme)
    }

    useEffect(() => {
    }, [theme])

    return {
        name: theme,
        switchTheme
    }
}

export const DEFAULT_THEME = 'base'
export const DARK_THEME = 'dark'

export const themes: IThemes = {
    base,
    dark
}

export function useTheme() {
    return useContext(themeContext)
}

export const ThemeProvider: React.FC = ({children}) => {

    const theme = useThemeProvider()

    return (<themeContext.Provider value={theme}>{children}</themeContext.Provider>)
}