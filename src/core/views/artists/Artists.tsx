import React, {useEffect, useState} from 'react';
import Pagination from "../pagination/Pagination";
import Artist, {IArtistData, IArtistInfo, ISpotifyArtist} from "./components/Artist";
import Api from "../../api/Api";

import Loading from "../loading/Loading";
import {Grid} from "@material-ui/core";

function Artists() {

    const [artists, setArtists] = useState<Array<ISpotifyArtist>>()

    const [pages, setPages] = useState<any>({})

    const [loading, setLoading] = useState(true)

    const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        getArtists(`?page=${page}`)
    }

    const getArtists = (page?: string) => {
        setLoading(true)
        Api.artist.getArtists(page)
            .then(resp => {
                const data = resp.data
                setPages({
                    path: data.path,
                    current: data.current_page,
                    lastPage: data.last_page
                })

                setArtists(data.data)
                let ids = data.data.map((artist: any) => artist.id)

                Api.spotify.getArtists(ids.toString()).then(resp => {
                    setArtists(resp.data.artists)
                    setLoading(false)
                })

            })
            .catch(error => {
                console.log(error.response)
            })
    }

    const createArtists = () => {
        let elements: Array<any> = []

        artists?.forEach(artist => {

            if (!artist)
                return

            elements.push((
                <Artist artist={artist}/>
            ))
        })
        return (
            <Grid container spacing={2}>
                {elements}
            </Grid>
        )
    }

    useEffect(() => {
        getArtists()
    }, [])

    return artists !== undefined ? (
        <div
            className="absolute flex-grow flex-col h-full overflow-y-scroll no-scrollbar justify-start items-end px-6 space-y-6">
            <div className="h-24"/>
            <div className="flex w-full justify-center items-center">
                <Pagination count={pages.lastPage} onChange={onPageChange}/>
            </div>
            <div className="flex flex-wrap w-full justify-center items-center">
                {!loading && createArtists()}
                {loading && <Loading/>}
            </div>
            <div className="h-12"/>
        </div>
    ) : null;
}

export default Artists;