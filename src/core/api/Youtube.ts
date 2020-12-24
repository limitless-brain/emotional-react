import axios from "axios"

const Youtube = {
    search: async (query: string) => {
        return await axios.get('/search', {params: {query}})
    },
    featured: async () => {
        return await axios.get('/featured')
    },
    videoInfo: async (id: string) => {
        return await axios.get(`/videos/${id}/info`)
    },
    audioFile: async (id: string) => {
        return await axios.get(`/videos/${id}/audio`)
    }
}

export default Youtube