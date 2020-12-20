import React from 'react';
import Player from "../player/Player";
import Header from "../header/Header";
import LeftBar from "../left-bar/LeftBar";
import RightBar from "../right-bar/RightBar";
import MiddleSection from "../middle-section/MiddleSection";

function Home() {
    return (
        <div className="w-full h-full flex flex-col text-text-primary bg-bg-secondary transition-all duration-500">
            <div className="flex flex-row justify-between h-screen my-12">
                <LeftBar/>
                <MiddleSection/>
                <RightBar/>
            </div>
            <Header/>
            <Player/>
        </div>
    );
}

export default Home;