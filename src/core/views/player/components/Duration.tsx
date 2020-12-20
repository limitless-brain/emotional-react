import React from 'react';
import {format} from "../../../utils/Utils";

const Duration: React.FC<{ seconds: number, className?: string }> = (props) => {

    let seconds = 0
    if (props.seconds>0)
        seconds = props.seconds

    return (
        <time dateTime={`P${Math.round(seconds)}S`} className={props.className}>
            {format(seconds)}
        </time>
    );
}

export default Duration;