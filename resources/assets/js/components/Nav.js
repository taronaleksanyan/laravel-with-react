import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <React.Fragment>
                 <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                    <div className="container">
                        <Link className="navbar-brand"  to="/">
                            Laravel
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <ul className="navbar-nav ml-auto">
                                    
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/companies">Companies</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Employees</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Login</Link>
                                    </li>     
                            </ul>
                        </div>
                    </div>
                </nav>
        </React.Fragment>
        );
    }
} 

export default  Nav;