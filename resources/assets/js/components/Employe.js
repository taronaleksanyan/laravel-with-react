import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Employe extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(){
        let deleteUrl = `/api/employees/${this.props.id}/delete`;
        this.props.del(deleteUrl);
    }
    render() {
        let editUrl = `/employees/${this.props.id}/edit`;
        
     return (  
        <React.Fragment>
            <div className = "mt-2">
                <span className = "btn btn-primary"> {this.props.name} </span>
                <Link to = {editUrl}  className = " ml-5 btn btn-warning">edit</Link>
                <span onClick = {this.handleDeleteClick} className = "btn btn-danger">delete</span>
            </div>
        </React.Fragment>
     );
    }

}

export default Employe;