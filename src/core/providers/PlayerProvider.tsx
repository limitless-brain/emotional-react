import React, {createContext, useContext, useState} from 'react';
import ReactPlayer from "react-player";

/**
 * Player provider blueprint
 *
 */
interface IPlayerProvider {
    state: IPlayerState,
    progress: IProgressState,
    setPlayer: (player: ReactPlayer | null) => void,
    load: (url: string) => void,
    handlePlayPause: () => void,
    handlePlay: () => void,
    handlePause: () => void,
    handleStop: () => void,
    handleTogglePip: () => void,
    handleEnablePip: () => void,
    handleDisablePip: () => void,
    handleDuration: (duration: number) => void,
    handleClickFullscreen: () => void,
    handleEnded: () => void,
    handleSeekChange: (event: any, newValue: (number | number[])) => void,
    handleSeekMouseDown: (event: any) => void,
    handleSeekMouseUp: (event: any) => void,
    handleProgress: (state: IProgressState) => void,
    handleSetPlaybackRate: (rate: '0.5' | '1.0' | '1.25' | '1.5' | '2.0') => void,
    handleToggleControls: () => void,
    handleToggleLoop: () => void,
    handleToggleMuted: () => void,
    handleToggleLight: () => void,
    handleVolumeChange: (event: any, volume: (number | number[])) => void
}

/**
 * Player state blueprint
 *
 */
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

/**
 * Player Progress blueprint
 *
 */
interface IProgressState {
    played: number,
    playedSeconds: number,
    loaded: number,
    loadedSeconds: number
}

/**
 * Default player state object
 *
 */
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

/**
 * Player context that holds player provider state object
 *
 */
const playerContext = createContext({} as IPlayerProvider)

/**
 * The method that create player provider state object
 *
 */
