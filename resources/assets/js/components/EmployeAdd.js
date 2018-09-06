import React, {Component} from 'react';
import Nav from './Nav';
import axios from 'axios';
class EmployeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:'Create new Employe',
            msgClass: 'text-primary',
            Employe: {},
            companies: []
        }
        this.HandleOnSubmit =  this.HandleOnSubmit.bind(this);
    }

   componentDidMount() {


    axios.get('/api/companies/all',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    }).then(res => {
        this.setState({
            companies: res.data.data
        });
    });

   }

    HandleOnSubmit(event) {
        event.preventDefault();
        let form = document.forms.namedItem("ads");
        let formData = new FormData(form);
        axios.post(`/api/employees/create`, formData).then(response => {
            this.setState({
                msg:response.data,
                msgClass:'text-success'
            });
        
        });
        
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <form onSubmit = {this.HandleOnSubmit} name='ads' className = "container mt-5">
                    <h2 className = {this.state.msgClass}>{this.state.msg}</h2>
                    <input name = "firstName" placeholder = "First name" type = "text" defaultValue = {this.state.Employe.firstName}  />
                    <input name = "lastName" type = "text" placeholder = "Last name" defaultValue = {this.state.Employe.lastName} />
                    <input name = "email" type = "email" placeholder = "E-MAIL" defaultValue = {this.state.Employe.email} />
                    <select name = "company">
                    {
                        this.state.companies.map(value => {
                            return <option key = {value.id} value = {value.id}> {value.name} </option>
                        })
                    }
                    </select>
                    <input name = "phone" type = "text" placeholder = "Phone" defaultValue = {this.state.Employe.phone} />                                        
                    <button type = "submit">Add</button>                    
                </form>
            </React.Fragment>
        )
    }
}

export default EmployeAdd;