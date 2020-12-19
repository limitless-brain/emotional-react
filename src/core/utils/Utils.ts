import React from "react";

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
    return (a.valueOf() * Math.PI)/180
}

export function getCircumferenceX(rad: Number,theta: Number): Number {
    return rad.valueOf() * Math.cos(theta.valueOf())
}

export function getCircumferenceY(rad: Number,theta: Number): Number {
    return rad.valueOf() * Math.sin(theta.valueOf())
}