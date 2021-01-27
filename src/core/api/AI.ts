import axios from "axios"

const AI = {
    predictEmotion: async (paragraphs: string) => {
        return await axios.post('/ai/emotion', {paragraphs})
    },
}

export default AI