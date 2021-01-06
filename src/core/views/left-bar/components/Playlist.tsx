import React, {useRef, useState} from 'react';
import {Divider, Menu, MenuItem} from "@material-ui/core";
import {SelectableFullWidthButton} from "../../button/CustomButton";

const Playlist: React.FC = () => {

    const playlistMenuRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false)

    const [selected, setSelected] = useState('')

    return (
        <div id='playlist-view' className="w-full">
            <div
                onClick={() => setShowMenu(true)}
                ref={playlistMenuRef}
                className="group cursor-pointer w-full h-12 px-4 flex flex-row-reverse justify-between items-center text-text-primary hover:bg-action-hover">
                        <span className="inline-block align-middle group-hover:text-action-active">
                            <i className="fa fa-plus"/>
                        </span>
                <span
                    className="select-none font-medium text-xl uppercase align-bottom group-hover:text-action-active">
                            playlists
                        </span>
            </div>
            <Menu open={showMenu}
                  onClose={() => setShowMenu(false)}
                  classes={{
                      paper: 'bg-bg-secondary',
                      list: 'bg-bg-secondary'
                  }}
                  anchorOrigin={{
                      horizontal: "right",
                      vertical: "center"
                  }}
                  anchorEl={playlistMenuRef.current}>
                <MenuItem>Hello</MenuItem>
            </Menu>
            <Divider/>
            <div className="w-full flex flex-col text-text-primary">
                <SelectableFullWidthButton id='playlist-favorite' label='favorite' icon='fa-heart' selectedId={selected} onClick={(id => setSelected(id))}/>
                <SelectableFullWidthButton id='playlist-recent' label='recent' icon='fa-history' selectedId={selected} onClick={(id => setSelected(id))}/>
            </div>
        </div>
    );
}

export default Playlist;