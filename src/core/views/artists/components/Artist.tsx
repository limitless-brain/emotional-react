import React from 'react';
import {IAlbumInfo, ISpotifyImage} from "../../albums/components/blueprint";
import {ISongInfo} from "../../songs/components/blueprint";
import placeholder from "../artist.jpg";
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

export interface IArtistData {
    artistInfo: IArtistInfo,
    albums: Array<IAlbumInfo>,
    totalAlbums: number,
    totalSongs: number
}

export interface IArtistInfo {
    id: string,
    name: string,
    img?: string
}

export interface ISpotifyArtist {
    id: string,
    name: string,
    images: ISpotifyImage[]
}

const Artist: React.FC<{ artist:ISpotifyArtist }> = (props) => {
    let img = placeholder
    let artist = props.artist

    if (artist.images && artist.images.length > 0)
        img = artist.images[0].url

    const classes = makeStyles({
        root: {
            'border-radius': '1rem;'
        }
    })()

    return (
        <Grid key={artist.id} item sm={6} md={4} lg={3}>
            <Card className={classes.root}>
                <CardActionArea
                    onClick={(event) => {
                        (event.target as HTMLAnchorElement).blur()
                    }}
                    className='focus:outline-none'>
                    <CardHeader
                        title={<Typography variant="h6" className='h-12 overflow-ellipsis'>{artist.name}</Typography>}
                    />
                    <CardMedia
                        component='img'
                        className="h-60"
                        image={img}
                        title={artist.name}/>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default Artist;