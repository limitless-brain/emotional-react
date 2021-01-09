import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import ResizeObserver from "resize-observer-polyfill";

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

/**
 * The method that extract youtube id from url
 * @param url
 */
export function getYoutubeVideoId(url: string): string {
    return url.substring(url.indexOf('=') + 1)
}

/**
 * The method that return formatted string for number of second
 * @param seconds
 */
export function format(seconds: number): string {

    const date = new Date(seconds * 1000)

    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes().toString().padStart(2, '0')
    const ss = date.getUTCSeconds().toString().padStart(2, '0')

    if (hh) {
        return `${hh.toString().padStart(2, '0')}:${mm}:${ss}`
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
        color: 'var(--color-text-primary)',
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

/**
 * The method that return true if string is empty
 * @param str
 */
export function isEmpty(str: string): boolean {
    return (!str || 0 === str.length)
}

/**
 * Resize observer hook
 * @param ref
 */
export function useResizeObserver(ref: React.RefObject<any>) {
    const [dimensions, setDimensions] = useState<any>(null)

    useEffect(() => {
        const observerTarget = ref.current
        const observer = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                setDimensions(entry.contentRect);
            })
        })

        // observe changes
        observer.observe(observerTarget)

        return () => {
            // cleaning
            observer.unobserve(observerTarget)
        }

    }, [ref])

    return dimensions
}