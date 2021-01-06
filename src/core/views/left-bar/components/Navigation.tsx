import React from 'react';
import {FullWidthNavLink} from "../../button/CustomButton";

const Navigation: React.FC = () => {

    return (
        <div className="w-full flex flex-col text-text-primary">
            <FullWidthNavLink to='/' icon='fa-home' label='home'/>
            <FullWidthNavLink to='/current-queue' icon='fa-list-ol' label='current queue'/>
            <FullWidthNavLink to='/featured' icon='fa-kiss-wink-heart' label='featured'/>
            <FullWidthNavLink to='/artists' icon='fa-microphone' label='artists'/>
            <FullWidthNavLink to='/albums' icon='fa-compact-disc' label='albums'/>
        </div>
    );
}

export default Navigation;