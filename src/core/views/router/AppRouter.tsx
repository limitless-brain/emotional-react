import React, {ComponentProps} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from 'react-router-dom'

import {useAuth} from "../../providers/AuthProvider";
import Login from "../auth/login/Login";
import LeftBar from "../left-bar/LeftBar";
import RightBar from "../right-bar/RightBar";
import MiddleSection from "../middle-section/MiddleSection";
import Header from "../header/Header";
import Player from "../player/Player";
import Home from "../Home/Home";
import SignUp from "../auth/signup/SignUp";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const AppRouter: React.FC = () => {

    const auth = useAuth()

    return (
        <div className="w-screen h-screen flex flex-col transition-all duration-500">
            <div className="flex flex-col h-full w-full justify-center items-center">
                <div className="h-12"/>
                <Router>
                    <Route path='/'>
                        <AnimatedRoutes isLogin={auth.user.isLogin}/>
                    </Route>
                    {auth.user.isLogin ? (<LeftBar/>) : null}
                    {auth.user.isLogin ? (<RightBar/>) : null}
                </Router>
            </div>
            <div className="h-12"/>
            {auth.user.isLogin ? (<Header/>) : null}
            {auth.user.isLogin ? (<Player/>) : null}
        </div>
    );
}

const AnimatedRoutes: React.FC<{isLogin: boolean}> = (props) => {

    const location = useLocation()

    return (
        <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={450}>
                <Switch location={location}>
                    <PrivateRoute exact path="/" condition={props.isLogin} redirectTo="/login">
                        <Home/>
                    </PrivateRoute>
                    <PrivateRoute path="/login" condition={!props.isLogin} redirectTo="/">
                        <Login/>
                    </PrivateRoute>
                    <PrivateRoute path="/signup" condition={!props.isLogin} redirectTo="/">
                        <SignUp/>
                    </PrivateRoute>
                    <PrivateRoute path="/featured" condition={props.isLogin} redirectTo="/login">
                        <div className="flex flex-row h-full justify-center items-end">
                            <MiddleSection/>
                        </div>
                    </PrivateRoute>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
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