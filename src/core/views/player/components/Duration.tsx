import React from 'react';
import {format} from "../../../utils/Utils";

/**
 * Duration component used to display track length and progress
 *
 * @param props
 * @constructor
 */
const Duration: React.FC<{ seconds: number, className?: string }> = (props) => {

    // seconds to be displayed
    let seconds = 0
    if (props.seconds>0)
        // take it from props
        seconds = props.seconds

    // style classes
    let classes = props.className
    if(!classes) {
        // add unselectable if not defined
        classes = "select-none"
    }

    // return component design
    return (
        <time dateTime={`P${Math.round(seconds)}S`} className={`h-full flex flex-grow justify-center text-text-primary items-center px-2 shadow ${classes}`}>
            {format(seconds)}
        </time >
    );
}

export default Duration;