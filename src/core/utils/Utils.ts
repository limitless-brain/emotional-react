import React from "react";
import {makeStyles} from "@material-ui/core";

/**
 * the method that handle change event for html input
 * @param event
 * @param obj
 * @param setObj
 */
export function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement>, obj: any, setObj: Function): void {
    obj[event.target.name] = event.target.value
    setObj(obj)
}

/**
 * the method that handle check event for html input
 * @param event
 * @param obj
 * @param setObj
 */
export function handleInputOnCheck(event: React.ChangeEvent<HTMLInputElement>, obj: any, setObj: Function): void {
    obj[event.target.name] = event.target.checked
}

export function toRad(a: Number): Number {
    return (a.valueOf() * Math.PI) / 180
}

export function getCircumferenceX(rad: Number, theta: Number): Number {
    return rad.valueOf() * Math.cos(theta.valueOf())
}

export function getCircumferenceY(rad: Number, theta: Number): Number {
    return rad.valueOf() * Math.sin(theta.valueOf())
}

export function getYoutubeVideoId(url: string): string {
    return url.substring(url.indexOf('=') + 1)
}

export function format(seconds: number): string {

    const date = new Date(seconds * 1000)

    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes().toString().padStart(2,'0')
    const ss = date.getUTCSeconds().toString().padStart(2,'0')

    if (hh) {
        return `${hh.toString().padStart(2,'0')}:${mm}:${ss}`
    }

    return `${mm}:${ss}`
}

/**
 * Default tailwind button style
 */
export const BUTTON_TAILWIND_STYLE = "h-12 w-12 outline-none focus:outline-none bg-action-active hover:bg-action-hover text-text-primary shadow transition-all duration-500"

/**
 * Default style for slider
 *
 */
export const sliderUseStyles = makeStyles({
    root: {
        color: 'var(--color-text-primary)'
    },
})

/**
 * Default style for paper
 *
 */
export const paperUseStyles = makeStyles({
    root: {
        'background-color': 'var(--color-bg-secondary)',
    },
})

/**
 * Volume style for slider
 *
 */
export const volumeSliderUseStyles = makeStyles({
    root: {
        color: 'var(--color-text-primary)',
        width: 'w-12'
    },
})

export function isEmpty(str: string): boolean {
    return (!str || 0 === str.length)
}