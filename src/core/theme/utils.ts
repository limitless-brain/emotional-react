import {themes} from "./index";

export interface ITheme {
    [key: string]: string
}

export interface IThemes {
    [key: string]: ITheme
}

export interface IMappedTheme {
    [key: string]: string | null
}

export const mapTheme = (variables: ITheme): IMappedTheme => {
    return {
        '--color-primary': variables.primary || '',
        '--color-secondary': variables.secondary || '',
        '--color-positive': variables.positive || '',
        '--color-negative': variables.negative || '',
        '--color-bg-primary': variables.backgroundPrimary || '',
        '--color-bg-secondary': variables.backgroundSecondary || '',
        '--color-text-primary': variables.textPrimary || '',
    }
}

export const applyTheme = (theme: string): void => {
    const themeObject: IMappedTheme = mapTheme(themes[theme])
    if (!themeObject)
        return
    const root = document.documentElement
    Object.keys(themeObject).forEach((property) => {
        if (property === 'name') {
            return
        }
        root.style.setProperty(property, themeObject[property])
    })
}

export const extend = (extending: ITheme, newTheme: ITheme): ITheme => {
    return {...extending, ...newTheme}
}