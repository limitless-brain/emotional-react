import React from 'react';

function Player(props: { time: React.ReactNode; }) {
    return (
        <div className="w-screen fixed h-12 bottom-0 bg-bg-secondary rounded-t-2xl border-t shadow-2xl p-4">
            <div className="ml-8 absolute bottom-6">
                <button
                    className="inline-flex items-center justify-center focus:outline-none mr-2 w-9 h-9 text-text-primary bg-bg-primary rounded-full shadow transform hover:scale-105 hover:bg-primary focus:shadow-2xl transition-all duration-300">
                    <i className="fa fa-backward"/>
                </button>
                <button
                    className="inline-flex relative items-center justify-center focus:outline-none mr-2 w-12 h-12 text-text-primary bg-bg-primary rounded-full shadow transform hover:scale-105 hover:bg-primary focus:shadow-2xl transition-all duration-300">
                    <i className="fa fa-play"/>
                </button>
                <button
                    className="inline-flex items-center justify-center focus:outline-none mr-2 w-9 h-9 text-text-primary bg-bg-primary rounded-full shadow transform hover:scale-105 hover:bg-primary focus:shadow-2xl transition-all duration-300">
                    <i className="fa fa-forward"/>
                </button>
            </div>
        </div>
    );
}

export default Player;