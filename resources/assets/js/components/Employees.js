import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Employe from './Employe';

import Nav from './Nav';
import axios from 'axios';


class Employees extends Component{
  constructor(props) {
    super(props);
    let currentPage = this.props.match.params.p;
    this.state = {
        employees: [],
        page:currentPage,
        last:1
    };
    this.next = this.next.bind(this);
    this.deleteEmploye = this.deleteEmploye.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/employees/paginate?page=${this.state.page}`).then(res => {
        console.log(res);
        
        this.setState({
            employees: res.data.data,
            last:res.data.last_page
        });
    });
    
   
  }
  deleteEmploye(url) {
    axios.delete(url).then(res => {
        let arr = this.state.employees;
        console.log(res.data);
       arr =  arr.filter(value => {
            return value.id !== res.data
        });
        this.setState({
            employees:arr
        });
    });
  }
  
  next(event){
    let page = event.target.innerHTML;
    axios.get(`/api/employees/paginate?page=${page}`).then(res => {
        console.log(res.data);        
        this.setState({
            employees: res.data.data,
            last:res.data.last_page,
            page:page
        });
    });
    this.setState({
        page:page
    })
  }

  render() {
   let employees =  this.state.employees.map( (value,i) => {
        return (<Employe name = {value.firstName}  key = {value.id} id = {value.id} del = {this.deleteEmploye} />);
    });

    let buttons = [];
    for(let i = 1; i<= this.state.last; i++) {
        buttons.push(i);
    }
    buttons = buttons.map( (value, i ) => {
        return (<Link className = "btn btn-default" key = {i+'01001000'} to =  {`/employees/paginate/${i+1}`} onClick = {this.next}>{value}</Link>)
    })

    
        return (
            <React.Fragment>
                <Nav />
                <div className = "container mt-5">
                <h1>employees <Link to = "/employees/add" className = "btn btn-success">Add new</Link> </h1>
                {employees}
                <div className = "mt-3" >
                {buttons}
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Employees;