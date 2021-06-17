import jwtDecode from 'jwt-decode';
import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const checkToken = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            return false
        }
        const tokenExp = jwtDecode(token).exp
        if (tokenExp < Date.now() / 1000) {
            localStorage.removeItem("token")
            return false
        }
        return true
    }
    return (
        <Route {...rest} render={props => (
            checkToken() ?
                <Component {...props} {...rest} />
                : <Redirect to="/" />
        )} />
    )
}

export default PrivateRoute
