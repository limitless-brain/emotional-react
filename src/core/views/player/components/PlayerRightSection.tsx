import React, {useState} from "react";
import {BUTTON_TAILWIND_STYLE, isEmpty, paperSecondaryUseStyles, volumeSliderUseStyles} from "../../../utils/Utils";
import {
    Button,
    ClickAwayListener,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    Paper,
    Popper,
    Slider, Typography
} from "@material-ui/core";
import {usePlayer} from "../../../providers/player/PlayerProvider";
import {useNotification} from "../../../providers/NotificationProvider";
import Api from "../../../api/Api";
import Loading from "../../loading/Loading";

export interface IYoutubeLyricsResponse {
    lyrics: string,
    artist: string,
    title: string
}

const PlayerRightSection: React.FC<{ showVideo: boolean, setShowVideo: (b: boolean) => void }> = (props) => {

    const player = usePlayer()

    const nProvider = useNotification()

    const [showVolume, setShowVolume] = useState(false)

    const [lyricsResponse, setLyricsResponse] = useState<IYoutubeLyricsResponse | null>(null)
    const [loadingLyrics, setLoadingLyrics] = useState(false)
    const [showLyrics, setShowLyrics] = useState(false)

    const onVolumeClick = () => {
        setShowVolume(!showVolume)
    }

    const onCaptionClick = async () => {
        if (!player.currentSong) {
            nProvider.notify('There is no song currently playing to get its lyrics!','error')
            return
        }
        setLoadingLyrics(true)
        setShowLyrics(true)
        Api.youtube.lyrics(player.currentSong.youtubeId!)
            .then(resp => {
                setLyricsResponse(resp.data)
                setLoadingLyrics(false)
            })
    }

    const handleLyricsDialogClose = () => {
        setShowLyrics(false)
    }

    const getLyricsElement = () => {
        if (!lyricsResponse)
            return
        let elements = lyricsResponse.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>')
        return (<div dangerouslySetInnerHTML={{__html:elements}}/>)
    }

    const sliderClasses = volumeSliderUseStyles()

    const paperClasses = paperSecondaryUseStyles()

    // return component design
    return (
        <div className="flex flex-row justify-end items-center">

            <button
                onClick={onCaptionClick}
                className={`${BUTTON_TAILWIND_STYLE}`}>
                <i className="w-12 fa fa-bars"/>
            </button>
            <Dialog open={showLyrics}
                    scroll="paper"
                    onClose={handleLyricsDialogClose}>
                <DialogTitle>
                    <Grid>
                        <Grid item sm={12}>
                            <Typography variant='h5' color='textPrimary'>{lyricsResponse?.title}</Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='h6' color='textSecondary'
                                        className="text-text-primary">{lyricsResponse?.artist}</Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent className="no-scrollbar" dividers>
                    {loadingLyrics && <Loading/>}
                    {lyricsResponse && (<div className="select-none">{getLyricsElement()}</div>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLyricsDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
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
                                    root: paperClasses.root
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
                    if (isEmpty(player.state.url))
                        nProvider.notify('There is no video playing right now', "info")
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