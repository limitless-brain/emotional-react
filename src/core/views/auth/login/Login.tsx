import React, {useState} from 'react';
import {ILoginCred, useAuth} from "../../../providers/AuthProvider";
import {handleInputOnChange} from "../../../utils/Utils";
import loginPng from './assets/login.png'
import {NavLink, useHistory} from "react-router-dom";

function Login() {

    const [cred, setCred] = useState({
        email: '',
        password: '',
        remember_me: false,
    } as ILoginCred)

    const [showPassword, setShowPassword] = useState(false)

    const auth = useAuth()

    const history = useHistory()

    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        auth.login(cred).then(resp => {
            if (resp.status === 200)
                setTimeout(() => {
                    history.push('/featured')
                },1000)
        })
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleInputOnChange(event, cred, setCred)

    return (
        <div className="absolute h-screen py-4 flex flex-col md:flex-row text-text-primary justify-center items-center">
            <img alt={''} className="h-48 sm:h-96" src={loginPng}/>

            <div className="flex flex-col justify-center mx-6 space-y-4 items-center">
                <form className="flex flex-col w-80 items-end shadow-around rounded-2xl" onSubmit={login}>
                    <div className="flex flex-row w-full shadow rounded-t-2xl">
                        <div className="p-4 w-12">
                            <span className="fa fa-user"/>
                        </div>
                        <input
                            className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary rounded-tr-2xl bg-transparent px-4"
                            name="email" placeholder="Email" onChange={onChange} required/>
                    </div>
                    <div className="flex flex-row shadow">
                        <div className="p-4 w-12">
                            <span className="fa fa-lock"/>
                        </div>
                        <input type={!showPassword ? "password" : "text"}
                               className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary bg-transparent px-4"
                               name="password" placeholder="Password"
                               onChange={onChange} required/>
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-4 w-12 hover:bg-action-hover focus:bg-action-selected cursor-pointer">
                        <span
                            className={`fa ${!showPassword ? "fa-eye" : "fa-eye-slash"}`}/>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            cred.remember_me = !cred.remember_me
                            setCred({...cred})
                        }}
                        className="group flex flex-row w-full shadow cursor-pointer hover:bg-action-hover transition-all duration-500">
                        <div
                            className="p-4 w-12 inline-flex items-center">
                        <span
                            className={`fa ${!cred.remember_me ? 'fa-minus' : 'fa-check'} w-12`}/>
                        </div>
                        <div className="flex items-center w-full">
                            <span
                                className="p-4 select-none text-xl font-normal opacity-50 group-hover:opacity-100">Remember Me</span>
                        </div>
                    </div>
                    <button
                        className="w-full p-4 focus:outline-none hover:bg-action-hover focus:bg-action-selected text-xl rounded-b-2xl font-medium uppercase"
                        type={"submit"}>Login
                    </button>
                </form>
                <div className="flex flex-row space-x-4 font-normal select-none">
                    <span>Don't have an account?</span>
                    <NavLink
                        to={'/signup'}
                        className="uppercase hover:text-action-hover font-semibold">sign up</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Login;