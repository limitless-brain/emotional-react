import axios from "axios"

const Spotify = {

    getArtists: async (ids: string) => {
        return await axios.get(`/spotify/artists`,{params:{ids}})
    },

    getAlbums: async (ids: string) => {
        return await axios.get(`/spotify/albums`, {params:{ids}})
    },
}

export default Spotify