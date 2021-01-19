import axios from "axios"

const AI = {
    predictEmotion: async (paragraphs: string) => {
        return await axios.get('/ai/emotion', {params: {paragraphs}})
    },
}

export default AI