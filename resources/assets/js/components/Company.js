import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Company extends Component {

    render() {
        let editUrl = `/companies/${this.props.id}/edit`;
     return (  
        <React.Fragment>
            <div className = "company-name-wrap">
                <span className = "company-name"> {this.props.name} </span>
                <Link to = {editUrl}  className = "crud-btn">edit</Link>
                <span className = "crud-btn">delete</span>
            </div>
        </React.Fragment>
     );
    }

}

export default Company;