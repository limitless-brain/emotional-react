import React, {useEffect} from 'react';
import './core/css/main.css'
import {DARK_THEME, DEFAULT_THEME, useTheme} from "./core/theme";
import AppRouter from "./core/views/router/AppRouter";
import {useAuth} from "./core/views/auth/provider/AuthProvider";
import {useCookies} from "react-cookie";


function App() {

    const auth = useAuth()
    const theme = useTheme()

    const [cookie, setCookie, removeCookie] = useCookies()

    auth.user.isLogin = cookie['XSRF-TOKEN'] !== undefined

    // one time update
    useEffect(() => {
        if (cookie['theme'] === undefined)
            setCookie('theme', DEFAULT_THEME)

        theme.name = cookie['theme']

        // did mount
        theme.switchTheme(theme.name)
        // did unmount
        return () => {

        }
    })

    return (
            <AppRouter/>
    );
}

export default App;
