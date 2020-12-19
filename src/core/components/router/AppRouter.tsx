import React, {ComponentProps} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import {useAuth} from "../auth/provider/AuthProvider";
import Login from "../auth/login/Login";
import Home from "../home/Home";

const AppRouter: React.FC<ComponentProps<any>> = () => {

    const auth = useAuth()

    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/login" condition={!auth.user.isLogin} redirectTo="/">
                    <Login/>
                </PrivateRoute>
                <PrivateRoute exact path="/" condition={auth.user.isLogin} redirectTo="/login">
                    <Home/>
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

const PrivateRoute: React.FC<ComponentProps<any>> = ({children, condition, redirectTo, ...rest}) => {

    return (
        <Route
            {...rest}
            render={({location}) => {
                return condition ?
                    (children) :
                    (<Redirect to={{
                        pathname: redirectTo,
                        state: {from: location.state}
                    }}/>)
            }}
        />
    )
}

export default AppRouter;