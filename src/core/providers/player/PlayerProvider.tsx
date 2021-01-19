import React, {createContext, useContext, useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import {IPlayerPlaylist, IPlayerProvider, IPlayerState, IProgressState, ISong} from "./blueprint";
import {DEBUG} from "../../config";

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
    const [playerRef, setPlayerRef] = useState<ReactPlayer | null>(null)

    // player playlist
    const [playlistRef, setPlaylistRef] = useState<IPlayerPlaylist | null>(null)

    // current song
    const [currentSong, setCurrentSong] = useState<ISong | null>(null)
    /**
     * The method that set react player instance
     * @param player
     */
    const setPlayer = (player: ReactPlayer | null) => {
        setPlayerRef(player)
    }

    /**
     * The method that set playlist state
     * @param playlist
     */
    const setPlaylist = (playlist: IPlayerPlaylist | null) => {

        // check if we receive playlist
        if (playlist) {

            // check if we have to update
            if (playlist !== playlistRef) {

                // update the playlist
                setPlaylistRef({...playlist})

                // update the player
                update()
            } else {
                play(playlist.tracks[0])
            }
        }
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
     * The method that play a given song object
     *
     * @param song
     */
    const play = (song: ISong) => {

        setCurrentSong(song)

        // if we don't have a playlist
        if (!playlistRef) {
            // use load method
            load(song.url)
        } else {

            if(!playlistRef.tracks.includes(song)) {
                load(song.url)
                setPlaylist(null)
                return
            }

            // load the song from the list
            if(playlistRef.tracks.indexOf(song) !== playlistRef.current)
                playlistRef.current = playlistRef.tracks.indexOf(song)
            load(song.url)
        }
    }

    /**
     * The method that plays the song at i in the playlist
     *
     */

    const playAt = (index: number) => {

        // call only if we have playlist
        if (playlistRef) {

            // return -1 if there is out of index
            if (playlistRef.tracks.length <= index)
                return -1

            // update playlist current
            playlistRef.current = index

            // store playlist state
            setPlaylistRef({...playlistRef})

            // play the song
            let song = playlistRef.tracks[index]
            play(song)
        } else {
            return -1;
        }
    }

    /**
     * The method that plays the next song in the playlist
     *
     */
    const playNext = () => {

        // call only if we have playlist
        if (playlistRef) {

            // return -1 if there is no next
            if (playlistRef.current === (playlistRef.tracks.length - 1))
                return -1
            let index = playlistRef.current + 1;
            // play the song
            playAt(index)
        } else {
            return -1;
        }
    }

    /**
     * The method that plays the next song in the playlist
     *
     */
    const playPrevious = () => {

        // call only if we have playlist
        if (playlistRef) {

            // return -1 if there is no previous
            if (playlistRef.current === 0)
                return -1

            // play the song
            playAt(--playlistRef.current)
        } else {
            return -1;
        }
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
        if (!playerRef)
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

        // check if we play playlist
        // and not looping
        if (playlistRef && !state.loop) {
            // check if we have next track
            if (playNext() !== -1) {
                // we are playing a song
                return
            }
        }
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
        if (duration !== playerRef?.getDuration())
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

    /**
     * Playlist useEffect
     *
     */

    useEffect(() => {
        if (playlistRef) {
            play(playlistRef.tracks[playlistRef.current])
        }
    }, [playlistRef])

    // return Player provider object
    return {
        state,
        progress,
        playlist: playlistRef,
        currentSong,
        setPlayer,
        setPlaylist,
        play,
        playAt,
        playNext,
        playPrevious,
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