function usePlayerProvider() {

    // state to hold player state
    const [state, setState] = useState(DEFAULT_STATE)

    // state to hold player progress
    const [progress, setProgress] = useState({
        playedSeconds: 0 // defined to bypass NAN (Not A Number) used in duration display
    } as IProgressState)

    // state to request hierarchy update
    const [refresh, setRefresh] = useState(false)

    // player ref to hold {ReactPlayer} component ref
    const [playerRef, setPlayerRef] = useState<ReactPlayer|null>(null)

    /**
     * The method that set react player instance
     * @param _player
     */
    const setPlayer = (_player: ReactPlayer | null) => {
        setPlayerRef(_player)
    }

    /**
     * The method that request hierarchy update after storing player state
     */
    const update = () => {
        // store player state
        setState(state)

        // request hierarchy update
        setRefresh(!refresh)
    }

    /**
     * The method that load a given url in {ReactPlayer}
     * @param url
     */
    const load = (url: string) => {

        // update player state
        state.url = url
        state.playing = true
        state.pip = false

        // reset progress
        setProgress({} as IProgressState)

        // update
        update()
    }

    /**
     * The method that switch playing state
     *
     */
    const handlePlayPause = () => {
        // switch playing state
        state.playing = !state.playing

        // update
        update()
    }

    /**
     * The method that stop playing
     */
    const handleStop = () => {
        // clean url
        state.url = ''
        // set playing to false
        state.playing = false

        // update
        update()
    }

    /**
     * The method that show/hide controls for the
     * embedded player
     *
     */
    const handleToggleControls = () => {
        // hold the url
        const url = state.url
        // toggle controls
        state.controls = !state.controls
        // clear url
        state.url = ''

        // store player state
        setState(state)
        // reload the url
        load(url)
    }

    /**
     * The method that toggle light mode for
     * the embedded player
     *
     */
    const handleToggleLight = () => {
        // toggle light
        state.light = !state.light

        // update
        update()
    }

    /**
     * The method that toggle loop mode for
     * the embedded player
     */
    const handleToggleLoop = () => {
        // toggle loop
        state.loop = !state.loop

        // update
        update()
    }

    /**
     * The method that control volume for the
     * embedded player
     * @param event
     * @param volume new value for the volume
     */
    const handleVolumeChange = (event: any, volume: (number | number[])) => {
        // store volume
        state.volume = volume as number

        // update
        update()
    }

    /**
     * The method that toggle muted for the
     * embedded player
     *
     */
    const handleToggleMuted = () => {
        // toggle muted
        state.muted = !state.muted

        // update
        update()
    }

    /**
     * The method that toggle PIP(Picture In Picture) mode
     * for the embedded player
     *
     */
    const handleTogglePip = () => {
        // toggle pip
        state.pip = !state.pip

        // update
        update()
    }

    /**
     * The method that set playback rate
     *
     * @param rate
     */
    const handleSetPlaybackRate = (rate: '0.5' | '1.0' | '1.25' | '1.5' | '2.0') => {
        // store rate
        state.playbackRate = parseFloat(rate)

        // update
        update()
    }

    /**
     * The method that switch playing state to true
     *
     */
    const handlePlay = () => {
        // set playing to true
        state.playing = true

        // update
        update()
    }

    /**
     * The method that enables PIP mode
     *
     */
    const handleEnablePip = () => {
        // set pip to true
        state.pip = true

        // update
        update()
    }

    /**
     * The method that disable PIP mode
     *
     */
    const handleDisablePip = () => {
        // set pip to false
        state.pip = false

        // update
        update()
    }

    /**
     * The method that switch playing state to false
     *
     */
    const handlePause = () => {
        // set playing to false
        state.playing = false

        // update
        update()
    }

    /**
     * The method that handle {Slider} mouseDown event
     *
     * @param _event is not used, the method blueprint
     * must be like that to be used directly
     */
    const handleSeekMouseDown = (_event: any) => {
        // set seeking to true
        state.seeking = true

        // update
        update()
    }

    /**
     * The method that handle {Slider} onChange event
     *
     * @param event is not used, the method blueprint
     * must be like that to be used directly
     *
     * @param newValue
     */
    const handleSeekChange = (event: any, newValue: (number | number[])) => {
        // store playedSeconds
        progress.playedSeconds = newValue as number

        // update
        setProgress(progress)
        update()
    }

    /**
     * The method that handle
     * @param _event is not used, the method blueprint
     * must be like that to be used directly
     *
     */
    const handleSeekMouseUp = (_event: any) => {
        // if player null, return
        if(!playerRef)
            return
        // set seeking to false
        state.seeking = false

        // seek player to the given value
        playerRef!.seekTo(progress.playedSeconds)

        // update
        update()
    }

    /**
     * The method that handle player progress
     *
     * @param progressState
     */
    const handleProgress = (progressState: IProgressState) => {
        // return if we're seeking
        if (state.seeking)
            return

        // otherwise store progress
        setProgress(progressState)

        // update
        update()
    }

    /**
     * The method that handle player ended event
     */
    const handleEnded = () => {
        // set playing to looping state
        state.playing = state.loop
        // set duration to track length
        // to fix {ReactPlayer} problem with
        // progress
        progress.playedSeconds = state.duration

        // store progress
        setProgress(progress)

        // update
        update()
    }

    /**
     * The method that set the duration of the track
     * @param duration
     */
    const handleDuration = (duration: number) => {
        // check if duration = 0
        if(duration !== playerRef?.getDuration())
            // store duration
            state.duration = playerRef?.getDuration()!
        else
            // store duration
            state.duration = duration

        // update
        update()
    }

    /**
     * The method that set the player to fullscreen
     *
     */
    const handleClickFullscreen = () => {
        // not used for the purpose of the project
    }

    // return Player provider object
    return {
        state,
        progress,
        setPlayer,
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

/**
 * The method that provides player hook
 */
export function usePlayer() {
    return useContext(playerContext)
}

/**
 * Player provider component
 *
 * @param children components that are able to consume player hook
 * @constructor
 */
export const PlayerProvider: React.FC = ({children}) => {

    // player provider state object
    const player = usePlayerProvider()

    // return component design
    return (<playerContext.Provider value={player}>{children}</playerContext.Provider>)
}