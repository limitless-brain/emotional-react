import React, {createContext, useContext, useEffect, useState} from "react";
import Api from "../../../api/Api";
import {AxiosResponse} from "axios";
import {useNotification} from "../../notification/provider/NotificationProvider";

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
    signup: (cred: ISignUpCred) => Promise<AxiosResponse<any>>,
    login: (cred: ILoginCred) => Promise<AxiosResponse<any>>,
    logout: () => Promise<AxiosResponse<any>>,
    getProfile: (id?: string) => Promise<AxiosResponse<any>>,
}

const authContext = createContext({} as IAuthContext)

function useAuthProvider() {

    const [user, setUser] = useState({} as IUser)

    const nProvider = useNotification()

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
                console.log(resp.data)
                user.isLogin = true
                getProfile()
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

    const getProfile = (id?: string) => {
        return Api.auth.profile(id)
            .then(resp => {
                console.log(resp.data)
                user.profile = resp.data
                nProvider.notify(`Hello, ${user.profile.name}`, "info")
                return resp
            })
            .catch(e => {
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
                console.log(resp.data)
                user.isLogin = false
                return resp
            })
            .catch(e => {
                console.log(e.response.data)
                nProvider.notify(user.error, "error")
                return e
            })
            .finally(() => {
                setUser(user)
            })
    }

    useEffect(() => {
        // todo update the state through callback
        setTimeout(() => {
            user.isLogin = !user.isLogin
            setUser(user)
            console.log('redraw')
        }, 3000)
    }, [user])

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
