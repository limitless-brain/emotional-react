import React, {createContext, useContext, useEffect, useState} from "react";
import Api from "../api/Api";
import axios, {AxiosResponse} from "axios";
import {useNotification} from "./NotificationProvider";
import {useCookies} from "react-cookie";
import firebase from "firebase";
import {DEBUG, XSRF_COOKIE} from "../config";

export interface ISignUpCred {
    username: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export interface ILoginCred {
    email: string,
    password: string,
    remember_me: boolean,
}

interface IUser {
    isLogin: boolean,
    isSignUp: boolean,
    profile: any,
    error: string
}

interface IAuthContext {
    user: IUser,
    signup: (cred: ISignUpCred) => Promise<AxiosResponse>,
    login: (cred: ILoginCred) => Promise<AxiosResponse>,
    logout: () => Promise<AxiosResponse>,
    getProfile: (id?: string, notify?: boolean) => Promise<AxiosResponse>,
}

const authContext = createContext({} as IAuthContext)


// initialize firebase app
if (firebase.apps.length < 1)
    firebase.initializeApp({
        apiKey: "AIzaSyD31JH1yv_7AwSA2hEqJsRIu9mohsHH-Ic",
        authDomain: "sincere-night-252015.firebaseapp.com",
        projectId: "sincere-night-252015",
        storageBucket: "sincere-night-252015.appspot.com",
        messagingSenderId: "800472623092",
        appId: "1:800472623092:web:8278619ae666057811fba1",
        measurementId: "G-MBB542LN8H"
    })

function useAuthProvider() {

    const [user, setUser] = useState({} as IUser)

    const [cookie, , removeCookie] = useCookies()

    const nProvider = useNotification()

    // user.isLogin = cookie['XSRF-TOKEN'] !== undefined
    // setUser({...user})

    axios.interceptors.response.use(undefined, error => {
        if (error.response) {
            // the request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
                // unauthorized, make sure we don't have access token
                if (cookie[XSRF_COOKIE]) {
                    removeCookie(XSRF_COOKIE)
                }
            }
        }
        return Promise.reject(error)
    })

    const signup = async (credentials: ISignUpCred) => {
        return await Api.auth.signup(credentials)
            .then(resp => {
                user.isSignUp = true
                nProvider.notify("Successfully signed up.", "success")
                return resp
            })
            .catch(e => {
                user.isSignUp = false
                user.error = e.response.data
                nProvider.notify(e.response.data.message, "error")
                return e
            })
            .finally(() => {
                setUser(user)
            })
    }

    const login = (credentials: ILoginCred) => {
        return Api.auth.login(credentials)
            .then(resp => {
                if (DEBUG)
                    console.log(resp.data)
                user.isLogin = true
                getProfile().then()
                return resp
            })
            .catch(e => {
                user.isLogin = false
                if (!e.response) {
                    user.error = 'Network Error'
                    nProvider.notify(user.error, "error")
                } else {
                    user.error = e.response.data.message;
                    nProvider.notify(user.error, "error")
                }
                return e
            })
            .finally(() => {
                setUser(user)
            })
    }

    const getProfile = (id?: string, notify = true) => {
        return Api.auth.profile(id)
            .then(resp => {
                if (DEBUG)
                    console.log(resp.data)
                user.profile = resp.data
                if (notify)
                    nProvider.notify(`Hello, ${user.profile.name}`, "info")
                return resp
            })
            .catch(e => {
                if (DEBUG)
                    console.log(e.response)
                user.error = e.response.data
                nProvider.notify(user.error, "error")
                return e
            })
            .finally(() => {
                setUser(user)
            })
    }

    const logout = () => {
        return Api.auth.logout()
            .then(resp => {
                if (DEBUG)
                    console.log(resp.data)
                user.isLogin = false
                removeCookie(XSRF_COOKIE)
                return resp
            })
            .catch(e => {
                if (DEBUG)
                    console.log(e.response.data)
                nProvider.notify(user.error, "error")
                return e
            })
            .finally(() => {
                setUser(user)
            })
    }

    // one time update
    useEffect(()=> {
        // check if we know login state
        if(user.isLogin !== (cookie['XSRF-TOKEN'] !== undefined)) {
            // update the user
            user.isLogin = (cookie['XSRF-TOKEN'] !== undefined)
            setUser({...user})
        }
    }, [cookie, user])

    return {
        user,
        getProfile,
        login,
        signup,
        logout
    }
}

export const useAuth = () => {
    return useContext(authContext)
}

export const AuthProvider: React.FC = ({children}) => {
    const auth = useAuthProvider()
    return (<authContext.Provider value={auth}>{children}</authContext.Provider>)
}
