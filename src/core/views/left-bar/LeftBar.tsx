import React, {useRef, useState} from 'react';
import {Divider, Drawer} from "@material-ui/core";
import {BUTTON_TAILWIND_STYLE, paperUseStyles} from "../../utils/Utils";
import Navigation from "./components/Navigation";
import Playlist from "./components/Playlist";

const LeftBar: React.FC = () => {

    const [showLeftBar, setShowLeftBar] = useState(false)

    const paperClasses = paperUseStyles()

    const rootRef = useRef(null)

    return (
        <div
            ref={rootRef}
            className="fixed left-0 flex flex-col justify-center items-center">
            <button
                onClick={() => setShowLeftBar(true)}
                className={`${BUTTON_TAILWIND_STYLE} rounded-r-2xl`}>
                <i className="w-12 fa fa-list"/>
            </button>
            <React.Fragment key={'left'}>
                <Drawer
                    PaperProps={{
                        classes: {root: paperClasses.root}
                    }}
                    anchor={"left"} open={showLeftBar} onClose={() => setShowLeftBar(false)}>
                    <div
                        className="h-full w-80">
                        <div
                            onClick={() => setShowLeftBar(false)}
                            className="group cursor-pointer w-full h-12 px-4 flex flex-row-reverse justify-between items-center text-text-primary hover:bg-action-hover">
                        <span className="inline-block text-2xl align-middle group-hover:text-action-active">
                            <i className="fa fa-angle-left"/>
                        </span>
                            <span
                                className="select-none font-medium text-xl uppercase align-bottom group-hover:text-action-active">
                            your music
                        </span>
                        </div>
                        <Divider/>
                        <Navigation/>
                        <Divider/>
                        <Playlist/>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default LeftBar;