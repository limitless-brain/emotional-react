import React, {useEffect, useState} from 'react';
import './core/css/main.css'
import {DARK_THEME, DEFAULT_THEME} from "./core/theme";
import {applyTheme} from "./core/theme/utils";
import Player from "./core/components/home/Player";
import Api from "./core/api/Api";

function App() {

    const [theme, setTheme] = useState(DEFAULT_THEME)

    const login = (event: React.MouseEvent) => {
        event.preventDefault()
        Api.auth.login({
            email: 'abby45@example.com',
            password: 'password',
            'remember_me': false
        }).then(resp => {
            console.log(resp)
        }).catch(e => {
            console.log(e.response)
        })
    }

    const user = (event: React.MouseEvent) => {
        event.preventDefault()
        Api.auth.profile()
            .then(resp => {
                console.log(resp)
            })
            .catch(e => {
                console.log(e.response)
            })
    }

    const switchTheme = (event: React.MouseEvent) => {
        event.preventDefault()
        setTheme(DARK_THEME === theme ? DEFAULT_THEME : DARK_THEME)
    }

    useEffect(() => {
        applyTheme(theme)
    }, [theme])

    return (
        <div>
            <button onClick={login}>Login</button>
            <button onClick={user}>Profile</button>
            <button onClick={switchTheme}>Switch Theme</button>
            <Player time={1}/>
        </div>
    );
}

export default App;
