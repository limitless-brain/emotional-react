import React, {createContext, useContext, useEffect, useState} from 'react';
import ReactPlayer from "react-player";


interface IPlayerProvider {
    state: IPlayerState,
    progress: IProgressState,
    player: ReactPlayer | null,
    load: (url: string) => void,
    handlePlayPause: () => void,
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
    handleProgress: (state: IProgressState) => void,
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
    duration: number,
    playbackRate: number,
    loop: boolean,
    seeking: boolean
}

interface IProgressState {
    played: number,
    playedSeconds: number,
    loaded: number,
    loadedSeconds: number
}

const DEFAULT_STATE: IPlayerState = {
    controls: false,
    duration: 0,
    light: false,
    loop: false,
    muted: false,
    pip: false,
    playbackRate: 1.0,
    playing: false,
    volume: 0.8,
    url: '',
    seeking: false
}

const playerContext = createContext({} as IPlayerProvider)

function usePlayerProvider() {

    const [state, setState] = useState(DEFAULT_STATE)

    const [progress, setProgress] = useState({} as IProgressState)

    const [refresh, setRefresh] = useState(false)

    let player: ReactPlayer | null = null

    const load = (url: string) => {
        state.url = url
        state.playing = true
        state.pip = false

        setProgress({} as IProgressState)

        setState(state)

        setRefresh(!refresh)
    }

    const handlePlayPause = () => {
        state.playing = !state.playing
        setState(state)
        setRefresh(!refresh)
    }

    const handleStop = () => {
        state.url = ''
        state.playing = false
        setState(state)
        setRefresh(!refresh)
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
        setRefresh(!refresh)
    }

    const handleToggleLoop = () => {
        state.loop = !state.loop
        setState(state)
        setRefresh(!refresh)
    }

    const handleVolumeChange = (v: number) => {
        state.volume = (v > 1) ? 1 : (v < 0) ? 0 : v
        setState(state)
        setRefresh(!refresh)
    }

    const handleToggleMuted = () => {
        state.muted = !state.muted
        setState(state)
        setRefresh(!refresh)
    }

    const handleTogglePip = () => {
        state.pip = !state.pip
        setState(state)
        setRefresh(!refresh)
    }

    const handleSetPlaybackRate = (r: number) => {
        state.playbackRate = r
        setState(state)
        setRefresh(!refresh)
    }

    const handlePlay = () => {
        state.playing = true
        setState(state)
        setRefresh(!refresh)
    }

    const handleEnablePip = () => {
        state.pip = true
        setState(state)
        setRefresh(!refresh)
    }

    const handleDisablePip = () => {
        state.pip = false
        setState(state)
        setRefresh(!refresh)
    }

    const handlePause = () => {
        state.playing = false
        setState(state)
        setRefresh(!refresh)
    }

    const handleSeekMouseDown = (event: React.MouseEvent) => {
        state.seeking = true
        setState(state)
        setRefresh(!refresh)
    }

    const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        progress.played = parseFloat(event.target.value)
        setState(state)
        setRefresh(!refresh)
    }

    const handleSeekMouseUp = (event: React.MouseEvent) => {
        state.seeking = false
        player!.seekTo(parseFloat((event.target as HTMLInputElement).value))
        setState(state)
        setRefresh(!refresh)
    }

    const handleProgress = (s: IProgressState) => {
        if (!state.seeking)
            setProgress(s)
        setRefresh(!refresh)
    }

    const handleEnded = () => {
        state.playing = state.loop
        progress.playedSeconds = state.duration
        console.log('ended')
        setState(state)
        setProgress(progress)
        setRefresh(!refresh)
    }

    const handleDuration = (duration: number) => {
        state.duration = duration
        setState(state)
        setRefresh(!refresh)
    }

    const handleClickFullscreen = () => {
        // todo add full screen functionality
    }

    useEffect(() => {
    },[refresh])

    return {
        state,
        progress,
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