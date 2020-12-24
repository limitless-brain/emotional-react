import React, {useState} from "react";
import {BUTTON_TAILWIND_STYLE, isEmpty, paperUseStyles, volumeSliderUseStyles} from "../../../utils/Utils";
import {ClickAwayListener, Paper, Popper, Slider} from "@material-ui/core";
import {usePlayer} from "../provider/PlayerProvider";
import {useNotification} from "../../notification/provider/NotificationProvider";
import Api from "../../../api/Api";
import {BASE_URL} from "../../../config";

const PlayerRightSection: React.FC<{ showVideo: boolean, setShowVideo: (b: boolean) => void }> = (props) => {

    const player = usePlayer()

    const nProvider = useNotification()

    const [showVolume, setShowVolume] = useState(false)

    const onVolumeClick = () => {
        setShowVolume(!showVolume)
    }

    const onCaptionClick = () => {
        Api.youtube.audioFile('4uOHQ7mO-Kk')
            .then(resp => {
                console.log(resp)
            })
            .catch(error => console.log(error.response))
    }

    const sliderClasses = volumeSliderUseStyles()

    const paperClasses = paperUseStyles()

    // return component design
    return (
        <div className="flex flex-row justify-end items-center">

            <button
                onClick={onCaptionClick}
                className={`${BUTTON_TAILWIND_STYLE}`}>
                <i className="w-12 fa fa-bars"/>
            </button>
            <ClickAwayListener onClickAway={() => setShowVolume(false)}>
                <div id='volume-container'>
                    <button
                        onClick={onVolumeClick}
                        className={BUTTON_TAILWIND_STYLE}>
                        <i className={`w-12 fa ${player.state.volume > 0.5 ? 'fa-volume-up' : player.state.volume > 0 ? 'fa-volume-down' : 'fa-volume-mute'} transition-all duration-500`}/>
                    </button>
                    <Popper id='volume-control' open={showVolume}>
                        <div className="fixed bottom-14 right-12">
                            <Paper
                                classes={{
                                    root: paperClasses.root + ' transition-all duration-500'
                                }}
                                className="flex flex-col justify-center items-center h-32 w-12 px-2 py-4 transition-all duration-500">
                                <Slider
                                    classes={{
                                        root: sliderClasses.root + ' transition-all duration-500',
                                        thumb: 'transition-color duration-500'
                                    }}
                                    value={player.state.volume}
                                    onChange={player.handleVolumeChange}
                                    orientation={"vertical"}
                                    max={1.0}
                                    min={0.0}
                                    step={0.05}/>
                            </Paper>
                        </div>
                    </Popper>
                </div>
            </ClickAwayListener>
            <button
                onClick={() => {
                    if(isEmpty(player.state.url))
                        nProvider.notify('There is no video playing right now',"info")
                    else
                        props.setShowVideo(!props.showVideo)
                }}
                className={`${BUTTON_TAILWIND_STYLE} rounded-tr-2xl`}>
                <i className={`w-12 fa ${!props.showVideo ? 'fa-video' : 'fa-video-slash'} transition-all duration-500`}/>
            </button>
        </div>
    )
}

export default PlayerRightSection