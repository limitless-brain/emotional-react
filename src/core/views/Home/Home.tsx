import React, {useEffect, useRef, useState} from 'react';
import EmotionsCircle from "../emotion-circle/EmotionsCircle";
import {useEmotion} from "../../providers/emotion/EmotionProvider";
import {CSSTransition} from "react-transition-group";
import {usePlayer} from "../../providers/player/PlayerProvider";
import {YOUTUBE_VIDEO} from "../../config";
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
import {sadness} from "../../providers/emotion/emotions";
import {IPlayerPlaylist} from "../../providers/player/blueprint";

const joy_playlist_1 = {
    current: 0, name: "Risk Taker", tracks: [
        {
            description: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "o0PpP0ksmcI",
            title: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            url: YOUTUBE_VIDEO.concat('o0PpP0ksmcI'),
            youtubeId: "o0PpP0ksmcI"
        }, {
            description: "Nicole Scherzinger - Your Love (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "9FOWI6Zftpg",
            title: "Nicole Scherzinger - Your Love (Official Video)",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "9FOWI6Zftpg"
        }, {
            description: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            emotions: ["joy"],
            img: "",
            key: "gOfOt76D3MM",
            title: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            url: YOUTUBE_VIDEO.concat('gOfOt76D3MM'),
            youtubeId: "gOfOt76D3MM"
        }, {
            description: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            emotions: ["joy"],
            img: "",
            key: "gOfOt76D3MM",
            title: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            url: YOUTUBE_VIDEO.concat('gOfOt76D3MM'),
            youtubeId: "gOfOt76D3MM"
        }, {
            description: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            emotions: ["joy"],
            img: "",
            key: "gOfOt76D3MM",
            title: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            url: YOUTUBE_VIDEO.concat('gOfOt76D3MM'),
            youtubeId: "gOfOt76D3MM"
        }, {
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },
    ]
}
const joy_playlist_2 = {
    current: 0, name: "Nearby The See", tracks: [
        {
            description: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "o0PpP0ksmcI",
            title: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            url: YOUTUBE_VIDEO.concat('o0PpP0ksmcI'),
            youtubeId: "o0PpP0ksmcI"
        }, {
            description: "Nicole Scherzinger - Your Love (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "9FOWI6Zftpg",
            title: "Nicole Scherzinger - Your Love (Official Video)",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "9FOWI6Zftpg"
        }, {
            description: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            emotions: ["joy"],
            img: "",
            key: "gOfOt76D3MM",
            title: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            url: YOUTUBE_VIDEO.concat('gOfOt76D3MM'),
            youtubeId: "gOfOt76D3MM"
        }, {
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },
    ]
}

const sadness_playlist_1 = {
    current: 0, name: "Falling A Part", tracks: [
        {
            description: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "o0PpP0ksmcI",
            title: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            url: YOUTUBE_VIDEO.concat('o0PpP0ksmcI'),
            youtubeId: "o0PpP0ksmcI"
        }, {
            description: "Nicole Scherzinger - Your Love (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "9FOWI6Zftpg",
            title: "Nicole Scherzinger - Your Love (Official Video)",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "9FOWI6Zftpg"
        }, {
            description: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            emotions: ["joy"],
            img: "",
            key: "gOfOt76D3MM",
            title: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            url: YOUTUBE_VIDEO.concat('gOfOt76D3MM'),
            youtubeId: "gOfOt76D3MM"
        }, {
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },{
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },{
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },{
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },{
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },{
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },
    ]
}
const sadness_playlist_2 = {
    current: 0, name: "Don't Care", tracks: [
        {
            description: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "o0PpP0ksmcI",
            title: "Nayer ft. Pitbull & Mohombi - Suave (Kiss Me) (Official Video)",
            url: YOUTUBE_VIDEO.concat('o0PpP0ksmcI'),
            youtubeId: "o0PpP0ksmcI"
        }, {
            description: "Nicole Scherzinger - Your Love (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "9FOWI6Zftpg",
            title: "Nicole Scherzinger - Your Love (Official Video)",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "9FOWI6Zftpg"
        }, {
            description: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            emotions: ["joy"],
            img: "",
            key: "gOfOt76D3MM",
            title: "Mohombi - Coconut Tree ft. Nicole Scherzinger",
            url: YOUTUBE_VIDEO.concat('gOfOt76D3MM'),
            youtubeId: "gOfOt76D3MM"
        }, {
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },{
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },{
            description: "Jennifer Lopez - On The Floor ft. Pitbull",
            emotions: ["joy"],
            img: "",
            key: "t4H_Zoh7G5A",
            title: "Jennifer Lopez - On The Floor ft. Pitbull",
            url: YOUTUBE_VIDEO.concat('9FOWI6Zftpg'),
            youtubeId: "t4H_Zoh7G5A"
        },
    ]
}
const sadness_playlist_3 = {
    current: 0, name: "Without You", tracks: [
        {
            description: "Faydee - Far Away [Official Music Video]",
            emotions: ["sadness"],
            img: "",
            key: "rLboTKHY93Q",
            title: "Faydee - Far Away",
            url: YOUTUBE_VIDEO.concat('rLboTKHY93Q'),
            youtubeId: "rLboTKHY93Q"
        }, {
            description: "Faydee Ft Lazy J - Laugh Till You Cry (Official Video)",
            emotions: ["joy","sadness"],
            img: "",
            key: "eaTawbEn_d4",
            title: "Faydee Ft Lazy J - Laugh Till You Cry",
            url: YOUTUBE_VIDEO.concat('eaTawbEn_d4'),
            youtubeId: "eaTawbEn_d4"
        }, {
            description: "Hailee Steinfeld - Love Myself (Official Video)",
            emotions: ["joy"],
            img: "",
            key: "HT6cvpFODRQ",
            title: "Hailee Steinfeld - Love Myself",
            url: YOUTUBE_VIDEO.concat('HT6cvpFODRQ'),
            youtubeId: "HT6cvpFODRQ"
        }
    ]
}


