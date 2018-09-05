import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit(event){
        event.preventDefault();
        axios.post('/login', {})
    }
    render() {
        let editUrl = `/employees/${this.props.id}/edit`;
        
     return (  
        <React.Fragment>
            <Nav />
            <form onSubmit = {this.handleOnSubmit} className = "container mt-5" >
                <h2>Login</h2>
                <input type = "email" placeholder = "E-mail" />
                <input type = "password" placeholder = "Pasword" />
                <input type = "submit" defaultValue = "log in" />            
            </form>
        </React.Fragment>
     );
    }

}

export default Login;