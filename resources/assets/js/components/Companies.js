import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Company from './Company';

import Nav from './Nav';
import axios from 'axios';


class Companies extends Component{
  constructor(props) {
    super(props);
    let currentPage = this.props.match.params.p;
    this.state = {
        companies: [],
        page:currentPage,
        last:1
    };
    this.deleteCompany = this.deleteCompany.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
      
    axios.get(`/api/companies/all`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    }
    ).then(res => {        
        this.setState({
            companies: res.data.data,
            last:res.data.last_page,
        });
    });
    
   
  }
  deleteCompany(url) {
    axios.delete(url).then(res => {
        let arr = this.state.companies;
       arr =  arr.filter(value => {
            return value.id !== res.data
        });
        this.setState({
            companies:arr
        });
    });
  }

  next(event){
    let page = event.target.innerHTML;
    axios.get(`/api/companies/paginate?page=${page}`).then(res => {
        
        this.setState({
            companies: res.data.data,
            last:res.data.last_page,
        });
    });
    this.setState({
        page:page
    })
  }
  
  render() {
   let companies =  this.state.companies.map( (value,i) => {
        return (<Company name = {value.name}  key = {value.id} id = {value.id} del = {this.deleteCompany} />);
    });
    let buttons = [];
    for(let i = 1; i<= this.state.last; i++) {
        buttons.push(i);
    }
    buttons = buttons.map( (value, i ) => {
        return (<Link className = "btn btn-default" key = {i+'0000'} to =  {`/companies/paginate/${i+1}`} onClick = {this.next}>{value}</Link>)
    })
        return (
            <React.Fragment>
                <div className = "container mt-5">
                <h1>Companies <Link to = "/companies/add" className = "btn btn-success">Add new</Link> </h1>
                {companies}
                <div className = "mt-3" >
                {buttons}
                </div>
                </div>

            </React.Fragment>
        );
    }
}

export default Companies;