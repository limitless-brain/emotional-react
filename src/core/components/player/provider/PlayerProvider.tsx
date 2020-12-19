import React, {createContext, useContext, useEffect, useState} from 'react';
import ReactPlayer from "react-player";


interface IPlayerProvider {
    state: IPlayerState,
    player: ReactPlayer | null,
    load: (url: string) => void,
    handlePlayPause: Function,
    handlePlay: () => void,
    handlePause: () => void,
    handleStop: () => void,
    handleTogglePip: Function,
    handleEnablePip: () => void,
    handleDisablePip: () => void,
    handleDuration: (duration: number) => void,
    handleClickFullscreen: Function,
    handleEnded: () => void,
    handleSeekChange: Function,
    handleSeekMouseDown: Function,
    handleSeekMouseUp: Function,
    handleProgress: (state: IPlayerState) => void,
    handleSetPlaybackRate: Function,
    handleToggleControls: Function,
    handleToggleLoop: Function,
    handleToggleMuted: Function,
    handleToggleLight: Function,
    handleVolumeChange: Function
}

interface IPlayerState {
    url: string,
    pip: boolean,
    playing: boolean,
    controls: boolean,
    light: boolean,
    volume: number,
    muted: boolean,
    played: number,
    playedSeconds: number,
    loaded: number,
    loadedSeconds: number
    duration: number,
    playbackRate: number,
    loop: boolean,
    seeking: boolean
}

const DEFAULT_STATE: IPlayerState = {
    loadedSeconds: 0,
    playedSeconds: 0,
    controls: false,
    duration: 0,
    light: false,
    loaded: 0,
    loop: false,
    muted: false,
    pip: false,
    playbackRate: 1.0,
    played: 0,
    playing: true,
    volume: 0.8,
    url: '',
    seeking: false
}

const playerContext = createContext({} as IPlayerProvider)

function usePlayerProvider() {

    const [state, setState] = useState(DEFAULT_STATE)

    let player: ReactPlayer | null = null

    const load = (url: string) => {
        setState({
            url,
            playing: true,
            played: 0,
            loaded: 0,
            pip: false
        } as IPlayerState)
    }

    const handlePlayPause = () => {
        state.playing = !state.playing
        setState(state)
    }

    const handleStop = () => {
        state.url = ''
        state.playing = false
        setState(state)
    }

    const handleToggleControls = () => {
        const url = state.url
        state.controls = !state.controls
        state.url = ''
        setState(state)
        load(url)
    }

    const handleToggleLight = () => {
        state.light = !state.light
        setState(state)
    }

    const handleToggleLoop = () => {
        state.loop = !state.loop
        setState(state)
    }

    const handleVolumeChange = (v: number) => {
        state.volume = (v > 1) ? 1 : (v < 0) ? 0 : v
        setState(state)
    }

    const handleToggleMuted = () => {
        state.muted = !state.muted
        setState(state)
    }

    const handleTogglePip = () => {
        state.pip = !state.pip
        setState(state)
    }

    const handleSetPlaybackRate = (r: number) => {
        state.playbackRate = r
        setState(state)
    }

    const handlePlay = () => {
        state.playing = true
        setState(state)
    }

    const handleEnablePip = () => {
        state.pip = true
        setState(state)
    }

    const handleDisablePip = () => {
        state.pip = false
        setState(state)
    }

    const handlePause = () => {
        state.playing = false
        setState(state)
    }

    const handleSeekMouseDown = (event: React.MouseEvent) => {
        state.seeking = true
        setState(state)
    }

    const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        state.played = parseFloat(event.target.value)
        setState(state)
    }

    const handleSeekMouseUp = (event: React.MouseEvent) => {
        state.seeking = false
        player!.seekTo(parseFloat((event.target as HTMLInputElement).value))
        setState(state)
    }

    const handleProgress = (s: IPlayerState) => {
        // if (!state.seeking)
        //     setState(s)
        console.log('called')
    }

    const handleEnded = () => {
        state.playing = state.loop
        setState(state)
    }

    const handleDuration = (duration: number) => {
        state.duration = duration
        setState(state)
    }

    const handleClickFullscreen = () => {
        // todo add full screen functionality
    }

    useEffect(() => {
        console.log('action received')
    })

    return {
        state,
        player,
        load,
        handlePlayPause,
        handlePlay,
        handlePause,
        handleStop,
        handleTogglePip,
        handleEnablePip,
        handleDisablePip,
        handleDuration,
        handleClickFullscreen,
        handleEnded,
        handleSeekChange,
        handleSeekMouseDown,
        handleSeekMouseUp,
        handleProgress,
        handleSetPlaybackRate,
        handleToggleControls,
        handleToggleLoop,
        handleToggleMuted,
        handleToggleLight,
        handleVolumeChange
    }
}

export function usePlayer() {
    return useContext(playerContext)
}

export const PlayerProvider: React.FC = ({children}) => {
    const player = usePlayerProvider()

    return (<playerContext.Provider value={player}>{children}</playerContext.Provider>)
}