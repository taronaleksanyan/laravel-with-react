import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.hanndleLogout = this.hanndleLogout.bind(this);
    
    }

   

    hanndleLogout() {
        localStorage.clear();
        this.props.changeAuth(false);
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Laravel
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label=""
                        >
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/companies/paginate/1"
                                    >
                                        Companies
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/employees/paginate/1"
                                    >
                                        Employees
                                    </Link>
                                </li>
                                {this.props.isAuth ? (
                                    <li className="nav-item">
                                        <span
                                            className=" btn nav-link"
                                            onClick={this.hanndleLogout}
                                        >
                                            Logout
                                        </span>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default Nav;
