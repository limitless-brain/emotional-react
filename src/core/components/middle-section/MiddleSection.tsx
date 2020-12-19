import React, {useEffect, useState} from 'react';
import Api from "../../api/Api";
import {usePlayer} from "../player/provider/PlayerProvider";

interface ISong {
    key: string | number,
    title: string,
    description: string,
    img: string,
    youtubeId: string,
    emotions: Array<string>
}

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

    const onPlayClick = (event: React.MouseEvent) => {
        player.load(`https://www.youtube.com/watch?v=${props.youtubeId}`)
    }

    return (
        <div className="bg-bg-secondary shadow-around rounded-2xl transition-all duration-500">
            <div className="flex flex-col justify-start items-start">
                <div className="flex flex-row justify-between w-full">
                    <img src={props.img}
                         className="rounded md:block shadow-around"/>
                    <div className="inline-flex flex-row justify-center">
                        <button
                            className="relative h-12 w-12 outline-none focus:outline-none text-text-primary rounded-bl-2xl shadow transform hover:bg-primary transition-all duration-500">
                            <i className="fa fa-heartbeat"/>
                            <div className="hidden absolute -top-full -left-full w-12 bg-bg-secondary">
                                <div className="inline-flex flex-row">
                                    <button
                                        className="h-12 w-12 outline-none focus:outline-none bg-bg-secondary text-text-primary shadow-inverse transform hover:bg-primary transition-all duration-500">
                                        <i className="fa fa-smile"/>
                                    </button>
                                    <button
                                        className="h-12 w-12 outline-none focus:outline-none bg-bg-secondary text-text-primary shadow-inverse transform hover:bg-primary transition-all duration-500">
                                        <i className="fa fa-smile"/>
                                    </button>
                                    <button
                                        className="h-12 w-12 outline-none focus:outline-none bg-bg-secondary text-text-primary shadow-inverse transform hover:bg-primary transition-all duration-500">
                                        <i className="fa fa-smile"/>
                                    </button>
                                </div>
                            </div>
                        </button>
                        <button
                            className="h-12 w-12 outline-none focus:outline-none text-text-primary shadow transform hover:bg-primary transition-all duration-500">
                            <i className="fa fa-plus"/>
                        </button>
                        <button
                            onClick={onPlayClick}
                            className="h-12 w-12 outline-none focus:outline-none text-text-primary rounded-tr-2xl shadow transform hover:bg-primary transition-all duration-500">
                            <i className="fa fa-play"/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-end items-end w-full">
                    <div className="w-full p-8">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-2xl text-text-primary font-medium">{props.title}</h3>
                                <p className="text-sm text-text-primary opacity-75 mt-1">{props.title}</p>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 space-x-2 text-gray-600 flex flex-wrap border-t">
                            <div
                                className="flex flex-row space-x-1 text-xs uppercase tracking-wider shadow p-1 rounded-2xl px-2">
                                <p>JOY</p>
                                <p>75%</p>
                            </div>
                            <div
                                className="flex flex-row space-x-1 text-xs uppercase tracking-wider shadow p-1 rounded-2xl px-2">
                                <p>sad</p>
                                <p>15%</p>
                            </div>
                            <div
                                className="flex flex-row space-x-1 text-xs uppercase tracking-wider shadow p-1 rounded-2xl px-2">
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

    const [refresh, setRefresh] = useState(false)

    const createElements = async () => {

        await Api.youtube.featured().then(resp => {
            let videos: Array<IYoutubeVideo> = JSON.parse(resp.data).items
            console.log(videos)
            let songItems: any = []
            videos.forEach(video =>{
                songItems.push(<SongItem key={video.id}
                                         title={video.snippet.title}
                                         description={video.snippet.description}
                                         img={video.snippet.thumbnails.default.url}
                                         youtubeId={video.id}
                                         emotions={['']}/>)
            })
            setElements(songItems)
        })
    }

    useEffect(()=>{
        createElements()
    },[refresh])

    return (
        <div
            className="flex-grow flex-col h-full mx-6 overflow-y-scroll no-scrollbar justify-start items-end p-4 space-y-6">
            {elements}
        </div>
    );
}

export default MiddleSection;