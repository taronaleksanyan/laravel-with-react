import React, {Component} from 'react';
import axios from 'axios';
class CompanyEdit extends Component {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        console.log(id);
        this.state = {
            newCompany: {
                name:'',
                email: '',
                logo:  '',
                website: ''
            },

        }
        this.HandleOnChange = this.HandleOnChange.bind(this);
        this.HandleOnSubmit =  this.HandleOnSubmit.bind(this);
    }

    HandleOnChange(e){
        let newObj = this.state.newCompany;
        newObj[e.target.name] = e.target.value;
        this.setState({
            newCompany: newObj
        })
    }

    HandleOnSubmit(event) {
        event.preventDefault();
        const company = this.state.newCompany;
        axios.post('/api/companies/create', {company}).then(res => {
            console.log(res.data);
        }); 
        
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit = {this.HandleOnSubmit}>
                    <input name = "name" placeholder = "Name" type = "text" onChange = {this.HandleOnChange} />
                    <input name = "email" type = "email" placeholder = "E-MAIL" onChange = {this.HandleOnChange} />
                    <input name = "logo" type = "logo" placeholder = "logo" onChange = {this.HandleOnChange} />
                    <input name = "url" type = "website" placeholder = "website" onChange = {this.HandleOnChange} />                                        
                    <button type = "submit">Add</button>                    
                </form>
            </React.Fragment>
        )
    }
}

export default CompanyEdit;