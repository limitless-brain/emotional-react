import React, {createContext, useContext, useState} from 'react';
import {IEmotion} from "./blueprint";

interface IEmotionContext {
    current: IEmotion | null,
    previous: IEmotion | null,
    switchEmotion: (emotion: IEmotion) => void,
    clear: () => void,
}

const emotionContext = createContext<IEmotionContext | null>(null)

function useEmotionProvider() {

    // state to store emotion, null as default
    const [emotion, setEmotion] = useState<IEmotion | null>(null)
    const [previousEmotion, setPreviousEmotion] = useState<IEmotion | null>(null)

    /**
     * The method that change the current emotion
     *
     */
    const switchEmotion = (e: IEmotion) => {

        // store the previous emotion
        setPreviousEmotion(emotion)
        // set the emotion
        setEmotion(e)
    }

    const clear = () => {

        // store the previous emotion
        setPreviousEmotion(emotion)
        // clear the emotion
        setEmotion(null)
    }

    // return emotion provider object
    return {
        current: emotion,
        previous: previousEmotion,
        switchEmotion,
        clear
    }
}

// emotion hook
export const useEmotion = () => {
    return useContext(emotionContext)
}

// emotion provider react component
const EmotionProvider: React.FC = (props) => {

    // emotion provider
    const emotion = useEmotionProvider()

    // return component design
    return (
        <emotionContext.Provider value={emotion}>{props.children}</emotionContext.Provider>
    )

}
export default EmotionProvider;