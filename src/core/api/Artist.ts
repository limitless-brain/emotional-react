import axios from "axios"

const Artist = {

    getArtists: async (page = '') => {
        return await axios.get(`/artists${page}`)
    },

    getAlbums: async (id: string) => {
        return await axios.get(`/artists/${id}`)
    },
}

export default Artist