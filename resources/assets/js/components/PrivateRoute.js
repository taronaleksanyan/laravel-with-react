
import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component,  isAuth, ...rest }) => {
    console.log('IS AUTH', isAuth);
    
    return (
        <Route
            {...rest}
            render={props => isAuth ? (
                <Component {...props} {...rest} isAuth={isAuth} />
            ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default PrivateRoute;