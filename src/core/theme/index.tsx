import {applyTheme, IThemes} from "./utils";
import base from "./base";
import dark from "./dark";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";

/**
 * Theme context state blueprint
 *
 */
interface IThemeContext {
    name: string
    switchTheme: Function
}


/**
 * Theme context that hold context state
 *
 */
const themeContext = createContext({} as IThemeContext)

/**
 * The method that create theme provider object
 *
 */
function useThemeProvider() {
    // current theme state
    const [theme, setTheme] = useState(DEFAULT_THEME)

    /**
     * The method that change the current theme
     *
     * @param newTheme
     */
    const switchTheme = (newTheme: string) => {
        // store theme
        setTheme(newTheme)
        // apply it
        applyTheme(newTheme)
    }

    // return theme provider object
    return {
        name: theme,
        switchTheme
    }
}

// default theme
export const DEFAULT_THEME = 'base'
// dark theme
export const DARK_THEME = 'dark'

/**
 * Themes blueprint
 *
 */
export const themes: IThemes = {
    base,
    dark
}

/**
 * The method that provide theme hook
 */
export function useTheme() {
    return useContext(themeContext)
}

/**
 * Theme provider component
 *
 * @param children components that are able to consume theme hook
 * @constructor
 */
export const ThemeProvider: React.FC = ({children}) => {

    // theme provider state object
    const theme = useThemeProvider()

    // return component design
    return (<themeContext.Provider value={theme}>{children}</themeContext.Provider>)
}