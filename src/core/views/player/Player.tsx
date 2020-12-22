import React, {useState} from 'react';
import ReactPlayer from "react-player";
import {usePlayer} from "./provider/PlayerProvider";
import Duration from "./components/Duration";
import {makeStyles, Slider} from "@material-ui/core";
import {useNotification} from "../notification/provider/NotificationProvider";
import PlayerLeftSection from "./components/PlayerLeftSection";
import PlayerRightSection from "./components/PlayerRightSection";
import {sliderUseStyles} from "../../utils/Utils";

function Player() {

    const player = usePlayer()

    const [showVideo, setShowVideo] = useState(false)

    const nProvider = useNotification()

    const classes = sliderUseStyles()

    console.log(sliderUseStyles)

    return (
        <div
            className="w-full fixed flex flex-row justify-between items-center h-12 bottom-0 bg-bg-secondary rounded-t-2xl shadow-inverse transition-all duration-500">
            <PlayerLeftSection/>
            <div className="flex flex-grow h-12 justify-between items-center">
                <Duration seconds={player.progress.playedSeconds}/>
                <div className="sm:w-full h-full absolute px-8 left-12 right-12 bottom-12 sm:bottom-0 sm:left-0 sm:right-0 sm:relative flex flex-col justify-center items-center">
                    <div className="absolute sm:hidden bg-bg-secondary w-full h-full shadow-inverse rounded-t-2xl"/>
                    <Slider
                    classes={{
                        root: classes.root + ' transition-all duration-500',
                        thumb: 'transition-color duration-500'
                    }}
                    onMouseDown={player.handleSeekMouseDown}
                    onChange={player.handleSeekChange}
                    onTouchEnd={player.handleSeekMouseUp}
                    onMouseUp={player.handleSeekMouseUp}
                    value={player.progress.playedSeconds}
                    min={0}
                    max={player.state.duration}
                />
                </div>
                <Duration seconds={player.state.duration}/>
            </div>
            <PlayerRightSection showVideo={showVideo} setShowVideo={setShowVideo}/>
            <div
                className={`absolute ${!showVideo ? 'hidden' : ''} sm:w-96 h-96 bg-primary shadow rounded-2xl p-4 bottom-28 sm:bottom-14 right-2 left-2 sm:left-auto transition-all duration-500`}>
                <ReactPlayer
                    style={{
                        borderRadius: '1rem'
                    }}
                    ref={player.setPlayer}
                    playing={player.state.playing}
                    width="100%"
                    height="100%"
                    url={player.state.url}
                    pip={player.state.pip}
                    controls={player.state.controls}
                    light={player.state.light}
                    loop={player.state.loop}
                    playbackRate={player.state.playbackRate}
                    volume={player.state.volume}
                    muted={player.state.muted}
                    onReady={() => {
                        console.log(player.state.url)
                    }}
                    onStart={() => {
                        console.log(`onStart ${player.state}`)
                    }}
                    onPlay={player.handlePlay}
                    onEnablePIP={player.handleEnablePip}
                    onDisablePIP={player.handleDisablePip}
                    onPause={player.handlePause}
                    onBuffer={() => {
                        console.log(`onBuffer ${player.state}`)
                    }}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={player.handleEnded}
                    onError={e => {
                        if (e === 150) {
                            nProvider.notify("Can't play the video, it's playable from youtube only.",
                                "warning"
                            )
                        }
                    }}
                    onProgress={player.handleProgress}
                    onDuration={player.handleDuration}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: true,
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Player;