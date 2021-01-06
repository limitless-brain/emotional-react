import React, {useRef} from 'react';

function EmotionsCircle() {

    const rootRef = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={rootRef}
            className="h-96 w-96 transition-all duration-500" id="emotion_circle">
        </div>
    );
}

export default EmotionsCircle;