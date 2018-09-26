import React, { Component } from "react";
import { Link } from "react-router-dom";

import Company from "./Company";
import PaginateButton from "../../PaginateButton";

import sendRequest from "../../dataService";

class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };
        this.deleteCompany = this.deleteCompany.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        sendRequest(`/api/companies?page=1&count=10`).then(res => {
            this.setState({
                companies: res.data.data,
                last: res.data.last_page
            });
        }).catch(err => {
            this.props.changeAuth(false);
        });
    }

    deleteCompany(id) {
        let url = `/api/companies/${id}`;
        sendRequest(url, "delete").then(res => {
            let companies = this.state.companies;
            companies = companies.filter(company => {
                return company.id !== res.data.id;
            });

            this.setState({
                companies: companies
            });
        }).catch(err => {
            this.props.changeAuth(false);
        });
    }

    nextPage(event) {
        let page = event.target.innerHTML;
        sendRequest(`/api/companies?page=${page}`).then(res => {
            this.setState({
                companies: res.data.data,
                page: page
            });
        }).catch(err => {
            this.props.changeAuth(false);
        });
    }

    getCompanies() {
        let companies = this.state.companies;
        let result;

        if (companies) {
            result = companies.map((value, i) => {
                return (
                    <Company
                        name={value.name}
                        key={value.id}
                        id={value.id}
                        delete={this.deleteCompany}
                    />
                );
            });
        } else {
            result = "no companies found";
        }
        return result;
    }

    render() {
        let companiesResult = this.getCompanies();

        return (
            <React.Fragment>
                <div className="container mt-5">
                    <h1>
                        Companies
                        <Link to="/companies/add" className="btn btn-success">
                            Add new
                        </Link>
                    </h1>
                    {companiesResult}

                    {this.state.last && (
                        <PaginateButton
                            nextPage={this.nextPage}
                            item="companies"
                            count={this.state.last}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default Companies;