const joyPlaylists = [
    joy_playlist_1,
    joy_playlist_2
]

const sadnessPlaylists = [
    sadness_playlist_1,
    sadness_playlist_2,
    sadness_playlist_3
]

const playlists = {
    joy: joyPlaylists,
    sadness: sadnessPlaylists
}
function Home() {

    const rootRef = useRef(null)

    const [showTracks, setShowTracks] = useState(false)

    const emotion = useEmotion()

    const player = usePlayer()

    useEffect(() => {
        if (emotion?.current !== null) {
            let timer = setTimeout(() => {
                setShowTracks(true)
                clearTimeout(timer)
            }, 250)
        }
    }, [emotion?.current])

    const classes = makeStyles({
        root: {
            'border-radius': '1rem;'
        }
    })()

    const createPlaylists = () => {
        let elements: any = []

        let playlist: IPlayerPlaylist[] = emotion?.current === sadness? playlists.sadness : playlists.joy

        playlist.forEach(element => {
            elements.push((<Grid item sm={6} md={4}>
                <Card className={classes.root}>
                    <CardActionArea
                        onClick={(event) => {
                            (event.target as HTMLAnchorElement).blur()
                            player.setPlaylist(element)
                        }}
                        className='focus:outline-none'>
                        <CardHeader
                            title={element.name}
                        />
                        <CardMedia
                            component='img'
                            className="h-32"
                            image={`https://fakeimg.pl/350x200/?text=${element.name.replace(' ','+')}`}
                            title={element.name}/>
                        <CardContent className="flex flex-row justify-between">
                            <Typography
                                color='textPrimary'>Tracks: {element.tracks.length}</Typography>
                            {(player.playlist?.name === element.name) &&
                            <Typography variant={"body1"} color={'primary'}>Currently
                                Playing</Typography>}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>))
        })

        return elements
    }

    return (
        <div
            ref={rootRef}
            key='section-home'
            className="absolute flex flex-col text-text-primary w-full h-full">
            <EmotionsCircle/>
            <div className="h-full w-full flex flex-col items-center p-12 pt-24">
                <CSSTransition
                    in={!showTracks}
                    unmountOnExit
                    timeout={750} classNames='fade'>
                    <div className="w-full flex flex-row justify-center items-center">
                    <span
                        className="select-none text-3xl font-semibold capitalize">{emotion?.current ? '' : 'How Do You Feel?'}</span>
                    </div>
                </CSSTransition>
                <CSSTransition in={showTracks} timeout={750} mountOnEnter={false} unmountOnExit classNames='page'>
                    <div
                        className="w-full flex flex-col justify-center items-center overflow-y-scroll no-scrollbar space-y-6">

                        <div className="w-full h-full">
                            <div className="w-full flex flex-row justify-between mb-8">
                            <span
                                className='select-none text-3xl font-semibold capitalize text-text-emotion'>{emotion?.current ? emotion.current.name : ''}</span>
                                <button
                                    className={`${emotion?.current ? 'text-text-emotion' : 'hidden transition transition-all duration-500'}`}
                                    onClick={() => {
                                        setShowTracks(false)
                                        emotion?.clear()
                                    }}>
                                    <span className="fa fa-edit"/>
                                </button>
                            </div>
                            {showTracks &&
                            <Grid container spacing={2}>
                                {createPlaylists()}
                            </Grid>}
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
}

export default Home;