import React, {createContext, useContext, useEffect, useState} from "react";
import Api from "../api/Api";
import axios, {AxiosResponse} from "axios";
import {useNotification} from "./NotificationProvider";
import {useCookies} from "react-cookie";
import firebase from "firebase";
import {DEBUG, FIREBASE_INITIALIZE_OPTIONS, XSRF_COOKIE} from "../config";

export interface ISignUpCred {
    name: string,
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
if (!firebase.apps.length) {

    firebase.initializeApp(FIREBASE_INITIALIZE_OPTIONS)

    // get the Analytics service for the default app
    firebase.analytics()
}

function useAuthProvider() {

    const [user, setUser] = useState({} as IUser)

    const [cookie, , removeCookie] = useCookies()

    const nProvider = useNotification()

    axios.interceptors.response.use(undefined, error => {
        if (error.response) {
            // the request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
                // unauthorized, make sure we don't have access token
                if (cookie[XSRF_COOKIE]) {
                    removeCookie(XSRF_COOKIE)
                    window.location.reload()
                }
            }
        }
        return Promise.reject(error)
    })

    const createFirebaseAccount = async (credentials: ISignUpCred) => {

        // hold credentials in case the promise takes a long time
        // and the component unmounted
        const fbCred = {...credentials}

        return new Promise(() => {
            firebase.auth()
                .createUserWithEmailAndPassword(fbCred.email, fbCred.password)
                .then(fbUser => {

                    // get user object
                    let userRef = firebase.auth().currentUser

                    // update the profile
                    userRef?.updateProfile({displayName: fbCred.name})
                        .then(() => {
                            // add record to firestore with user information
                            firebase.firestore().collection('users')
                                .doc(fbUser.user?.uid).set({
                                uid: fbUser.user?.uid,
                                email: fbUser.user?.email,
                                emailVerified: fbUser.user?.emailVerified,
                                name: fbCred.name,
                                photo: fbUser.user?.photoURL
                            })
                                .then()
                                .catch(error => {
                                    console.log(`write document error: ${error.response}`)
                                })

                        }, error => {
                            console.log(`update profile error: ${error.response}`)
                        })
                }).catch(error => {

                console.log(`create account error: ${error}`)
            })
        })
    }

    const signup = async (credentials: ISignUpCred) => {
        return await Api.auth.signup(credentials)
            .then(resp => {
                user.isSignUp = true
                createFirebaseAccount(credentials)
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

                if (firebase.auth().currentUser === null)
                    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
                        .then()
                        .catch(error => {
                            console.log(error)
                        })

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
                firebase.auth().signOut().then()
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
    useEffect(() => {
        // check if we know login state
        if (user.isLogin !== (cookie['XSRF-TOKEN'] !== undefined)) {
            // update the user
            user.isLogin = (cookie['XSRF-TOKEN'] !== undefined)

            // log out from firebase when there is no token
            if (!user.isLogin)
                firebase.auth().signOut().then()

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

export const AuthProvider: React.FC = (props) => {
    const auth = useAuthProvider()
    return (<authContext.Provider value={auth}>{props.children}</authContext.Provider>)
}
