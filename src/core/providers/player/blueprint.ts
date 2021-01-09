import ReactPlayer from "react-player";

/**
 * Player provider blueprint
 *
 */
export interface IPlayerProvider {
    state: IPlayerState,
    progress: IProgressState,
    setPlayer: (player: ReactPlayer | null) => void,
    setPlaylist: (playlist: IPlayerPlaylist | null) => void,
    playlist: IPlayerPlaylist | null,
    play: (song: ISong) => void,
    playAt: (index: number) => void | -1,
    playNext: () => void | -1,
    playPrevious: () => void | -1,
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
export interface IPlayerState {
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
export interface IProgressState {
    played: number,
    playedSeconds: number,
    loaded: number,
    loadedSeconds: number
}

export interface IPlayerPlaylist {
    name: string,
    tracks: ISong[]
    current: number
}

export interface ISong {
    key: string | number,
    title: string,
    description: string,
    img: string,
    youtubeId: string,
    url: string,
    emotions: Array<string>
}