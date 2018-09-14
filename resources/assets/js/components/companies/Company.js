import React, { Component } from "react";
import { Link } from "react-router-dom";

class Company extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick() {
        this.props.delete(this.props.id);
    }
    
    render() {
        let editUrl = `/companies/${this.props.id}/edit`;

        return (
            <React.Fragment>
                <div className="mt-2">
                    <span className="btn btn-primary"> {this.props.name} </span>
                    <Link to={editUrl} className=" ml-5 btn btn-warning">
                        edit
                    </Link>
                    <span
                        onClick={this.handleDeleteClick}
                        className="btn btn-danger"
                    >
                        delete
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

export default Company;
