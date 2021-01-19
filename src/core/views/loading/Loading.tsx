import React from 'react';
import {CircularProgress} from "@material-ui/core";

const Loading = () => {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <CircularProgress variant='indeterminate'/>
        </div>
    );
}

export default Loading