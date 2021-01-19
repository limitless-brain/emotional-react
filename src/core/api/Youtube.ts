import axios from "axios"

const Youtube = {
    search: async (query: string, pageToken: string | null = null) => {
        return await axios.get('/search', {params: {query, pageToken}})
    },
    featured: async (pageToken: string | null = null) => {
        return await axios.get('/featured', {params: {pageToken}})
    },
    videoInfo: async (id: string) => {
        return await axios.get(`/videos/${id}/info`)
    },
    audioFile: async (id: string) => {
        return await axios.get(`/videos/${id}/audio`)
    },
    lyrics: async (youtubeId: string) => {
        return await axios.get('/lyrics', {
            params: {
                youtubeId: youtubeId
            }
        })
    },
    findSong: async (artist: string, title: string) => {
        return await axios.get('/videos/find', {
            params: {
                artist,
                title,
            }
        })
    }
}

export default Youtube