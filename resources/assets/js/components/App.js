import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Nav from "./Nav";
import Home from "./Home";

//companies
import Companies from "./Companies";
import CompanyAdd from "./CompanyAdd";
import CompanyEdit from "./CompanyEdit";

//employees

import Employees from "./Employees";
import EmployeAdd from "./EmployeAdd";
import EmployeEdit from "./EmployeEdit";

import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: !!localStorage.getItem("token")
        };
        this.changeAuth = this.changeAuth.bind(this);
    }
    changeAuth(auth) {
        console.log(auth,'auth');
        
        this.setState({ isAuth: auth });
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Nav
                            changeAuth={this.changeAuth}
                            isAuth={this.state.isAuth}
                        />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PrivateRoute
                                path="/companies/paginate/:p"
                                isAuth={this.state.isAuth}
                                component={Companies}
                            />
                            <PrivateRoute
                                exact
                                path="/companies/add"
                                isAuth={this.state.isAuth}
                                component={CompanyAdd}
                            />
                            <PrivateRoute
                                exact
                                path="/companies/:id/edit/"
                                isAuth={this.state.isAuth}
                                component={CompanyEdit}
                            />
                            <PrivateRoute
                                exact
                                path="/employees/paginate/:p"
                                isAuth={this.state.isAuth}
                                component={Employees}
                            />
                            <PrivateRoute
                                exact
                                path="/employees/add"
                                isAuth={this.state.isAuth}
                                component={EmployeAdd}
                            />
                            <PrivateRoute
                                exact
                                path="/employees/:id/edit/"
                                isAuth={this.state.isAuth}
                                component={EmployeEdit}
                            />
                            <PublicRoute
                                exact
                                path="/login"
                                component={Login}
                                changeAuth={this.changeAuth}
                                isAuth={this.state.isAuth}
                            />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
