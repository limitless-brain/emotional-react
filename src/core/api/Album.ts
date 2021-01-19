import axios from "axios";

const Album = {

    getAlbums: async (page = '') => {
        return await axios.get(`/albums${page}`)
    },

    getSongs: async (id: string) => {
        return await axios.get(`/albums/${id}`)
    },
}

export default Album