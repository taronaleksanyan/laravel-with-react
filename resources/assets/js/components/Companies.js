import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Company from './Company';

class Companies extends Component{
  constructor(props) {
    super(props);
    this.state = {
        companies: ['Arto', 'Vahan']
    };
  }
  
  
  render() {
   let companies =  this.state.companies.map( (value, i) => {
        return (<Company name = {value} key = {i} id = {i+1} />);
    });
        return (
            <React.Fragment>
                <div className = "companies-wrap">
                <h1>Companies <Link to = "/companies/add" className = "crud-btn">Add new</Link> </h1>
                {companies}
                </div>
            </React.Fragment>
        );
    }
}

export default Companies;