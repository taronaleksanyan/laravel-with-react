import React, { Component } from "react";
import { Link } from "react-router-dom";
import sendRequest from "./dataService";
import Nav from "./Nav";
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        sendRequest("/api/login", "POST", data, false).then(res => {
            localStorage.setItem("token", res.data.token);
            console.log(localStorage.getItem("token"));
            this.props.changeAuth(true);
        });
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleOnSubmit} className="container mt-5">
                    <h2>Login</h2>
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        onChange={this.handleOnChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Pasword"
                        onChange={this.handleOnChange}
                    />
                    <input type="submit" defaultValue="log in" />
                </form>
            </React.Fragment>
        );
    }
}

export default Login;
