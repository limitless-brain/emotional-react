import React, {useEffect} from 'react';
import './core/css/main.css'
import {DEFAULT_THEME, useTheme} from "./core/theme";
import AppRouter from "./core/views/router/AppRouter";
import {useCookies} from "react-cookie";


function App() {

    const theme = useTheme()

    const [cookie, setCookie] = useCookies()

    // one time update
    useEffect(() => {
        // check if theme is initialized before
        if (typeof cookie['theme'] === "undefined") {
            // initialize base theme
            theme.name = DEFAULT_THEME
            setCookie('theme', DEFAULT_THEME)
        } else {
            theme.name = cookie['theme']
        }
        // switch theme
        theme.switchTheme(theme.name)
    })

    return (
        <AppRouter/>
    );
}

export default App;
