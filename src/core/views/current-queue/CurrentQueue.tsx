import React from 'react';
import {usePlayer} from "../../providers/player/PlayerProvider";
import {SongItem} from "../middle-section/MiddleSection";
import {ISong} from "../../providers/player/blueprint";

const CurrentQueue = () => {

    const player = usePlayer()

    const createQueue = () => {

        let elements: Array<any> = []

        let tracks: ISong[] | undefined = player.playlist?.tracks

        if (tracks === undefined && !!player.currentSong)
            tracks = [player.currentSong]
        if (tracks !== undefined)
            tracks.forEach(song => {
                elements.push(
                    (<SongItem key={song.key}
                               title={song.title}
                               description={song.description}
                               img={song.img}
                               youtubeId={song.youtubeId}
                               url={song.url}
                               emotions={song.emotions}
                    />)
                )
            })

        return elements.length > 0 ? elements : (<div>No elements in the queue</div>)
    }

    return (
        <div
            className="absolute flex-grow flex-col h-full overflow-y-scroll no-scrollbar justify-start items-end px-6 space-y-6">
            <div className="h-24"/>
            <div className="flex flex-col w-full justify-center items-center space-y-6">
                {createQueue()}
            </div>
            <div className="h-12"/>
        </div>
    );
}

export default CurrentQueue;