import React, {useState} from 'react';
import {Drawer, makeStyles, Slide} from "@material-ui/core";
import {BUTTON_TAILWIND_STYLE, paperUseStyles} from "../../utils/Utils";

function LeftBar() {

    const [showPlaylist, setShowPlaylist] = useState(false)

    const paperClasses = paperUseStyles()

    return (
        <div className="z-50 h-full fixed left-0 flex flex-row justify-center items-center">
            <Drawer
                PaperProps={{
                    classes: {root: paperClasses.root}
                }}
                anchor={"left"} open={showPlaylist} onClose={() => setShowPlaylist(false)}>
                    <div
                        className="h-full w-80">
                        left bar
                    </div>
            </Drawer>
            <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`${BUTTON_TAILWIND_STYLE} rounded-r-2xl`}>
                <i className="w-12 fa fa-list"/>
            </button>
        </div>
    );
}

export default LeftBar;