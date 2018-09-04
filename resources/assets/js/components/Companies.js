import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Company from './Company';

import Nav from './Nav';
import axios from 'axios';


class Companies extends Component{
  constructor(props) {
    super(props);
    this.state = {
        companies: [],
        msg:'Create new Company'
    };
    this.deleteCompany = this.deleteCompany.bind(this);
  }

  componentDidMount() {
    axios.get('api/companies/all').then(res => {
        
        this.setState({
            companies: res.data.data
        });
    });
    
   
  }
  deleteCompany(url) {
    axios.delete(url).then(res => {
        let arr = this.state.companies;
        console.log(res.data);
       arr =  arr.filter(value => {
            return value.id !== res.data
        });
        this.setState({
            companies:arr
        });
    });
  }
  
  render() {
   let companies =  this.state.companies.map( (value,i) => {
        return (<Company name = {value.name}  key = {value.id} id = {value.id} del = {this.deleteCompany} />);
    });
        return (
            <React.Fragment>
                <Nav />
                <div className = "container mt-5">
                <h1>Companies <Link to = "/companies/add" className = "btn btn-success">Add new</Link> </h1>
                {companies}
                </div>
            </React.Fragment>
        );
    }
}

export default Companies;