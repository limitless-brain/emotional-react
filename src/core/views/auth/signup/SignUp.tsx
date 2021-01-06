import React, {useState} from 'react';
import signupPng from "./assets/signup.png";
import {ISignUpCred, useAuth} from "../../../providers/AuthProvider";
import {useNotification} from "../../../providers/NotificationProvider";
import {handleInputOnChange} from "../../../utils/Utils";
import {NavLink, useHistory} from 'react-router-dom';

function SignUp() {

    const [cred, setCred] = useState({
        email: "", password: "", password_confirmation: "", username: ""
    } as ISignUpCred)

    const nProvider = useNotification()

    const auth = useAuth()

    const history = useHistory()

    const signup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (typeof cred.password !== "undefined" && typeof cred.password_confirmation !== "undefined") {
            if (cred.password !== cred.password_confirmation) {
                nProvider.notify('Password fields not match', 'error')
                return
            }
        }

        auth.signup(cred).then(resp => {
            if (resp.status === 201)
                auth.login({email: cred.email, password: cred.password, remember_me: false})
                    .then(resp => {
                        if (resp.status === 200) {
                            setTimeout(() => {
                                history.push('/')
                            }, 1000)
                        }
                    })
        })
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleInputOnChange(event, cred, setCred)


    return (
        <div
            className="absolute h-screen flex flex-col text-text-primary md:flex-row justify-center items-center">
            <img className="h-96" src={signupPng} alt={''}/>

            <div className="flex flex-col w-80 justify-center mx-6 space-y-4 items-center">
                <h1
                    className="select-none font-medium text-3xl">Emotional</h1>
                <form className="flex flex-col items-end shadow-around rounded-2xl" onSubmit={signup}>
                    <div className="flex flex-row shadow rounded-t-2xl">
                        <div className="p-4 w-12">
                            <span className="fa fa-user"/>
                        </div>
                        <input
                            onChange={onChange}
                            className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary bg-transparent px-4"
                            name="name" placeholder="Name" required/>
                    </div>
                    <div className="flex flex-row shadow">
                        <div className="p-4 w-12">
                            <span className="fa fa-user"/>
                        </div>
                        <input
                            onChange={onChange}
                            className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary bg-transparent px-4"
                            name="email" placeholder="Email" required/>
                    </div>
                    <div className="flex flex-row shadow">
                        <div className="p-4 w-12">
                            <span className="fa fa-lock"/>
                        </div>
                        <input type={"password"}
                               onChange={onChange}
                               className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary bg-transparent px-4"
                               name="password" placeholder="Password"
                               required/>
                    </div>
                    <div className="flex flex-row shadow">
                        <div className="p-4 w-12">
                            <span className="fa fa-lock"/>
                        </div>
                        <input type={"password"}
                               onChange={onChange}
                               className="w-full text-xl font-normal focus:outline-none focus:bg-bg-primary bg-transparent px-4"
                               name="password_confirmation" placeholder="Repeat Password"
                               required/>
                    </div>
                    <button
                        onClick={event => {
                            (event.target as HTMLButtonElement).blur()
                        }}
                        className="w-full p-4 focus:outline-none hover:bg-action-hover focus:bg-primary text-xl rounded-b-2xl font-medium uppercase"
                        type={"submit"}>sign up
                    </button>
                </form>
                <div className="flex flex-row space-x-4 font-normal select-none">
                    <span>Already have an account?</span>
                    <NavLink
                        to={'/login'}
                        className="uppercase hover:text-action-hover font-semibold">login</NavLink>
                </div>
            </div>
        </div>
    );
}

export default SignUp;