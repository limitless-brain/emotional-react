import React, {useEffect, useRef, useState} from 'react';
import {getCircumferenceX, getCircumferenceY, toRad} from "../../utils/Utils";
import postcss from "postcss";

interface IEmotionCircle {
    x: Number,
    y: Number,
    color: string,
}

const EmotionCircle: React.FC<IEmotionCircle> = (props) => {

    const [pos, setPos] = useState({x: props.x, y: props.y})
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            pos.x = props.x.valueOf() - (ref.current.offsetWidth.valueOf())
            pos.y = props.y.valueOf() - (ref.current.offsetHeight.valueOf() / 4)
            setPos(pos)
        }
    }, [pos, props.x, props.y, ref])

    return (
        <div
            ref={ref}
            style={{
                transform: `translate(${pos.x.valueOf()}px,${pos.y.valueOf()}px)`,
                backgroundColor: props.color
            }}
            id={`${pos.x}-${pos.y}`}
            className="absolute rounded-full w-10 h-10 transform hover:scale-110 focus:scale-110 transition-all duration-500"
        >
        </div>
    )
}

function EmotionsCircle() {

    const [size, setSize] = useState({cx: 0, cy: 0, rad: 0})

    const rootRef = useRef<HTMLDivElement>(null)

    const emotions = 5
    const theta = toRad(360 / emotions).valueOf()

    useEffect(() => {
        const element = document.getElementById('emotion_circle')
        const w = element!.offsetWidth.valueOf()
        const h = element!.offsetHeight.valueOf()

        setSize({
            cx: w / 2,
            cy: h / 2,
            rad: Math.min(w, h) / 2
        })
        console.log(`with: ${w}, width: ${rootRef!.current!.offsetWidth}`)
    }, [])

    const createElements = () => {
        const elements = []
        for (let i = 0; i < 5; i++) {
            const t = theta * i
            const x = getCircumferenceX(size.rad, t).valueOf()
            const y = getCircumferenceY(size.rad, t).valueOf()
            elements.push(<EmotionCircle x={x + size.rad} y={y + size.rad} color={'#22ff33'}/>)
        }
        elements.push(<EmotionCircle x={size.cx} y={size.cy} color={'#ff22af'}/>)
        return elements
    }

    return (
        <div
            ref={rootRef}
            className="h-96 w-96 bg-bg-primary transition-all duration-500" id="emotion_circle">
            {createElements()}
        </div>
    );
}

export default EmotionsCircle;