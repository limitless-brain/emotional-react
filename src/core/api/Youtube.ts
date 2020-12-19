import axios from "axios"

export default {
    search: async (query: string) => {
        return await axios.get('/search', {params: {query}})
    },
    featured: async () => {
        return await axios.get('/featured')
    }
}