import React, {useEffect, useState} from 'react';
import Api from "../../api/Api";
import {usePlayer} from "../../providers/player/PlayerProvider";
import {getYoutubeVideoId} from "../../utils/Utils";
import {DEBUG, YOUTUBE_VIDEO} from "../../config";
import {ISong} from "../../providers/player/blueprint";

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

const SongItem: React.FC<ISong> = (props) => {

    const player = usePlayer()

    const playingVideoId = getYoutubeVideoId(player.state.url)

    const onPlayClick = () => {
        if (playingVideoId !== props.youtubeId) {
            player.load(props.url)
        } else {
            player.handlePlayPause()
        }
    }

    return (
        <div id={`song-control-${props.youtubeId}`}
             className={`${player.state.playing && playingVideoId === props.youtubeId ? 'bg-bg-primary' : 'bg-bg-secondary'} shadow-around rounded-2xl transition-all duration-500`}>
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
                            <div
                                className="flex flex-row space-x-1 text-xs uppercase tracking-wider shadow-around p-1 rounded-2xl px-2">
                                <p>JOY</p>
                                <p>75%</p>
                            </div>
                            <div
                                className="flex flex-row space-x-1 text-xs uppercase tracking-wider shadow-around p-1 rounded-2xl px-2">
                                <p>sad</p>
                                <p>15%</p>
                            </div>
                            <div
                                className="flex flex-row space-x-1 text-xs uppercase tracking-wider shadow-around p-1 rounded-2xl px-2">
                                <p>love</p>
                                <p>75%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MiddleSection() {

    const [elements, setElements] = useState([])

    const [refresh,] = useState(false)


    const createElements = async () => {

        await Api.youtube.featured().then(resp => {
            let videos: Array<IYoutubeVideo> = JSON.parse(resp.data).items
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
    }, [refresh])

    return (
        <div
            className="absolute flex-grow flex-col h-full overflow-y-scroll no-scrollbar justify-start items-end px-6 space-y-6">
            <div className="h-12"/>
            {elements}
            <div className="h-12"/>
        </div>
    );
}

export default MiddleSection;