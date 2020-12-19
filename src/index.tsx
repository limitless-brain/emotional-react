import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "./core/components/auth/provider/AuthProvider";
import {ThemeProvider} from "./core/theme";
import {CookiesProvider} from "react-cookie";
import {PlayerProvider} from "./core/components/player/provider/PlayerProvider";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <ThemeProvider>
                <AuthProvider>
                    <PlayerProvider>
                        <App/>
                    </PlayerProvider>
                </AuthProvider>
            </ThemeProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
