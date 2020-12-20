import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {usePlayer} from "./provider/PlayerProvider";
import Duration from "./components/Duration";
import {makeStyles, Slider} from "@material-ui/core";
import {useNotification} from "../notification/provider/NotificationProvider";

const PlayerControl: React.FC = () => {

    const player = usePlayer()

    return (
        <div className="inline-flex" role="group">
            <button
                className="h-12 w-12 outline-none focus:outline-none text-text-primary rounded-tl-2xl shadow transform hover:bg-primary transition-all duration-500">
                <i className="fa fa-backward"/>
            </button>
            <button
                onClick={() => {
                    player.handlePlayPause()
                }}
                className="h-12 w-12 outline-none focus:outline-none text-text-primary shadow transform hover:bg-primary transition-all duration-500">
                <i className={`fa ${!player.state.playing ? 'fa-play' : 'fa-pause'}`}/>
            </button>
            <button
                className="h-12 w-12 outline-none focus:outline-none text-text-primary shadow transform hover:bg-primary transition-all duration-500">
                <i className="fa fa-forward"/>
            </button>
        </div>
    )
}

function Player() {

    const player = usePlayer()

    const [showVideo, setShowVideo] = useState(false)

    const [progress, setProgress] = useState<number | number[]>(0)

    const [isDragging, setIsDragging] = useState(false)

    const nProvider = useNotification()

    const useStyles = makeStyles({
        root: {
            height: 2,
        },
        label: {
            textTransform: 'capitalize',
        },
    })

    const classes = useStyles()

    const handleOnChangeCommitted = (event: any, newValue: number | number[]) => {
        setProgress(newValue)
        player.player?.seekTo(progress as number)
        setIsDragging(false)
    }

    useEffect(() => {
        if (!isDragging) {
            setProgress(player.progress.playedSeconds)
        }
    }, [isDragging, player.progress.playedSeconds])

    return (
        <div
            className="w-full fixed flex flex-row justify-between items-center h-12 bottom-0 bg-bg-secondary rounded-t-2xl shadow-inverse transition-all duration-500">
            <PlayerControl/>
            <div className="flex flex-grow h-12 space-x-2 md:space-x-8 justify-center items-center mx-2 md:mx-8">
                <Duration seconds={player.progress.playedSeconds}/>
                <Slider
                    classes={{
                        root: classes.root
                    }}
                    onMouseDown={() => setIsDragging(true)}
                    onChange={handleOnChangeCommitted}
                    value={progress}
                    min={0}
                    max={player.state.duration}/>
                <Duration seconds={player.state.duration}/>
            </div>
            <div className="flex flex-row justify-center items-center">
                <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="h-12 w-12 outline-none focus:outline-none text-text-primary rounded-tr-2xl shadow transform hover:bg-primary transition-all duration-500">
                    <i className={`fa ${!showVideo ? 'fa-video' : 'fa-video-slash'}`}/>
                </button>
            </div>
            <div
                className={`absolute ${!showVideo ? 'hidden' : ''} w-96 h-96 bottom-14 right-2 transition-all duration-500`}>
                <ReactPlayer
                    ref={(p) => {
                        player.player = p
                    }}
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
                            nProvider.notify({
                                message: "Can't play the video, it's playable from youtube only.",
                                severity: "warning"
                            })
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