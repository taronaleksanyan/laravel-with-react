import React, { Component } from "react";
import { Link } from "react-router-dom";
import Employe from "./Employe";
import PaginateButton from "../PaginateButton";

import sendRequest from "../dataService";

class Employees extends Component {
    constructor(props) {
        super(props);
        let currentPage = this.props.match.params.p;
        this.state = {
            employees: [],
            page: currentPage,
            last: 1
        };
        this.nextPage = this.nextPage.bind(this);
        this.deleteEmploye = this.deleteEmploye.bind(this);
    }

    componentDidMount() {
        sendRequest(`/api/employees?page=1`).then(res => {
            this.setState({
                employees: res.data.data,
                last: res.data.last_page
            });
        });
    }
    deleteEmploye(id) {
        let url = `/api/employees/${id}`;
        sendRequest(url, "DELETE").then(res => {
            let arr = this.state.employees;
            arr = arr.filter(value => {
                return value.id !== res.data;
            });
            this.setState({
                employees: arr
            });
        });
    }

    nextPage(event) {
        let page = event.target.innerHTML;
        sendRequest(`/api/employees?page=${page}`).then(res => {
            this.setState({
                employees: res.data.data,
                last: res.data.last_page,
                page: page
            });
        });
        this.setState({
            page: page
        });
    }

    getEmployees() {
        let employees = this.state.employees;
        let result;
        if (employees) {
            result = employees.map(employe => {
                return (
                    <Employe
                        name={employe.first_name}
                        key={employe.id}
                        id={employe.id}
                        delete={this.deleteEmploye}
                    />
                );
            });
        } else {
            result = "Employees not found";
        }

        return result;
    }

    render() {
        let employeesResult = this.getEmployees();

        return (
            <React.Fragment>
                <div className="container mt-5">
                    <h1>
                        employees{" "}
                        <Link to="/employees/add" className="btn btn-success">
                            Add new
                        </Link>{" "}
                    </h1>
                    {employeesResult}
                    {this.state.last && (
                        <PaginateButton
                            nextPage={this.nextPage}
                            item="employees"
                            count={this.state.last}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default Employees;
