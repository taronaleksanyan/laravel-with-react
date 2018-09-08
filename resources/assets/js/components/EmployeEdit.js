import React, { Component } from "react";
import Nav from "./Nav";

import sendRequest from "./dataService";
class EmployeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Edit Employe",
            msgClass: "text-warning",
            Employe: {},
            companies: []
        };
        this.HandleOnSubmit = this.HandleOnSubmit.bind(this);
    }

    componentDidMount() {
        sendRequest(
            `/api/employees/${this.props.match.params.id}/editdata`
        ).then(res => {
            this.setState({
                Employe: res.data.data
            });
        });

        sendRequest("/api/companies/all").then(res => {
            this.setState({
                companies: res.data.data
            });
        });
    }

    HandleOnSubmit(event) {
        event.preventDefault();
        let form = document.forms.namedItem("ads");
        let formData = new FormData(form);
        sendRequest(
            `/api/employees/${this.props.match.params.id}/update`,
            "POST",
            formData
        ).then(response => {
            this.setState({
                msg: response.data,
                msgClass: "text-success"
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <form
                    onSubmit={this.HandleOnSubmit}
                    name="ads"
                    className="container mt-5"
                >
                    <h2 className={this.state.msgClass}>{this.state.msg}</h2>
                    <input
                        name="firstName"
                        placeholder="First name"
                        type="text"
                        defaultValue={this.state.Employe.firstName}
                    />
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        defaultValue={this.state.Employe.lastName}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-MAIL"
                        defaultValue={this.state.Employe.email}
                    />
                    <select name="company">
                        {this.state.companies.map(value => {
                            if (value.id === this.state.Employe.company)
                                return (
                                    <option
                                        selected="selected"
                                        key={value.id}
                                        value={value.id}
                                    >
                                        {" "}
                                        {value.name}{" "}
                                    </option>
                                );
                            return (
                                <option key={value.id} value={value.id}>
                                    {" "}
                                    {value.name}{" "}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        defaultValue={this.state.Employe.phone}
                    />
                    <button type="submit">Edit</button>
                </form>
            </React.Fragment>
        );
    }
}

export default EmployeEdit;
