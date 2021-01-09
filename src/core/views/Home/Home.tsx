import React, {useRef, useState} from 'react';
import {anger, disgust, emotions, fear, joy, neutral, sadness} from "../../providers/emotion/EmotionProvider";


function Home() {

    const [emotion, setEmotion] = useState(neutral)

    const changeEmotion = (event: React.MouseEvent) => {
        setEmotion(emotions.filter(e => e.name === (event.target as HTMLButtonElement).name)[0])
    }

    const rootRef = useRef(null)

    return (
        <div
            ref={rootRef}
            key='section-home'
            className="absolute flex flex-col text-text-primary w-full h-full sm:justify-center py-12 px-12">
            <span className="text-3xl font-semibold">What Do You Feel?</span>
            <div className="flex flex-col sm:flex-row justify-center items-center">
                <div
                    className="mx-12 grid grid-cols-2 w-96 justify-center shadow-around rounded-tl-2xl rounded-br-2xl">
                    <button
                        name={joy.name}
                        className='py-2 outline-none focus:outline-none hover:bg-action-hover rounded-tl-2xl flex-grow  shadow'
                        onMouseEnter={changeEmotion}>{joy.name}</button>
                    <button
                        name={sadness.name}
                        className='py-2 outline-none focus:outline-none hover:bg-action-hover  flex-grow  shadow'
                        onMouseEnter={changeEmotion}>{sadness.name}</button>
                    <button
                        name={disgust.name}
                        className='py-2 outline-none focus:outline-none hover:bg-action-hover  flex-grow  shadow'
                        onMouseEnter={changeEmotion}>{disgust.name}</button>
                    <button
                        name={fear.name}
                        className='py-2 outline-none focus:outline-none hover:bg-action-hover  flex-grow  shadow'
                        onMouseEnter={changeEmotion}>{fear.name}</button>
                    <button
                        name={anger.name}
                        className='py-2 outline-none focus:outline-none hover:bg-action-hover  flex-grow  shadow'
                        onMouseEnter={changeEmotion}>{anger.name}</button>
                    <button
                        name={neutral.name}
                        className='py-2 outline-none focus:outline-none hover:bg-action-hover rounded-br-2xl  flex-grow  shadow'
                        onMouseEnter={changeEmotion}>{neutral.name}</button>
                </div>
                <div className="flex flex-col w-96 justify-center items-center">
                    <img
                        alt={''}
                        style={{
                            transform: 'rotateY(180deg  )'
                        }}
                        className="h-60 transform transition-all duration-500"
                        src={emotion.logo}/>
                </div>
            </div>
        </div>
    );
}

export default Home;