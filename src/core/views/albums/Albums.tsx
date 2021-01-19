import React, {useEffect, useState} from 'react';
import Api from "../../api/Api";
import Pagination from "../pagination/Pagination";
import {IAlbumInfo, ISpotifyAlbum} from "./components/blueprint";
import placeholder from "./album.png"
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import Loading from "../loading/Loading";

const Albums = () => {
    const [albums, setAlbums] = useState<Array<ISpotifyAlbum>>()

    const [pages, setPages] = useState<any>({})

    const [loading, setLoading] = useState(true)

    const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        getAlbums(`?page=${page}`)
    }

    const classes = makeStyles({
        root: {
            'border-radius': '1rem;'
        }
    })()

    const getAlbums = (page?: string) => {
        setLoading(true)
        Api.album.getAlbums(page)
            .then(resp => {
                const data = resp.data
                setPages({
                    path: data.path,
                    current: data.current_page,
                    lastPage: data.last_page
                })

                let ids = data.data.map((album: any) => album.id)

                Api.spotify.getAlbums(ids.toString()).then(resp => {
                    setAlbums(resp.data.albums)
                    setLoading(false)
                })
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    const createAlbums = () => {
        let elements: Array<any> = []
        albums?.forEach(album => {

            if (!album)
                return

            let img = placeholder

            if (album.images && album.images.length > 0)
                img = album.images[0].url

            console.log(album.artists[0].name)

            elements.push((
                <Grid key={album.id} item sm={6} md={4} lg={3}>
                    <Card className={classes.root}>
                        <CardActionArea
                            onClick={(event) => {
                                (event.target as HTMLAnchorElement).blur()
                            }}
                            className='focus:outline-none'>
                            <CardHeader
                                title={<Typography variant="h6"
                                                   className='h-12 overflow-ellipsis'>{album.name}</Typography>}
                            />
                            <CardMedia
                                component='img'
                                className="h-60"
                                image={img}
                                title={album.name}/>
                            <CardContent>
                                    <Typography color='textSecondary' variant='body2'>Artist: {album.artists? album.artists[0].name : 'unknown'}</Typography>
                                    <Typography color='textSecondary' variant='body2'>Total Tracks: {album.total_tracks}</Typography>
                                    <Typography color='textSecondary' variant='body2'>Release Date: {album.release_date}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))
        })
        return (
            <Grid container spacing={2}>
                {elements}
            </Grid>
        )
    }

    useEffect(() => {
        getAlbums()
    }, [])

    return albums !== undefined ? (
        <div
            className="absolute flex-grow flex-col h-full overflow-y-scroll no-scrollbar justify-start items-end px-6 space-y-6">
            <div className="h-24"/>
            <div className="flex w-full justify-center items-center">
                <Pagination count={pages.lastPage} onChange={onPageChange}/>
            </div>
            <div className="flex flex-wrap w-full justify-center items-center">
                {!loading && createAlbums()}
                {loading && <Loading/>}
            </div>
            <div className="h-12"/>
        </div>
    ) : <Loading/>;
}

export default Albums;