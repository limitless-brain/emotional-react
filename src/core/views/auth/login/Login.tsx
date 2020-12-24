import React, {useEffect, useState} from 'react';
import {ILoginCred, useAuth} from "../provider/AuthProvider";
import {handleInputOnChange, handleInputOnCheck} from "../../../utils/Utils";
import loginPng from './assets/login.png'
import {useNotification} from "../../notification/provider/NotificationProvider";

function Login() {

    const [cred, setCred] = useState({
        email: '',
        password: '',
        remember_me: false,
    } as ILoginCred)

    const [showPassword, setShowPassword] = useState(false)

    const nProvider = useNotification()

    const auth = useAuth()

    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        auth.login(cred).then(resp => {
            if (resp.status === 200)
                setTimeout(()=>{
                    window.location.reload()
                },3000)
            else
                console.log('response', resp)
        })
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleInputOnChange(event, cred, setCred)

    return (
        <div className="h-screen flex flex-col md:flex-row bg-bg-secondary justify-center items-center">
            <img className="h-96" src={loginPng}/>

            <div className="flex flex-col justify-center mx-6 space-y-4 items-center">
                <h1
                    className="select-none text-text-primary font-medium text-3xl">Emotional</h1>
                <form className="flex flex-col items-end shadow-around rounded-2xl" onSubmit={login}>
                    <div className="flex flex-row shadow rounded-t-2xl">
                        <div className="p-4 w-12">
                            <span className="fa fa-user text-text-primary"/>
                        </div>
                        <input
                            className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary bg-transparent px-4"
                            name="email" placeholder="Email" onChange={onChange} required/>
                        <div
                            className="p-4 w-12 rounded-tr-2xl shadow">
                            <span className="fa fa-check text-text-primary"/>
                        </div>
                    </div>
                    <div className="flex flex-row shadow">
                        <div className="p-4 w-12">
                            <span className="fa fa-lock text-text-primary"/>
                        </div>
                        <input type={!showPassword ? "password" : "text"}
                               className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary bg-transparent px-4"
                               name="password" placeholder="Password"
                               onChange={onChange} required/>
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-4 w-12 shadow hover:bg-primary focus:bg-primary cursor-pointer">
                        <span
                            className={`fa ${!showPassword ? "fa-eye" : "fa-eye-slash"}`}/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full shadow">
                        <div className="p-4 w-12">
                            <span className="fa fa-yin-yang text-text-primary"/>
                        </div>
                        <div className="inline-flex items-center w-full">
                            <span
                                className="px-4 select-none text-xl font-normal">Remember Me</span>
                        </div>
                        <div
                            className="p-4 w-12 inline-flex items-center shadow hover:bg-primary focus:bg-primary cursor-pointer"
                            onClick={() => {
                                cred.remember_me = !cred.remember_me
                                setCred({...cred})
                            }}>
                        <span
                            className={`fa ${!cred.remember_me ? 'fa-minus' : 'fa-check'} w-12 text-text-primary`}/>
                        </div>
                    </div>
                    <button
                        className="w-full p-4 focus:outline-none hover:bg-primary focus:bg-primary text-xl rounded-b-2xl font-medium uppercase"
                        type={"submit"}>Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;