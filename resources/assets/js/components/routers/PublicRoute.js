import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuth ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} {...rest} isAuth={isAuth} />
                )
            }
        />
    );
};

export default PublicRoute;
