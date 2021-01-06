import React from "react";
import {usePlayer} from "../../../providers/PlayerProvider";
import {BUTTON_TAILWIND_STYLE} from "../../../utils/Utils";
import {useNotification} from "../../../providers/NotificationProvider";

const PlayerLeftSection: React.FC = () => {

    // player hook provider
    const player = usePlayer()

    // notification hook provider
    const nProvider = useNotification()

    // handle on play click
    const onPLayClick = () => {
        // if there is a url
        if (player.state.url && player.state.url.length > 0)
            // switch play state
            player.handlePlayPause()
        else
            // notify the user
            nProvider.notify('There is no track to play', "info")
    }

    // handle on previous click
    const onPreviousClick = () => {
        // check if there is a previous track
        if (false) {
            // play previous track
        } else {
            // notify the user
            nProvider.notify('There is no previous track', "info")
        }
    }

    // handle on next click
    const onNextClick = () => {
        // check if there is a next track
        if (false) {
            // play next track
        } else {
            // notify the user
            nProvider.notify('There is no next track', "info")
        }
    }

    return (
        <div className="inline-flex" role="group">
            <button
                onClick={onPreviousClick}
                className={`${BUTTON_TAILWIND_STYLE} rounded-tl-2xl`}>
                <i className="w-12 fa fa-backward transition-all duration-500"/>
            </button>
            <button
                onClick={onPLayClick}
                className={BUTTON_TAILWIND_STYLE}>
                <i className={`w-12 fa ${!player.state.playing ? 'fa-play' : 'fa-pause'} transition-all duration-500`}/>
            </button>
            <button
                onClick={onNextClick}
                className={BUTTON_TAILWIND_STYLE}>
                <i className="w-12 fa fa-forward transition-all duration-500"/>
            </button>
        </div>
    )
}

export default PlayerLeftSection