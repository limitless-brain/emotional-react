import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from "react-player";
import {usePlayer} from "./provider/PlayerProvider";

const elements = <div className="inline-flex" role="group">
    <button
        className="h-12 w-12 outline-none focus:outline-none text-text-primary rounded-tl-2xl shadow transform hover:bg-primary transition-all duration-500">
        <i className="fa fa-backward"/>
    </button>
    <button
        className="h-12 w-12 outline-none focus:outline-none text-text-primary shadow transform hover:bg-primary transition-all duration-500">
        <i className="fa fa-play"/>
    </button>
    <button
        className="h-12 w-12 outline-none focus:outline-none text-text-primary shadow transform hover:bg-primary transition-all duration-500">
        <i className="fa fa-forward"/>
    </button>
</div>


function Player() {

    const player = usePlayer()

    const [showVideo,setShowVideo] = useState(false)

    return (
        <div
            className="w-full fixed flex flex-row justify-between items-center h-12 bottom-0 bg-bg-secondary rounded-t-2xl shadow-inverse transition-all duration-500">
            {elements}
            <div className="sm:block flex-grow mx-8">
                <div className="flex justify-between text-sm text-gray-600">
                    <p>0:22</p>
                    <p>Title</p>
                    <p>7:22</p>
                </div>
                <div className="my-1">
                    <div className="h-1 bg-gray-600 rounded-full">
                        <div className="w-1/5 h-1 bg-red-600 rounded-full relative">
                            <span className="absolute w-4 h-4 bg-red-600 right-0 bottom-0 -mb-1.5 rounded-full shadow"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <button
                    onClick={()=>setShowVideo(!showVideo)}
                    className="h-12 w-12 outline-none focus:outline-none text-text-primary rounded-tr-2xl shadow transform hover:bg-primary transition-all duration-500">
                    <i className={`fa ${!showVideo?'fa-video' :'fa-video-slash'}`}/>
                </button>
            </div>
            <div className={`absolute ${!showVideo?'hidden':''} w-96 h-96 bottom-14 right-2 transition-all duration-500`}>
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
                    onError={e => console.log('onError', e)}
                    onProgress={player.handleProgress}
                    onDuration={player.handleDuration}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: true,
                                origin: window.location.origin,
                                enablejsapi: 1,
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Player;