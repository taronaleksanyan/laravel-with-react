import React, {Component} from 'react';
import Nav from './Nav';
import axios from 'axios';
class CompanyAdd extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state = {
            msg:'Edit Company',
            msgClass: 'text-warning',
            company: {}
        }
        this.HandleOnSubmit =  this.HandleOnSubmit.bind(this);
    }

   componentDidMount() {
    axios.get(`/api/companies/${this.props.match.params.id}/editdata`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    }).then(res => {
        this.setState({
            company: res.data.data
        });
    });
   }

    HandleOnSubmit(event) {
        event.preventDefault();
        let form = document.forms.namedItem("ads");
        let formData = new FormData(form);
        axios.post(`/api/companies/${this.props.match.params.id}/update`, formData, {headers:{'Content-Type': 'multipart/form-data' }}).then(response => {
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
                    <input name = "name" placeholder = "Name" type = "text" defaultValue = {this.state.company.name}  />
                    <input name = "email" type = "email" placeholder = "E-MAIL" defaultValue = {this.state.company.email} />
                    <input name = "logo" type = "file"  ref = {this.inputFile} />
                    <input name = "website" type = "url" placeholder = "website" defaultValue = {this.state.company.website} />                                        
                    <button type = "submit">Add</button>                    
                </form>
            </React.Fragment>
        )
    }
}

export default CompanyAdd;