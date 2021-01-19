export interface IAlbumInfo {
    id: string,
    name: string,
    img?: string
}

export interface ISpotifyImage {
    height: number,
    width: number,
    url: string
}

export interface ISpotifyAlbum {
    id: string,
    albumType: string,
    artists: ISpotifyAlbumArtist[],
    name: string,
    images: ISpotifyImage[],
    'release_date': string,
    'total_tracks': number
}

export interface ISpotifyAlbumArtist {
    id: string,
    name: string
}