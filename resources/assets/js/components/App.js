import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import './App.css';

import Nav from './Nav'

//companies
import Companies from './Companies';
import CompanyAdd from './CompanyAdd';
import CompanyEdit from './CompanyEdit';


export default class App extends Component {
    render() {
        return (
          <React.Fragment>  
            <Nav />
            <h1 className = "mx-auto w-25 mt-5">Welcome to react </h1>
          </React.Fragment>);
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(
    <Router>
        <div>
            
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path= '/companies' component = {Companies}/>
                <Route exact path= '/companies/add' component = {CompanyAdd}/>
                <Route exact path= '/companies/:id/edit/' component = {CompanyEdit}/>
            </Switch>
        </div>
        
    </Router>, document.getElementById('root')
    );
 }