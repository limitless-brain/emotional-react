import React, {useEffect, useState} from 'react';
import Api from "../../api/Api";
import {usePlayer} from "../../providers/player/PlayerProvider";
import {BUTTON_TAILWIND_STYLE, getYoutubeVideoId} from "../../utils/Utils";
import {DEBUG, YOUTUBE_VIDEO} from "../../config";
import {ISong} from "../../providers/player/blueprint";
import {emotions} from '../../providers/emotion/emotions';
import Loading from "../loading/Loading";

interface IYoutubeVideo {
    etag: string,
    id: string,
    kind: string,
    snippet: IYoutubeSnippet
}

interface IYoutubeSnippet {
    categoryId: string,
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    localized: IYoutubeLocalized
    publishedAt: string,
    tags: Array<string>
    thumbnails: IYoutubeThumbnails
    title: string
}

interface IYoutubeLocalized {
    title: string,
    description: string
}

interface IYoutubeThumbnails {
    default: IYoutubeThumbnail,
    high: IYoutubeThumbnail,
    maxres: IYoutubeThumbnail,
    medium: IYoutubeThumbnail,
    standard: IYoutubeThumbnail
}

interface IYoutubeThumbnail {
    height: Number,
    width: Number,
    url: string
}

export const SongItem: React.FC<ISong> = (props) => {

    const player = usePlayer()

    const playingVideoId = getYoutubeVideoId(player.state.url)

    const [loading, setLoading] = useState(false)

    const [emotionsResponse, setEmotionsResponse] = useState<any>()

    const [lyricsResponse, setLyricsResponse] = useState<any>()

    const [error, setError] = useState(false)

    const onPlayClick = () => {
        if (playingVideoId !== props.youtubeId) {
            player.play(props)
        } else {
            player.handlePlayPause()
        }
    }

    const requestEmotion = async () => {
        await Api.youtube.lyrics(props.youtubeId).then(resp => {
            setLyricsResponse(resp.data)
            if (resp.data.lyrics !== 'lyrics not found') {
                Api.ai.predictEmotion(resp.data.lyrics).then(aiResp => {
                        setEmotionsResponse(aiResp.data)
                    }
                )
            } else {
                setError(true)
            }
            setLoading(false)
        })
            .catch(err => {
                setError(true)
            })
    }

    const generateEmotionsChips = () => {

        const emotions = emotionsResponse.result.labels
        const scores = emotionsResponse.result.overall

        return emotions.map((emotion: string, index: number) => (<div
            className="flex flex-row w-24 h-6 text-xs font-normal uppercase tracking-wider shadow p-1 rounded-2xl justify-center items-center mb-2">
            <p className="text-text-primary opacity-80">{`${emotion} ${scores[index]}`}%</p>
        </div>))
    }

    useEffect(() => {
        if (!loading && !emotionsResponse) {
            requestEmotion()
            setLoading(true)
        }
    }, [loading])

    return (
        <div id={`song-control-${props.youtubeId}`}
             className={`${player.state.playing && playingVideoId === props.youtubeId ? 'bg-bg-primary' : 'bg-bg-secondary'} w-full shadow-around rounded-2xl transition-all duration-500`}>
            <div className="flex flex-col justify-start items-start">
                <div className="flex flex-row justify-between w-full">
                    <img src={props.img}
                         className="rounded-tl-2xl rounded-br-2xl md:block shadow-around" alt={''}/>
                    <div className="inline-flex flex-row justify-center">
                        <button
                            className="relative h-12 w-12 outline-none focus:outline-none text-text-primary rounded-bl-2xl shadow transform hover:bg-action-hover focus:bg-action-selected transition-all duration-500">
                            <i className="fa fa-heartbeat"/>
                        </button>
                        <button
                            className="h-12 w-12 outline-none focus:outline-none text-text-primary shadow transform hover:bg-action-hover focus:bg-action-selected transition-all duration-500">
                            <i className="fa fa-plus"/>
                        </button>
                        <button
                            onClick={onPlayClick}
                            className="h-12 w-12 outline-none focus:outline-none text-text-primary rounded-tr-2xl shadow transform hover:bg-action-hover focus:bg-action-selected transition-all duration-500">
                            <i className={`fa ${playingVideoId !== props.youtubeId ? 'fa-play' : player.state.playing ? 'fa-pause' : 'fa-play'}`}/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-end items-end w-full">
                    <div className="w-full p-8">
                        <div className="flex justify-between text-text-primary">
                            <div>
                                <h3 className="text-2xl font-medium">{props.title}</h3>
                                <p className="text-sm opacity-75 mt-1">{props.title}</p>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 text-text-primary space-x-2 flex flex-wrap border-t">
                            {error &&('There is no lyrics for this song')}
                            {loading && (<Loading/>)}
                            {emotionsResponse && generateEmotionsChips()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface IPaginator {
    nextPageToken: string,
    previousPageToken: string,
    totalResults: number
}


function MiddleSection() {

    const [elements, setElements] = useState([])

    const [paginator, setPaginator] = useState<IPaginator>()

    const [refresh,] = useState(false)

    const onNextClick = () => {
        createElements(paginator?.nextPageToken)
    }

    const onPreviousClick = () => {
        createElements(paginator?.previousPageToken)
    }


    const createElements = async (pageToken: string | null = null) => {

        await Api.youtube.featured(pageToken).then(resp => {
            const data = JSON.parse(resp.data)

            setPaginator({
                nextPageToken: data.nextPageToken || null,
                previousPageToken: data.prevPageToken || null,
                totalResults: data.pageInfo.totalResults
            })

            let videos: Array<IYoutubeVideo> = data.items
            let songItems: any = []
            videos.forEach(video => {
                songItems.push(<SongItem key={video.id}
                                         title={video.snippet.title}
                                         description={video.snippet.description}
                                         img={video.snippet.thumbnails.default.url}
                                         youtubeId={video.id}
                                         url={YOUTUBE_VIDEO.concat(video.id)}
                                         emotions={['']}/>)
            })
            setElements(songItems)
        })
            .catch(error => {
                if (DEBUG)
                    console.log(error)
            })
    }

    useEffect(() => {
        createElements().then()
    }, [])

    return (
        <div
            className="absolute flex-grow flex-col h-full overflow-y-scroll no-scrollbar justify-start items-end px-6 space-y-6">
            <div className="h-24"/>
            {paginator ? (<div className="flex w-full justify-between rounded-2xl shadow">
                <button
                    disabled={paginator.previousPageToken === null}
                    onClick={onPreviousClick}
                    className={`${BUTTON_TAILWIND_STYLE} rounded-l-2xl`}>
                    <i className="w-12 fa fa-angle-left"/>
                </button>
                <div className="flex justify-center items-center font-semibold uppercase text-xl text-text-primary">
                    {paginator.totalResults} results, 12 per page
                </div>
                <button
                    disabled={paginator.nextPageToken === null}
                    onClick={onNextClick}
                    className={`${BUTTON_TAILWIND_STYLE} rounded-r-2xl`}>
                    <i className="w-12 fa fa-angle-right"/>
                </button>
            </div>) : null}
            <div className="flex flex-col w-full justify-center items-center space-y-6">
                {elements}
            </div>
            <div className="h-12"/>
        </div>
    );
}

export default MiddleSection;