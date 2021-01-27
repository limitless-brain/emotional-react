import React from 'react';
import {DARK_THEME, DEFAULT_THEME, useTheme} from "../../theme";
import {useCookies} from "react-cookie";
import logo from '../../logo2.png'

const Header: React.FC = () => {

    const theme = useTheme()
    const [, setCookie,] = useCookies()

    const switchTheme = () => {
        theme.name = DARK_THEME === theme.name ? DEFAULT_THEME : DARK_THEME
        setCookie('theme', theme.name)
        theme.switchTheme(theme.name)
    }

    return (
        <div className="fixed h-12 w-full bg-bg-secondary rounded-b-2xl shadow transition-all duration-500">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row pl-4 h-12 justify-center items-center rounded-bl-2xl transition-all duration-500">
                    <p className="select-none text-2xl text-text-primary font-bold">Emotional</p>
                </div>
                <div className="flex flex-row w-80 divide-x justify-end items-center">
                    <div
                        className="hidden h-12 pl-2 md:flex md:flex-row justify-center items-center shadow-inverse">
                        <input type="text" id="search" placeholder="Search"
                               className="mx-2 bg-bg-secondary outline-none focus:outline-none text-text-primary transition-all duration-500"/>
                    </div>
                    <button
                        onClick={switchTheme}
                        className="h-12 w-12 border-none outline-none focus:outline-none text-text-primary shadow-inverse hover:bg-action-hover transition-all duration-500">
                        <i className={`fa ${theme.name === DARK_THEME ? 'fa-moon' : 'fa-sun'}`}/>
                    </button>
                    <button
                        className="h-12 w-12 border-none outline-none focus:outline-none text-text-primary rounded-br-2xl shadow-inverse hover:bg-action-hover transition-all duration-500">
                        <i className="fa fa-info"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;