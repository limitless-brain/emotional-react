import {themes} from "./index";

/**
 * Theme blueprint
 */
export interface ITheme {
    [key: string]: string
}

/**
 * Themes blueprint
 */
export interface IThemes {
    [key: string]: ITheme
}

/**
 * Theme mapping blueprint
 */
export interface IMappedTheme {
    [key: string]: string | null
}

/**
 * The method that maps theme elements to css variables
 * @param variables
 */
export const mapTheme = (variables: ITheme): IMappedTheme => {

    // return object with mapped theme
    return {
        '--color-primary': variables.primary || '',
        '--color-primary-dark': variables.primaryDark || '',
        '--color-primary-light': variables.primaryLight || '',
        '--color-secondary': variables.secondary || '',
        '--color-secondary-dark': variables.secondaryDark || '',
        '--color-secondary-light': variables.secondaryLight || '',
        '--color-bg-primary': variables.backgroundPrimary || '',
        '--color-bg-secondary': variables.backgroundSecondary || '',
        '--color-action-active': variables.actionActive || '',
        '--color-action-hover': variables.actionHover || '',
        '--color-action-selected': variables.actionSelected || '',
        '--color-action-disabled': variables.actionDisabled || '',
        '--color-action-disabled-background': variables.actionDisabledBackground || '',
        '--color-text-primary': variables.textPrimary || '',
        '--color-text-secondary': variables.textSecondary || '',
        '--color-text-emotion': variables.textEmotion || '',
        '--color-text-disabled': variables.textDisabled || '',
    }
}

/**
 * The method that applies theme to ui
 * @param theme
 */
export const applyTheme = (theme: string): void => {
    // mapping theme
    const themeObject: IMappedTheme = mapTheme(themes[theme])
    // if null
    if (!themeObject)
        // return
        return
    // get the root element of the document
    const root = document.documentElement

    // loop through themeObject property
    Object.keys(themeObject).forEach((property) => {
        // pass name property
        if (property === 'name') {
            return
        }

        // add style to the root element
        root.style.setProperty(property, themeObject[property])
    })
}

/**
 * The method that extend an existing theme
 *
 * @param extending
 * @param newTheme
 */
export const extend = (extending: ITheme, newTheme: ITheme): ITheme => {
    return {...extending, ...newTheme}
}