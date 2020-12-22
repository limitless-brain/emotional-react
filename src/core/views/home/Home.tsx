import React from 'react';
import Player from "../player/Player";
import Header from "../header/Header";
import LeftBar from "../left-bar/LeftBar";
import RightBar from "../right-bar/RightBar";
import MiddleSection from "../middle-section/MiddleSection";
import logo from '../../logo2.png'

function Home() {
    return (
        <div className="w-full h-full flex flex-col bg-bg-secondary transition-all duration-500">
            <div className="flex flex-row justify-center items-end h-screen py-12">
                <LeftBar/>
                <img
                    style={{
                        transform: 'rotateY(180deg  )'
                    }}
                    className="h-96 hidden sm:block" src={logo}/>
                <MiddleSection/>
                <RightBar/>
            </div>
            <Header/>
            <Player/>
        </div>
    );
}

export default Home;