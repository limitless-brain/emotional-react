import React, {useState} from 'react';
import {ILoginCred, useAuth} from "../provider/AuthProvider";
import {handleInputOnChange, handleInputOnCheck} from "../../../utils/Utils";

function Login() {

    const [cred, setCred] = useState({
        email: '',
        password: '',
        remember_me: false,
    } as ILoginCred)

    const [showPassword, setShowPassword] = useState(false)

    const auth = useAuth()

    const login = (event: React.MouseEvent) => {
        event.preventDefault()

        auth.login(cred).then(resp => {
            if (resp.status === 200)
                window.location.reload()
        })
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleInputOnChange(event, cred, setCred)

    const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => handleInputOnCheck(event, cred, setCred)

    return (
        <div className="flex flex-col justify-center items-center">
            <form>
                <div>
                    <span className="fa fa-user text-text-primary"/>
                    <input name="email" placeholder="Email" onChange={onChange}/>
                </div>
                <div>
                    <span className="fa fa-lock"/>
                    <input type={!showPassword ? "password" : "text"} name="password" placeholder="Password"
                           onChange={onChange}/>
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className={`fa ${!showPassword ? "fa-eye" : "fa-eye-slash"}`}/>
                </div>
                <div>
                    <input type="checkbox" name="remember_me" onChange={onCheck}/>
                    <span className="">Remember Me</span>
                </div>
                <button onClick={login}>Login</button>
            </form>
        </div>
    );
}

export default Login;