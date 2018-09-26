import React, { Component } from "react";
import sendRequest from "../../dataService";

class EmployeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Edit Employe",
            msgClass: "text-warning",
            employe: {},
            companies: []
        };
        this.HandleOnSubmit = this.HandleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        sendRequest(`/api/employees/${this.props.match.params.id}`).then(
            res => {
                console.log(res.data);
                this.setState({
                    employe: res.data
                });
            }
        ).catch(err => {
            this.props.changeAuth(false);
        });

        sendRequest("/api/companies/").then(res => {
            this.setState({
                companies: res.data
            });
        }).catch(err => {
            this.props.changeAuth(false);
        });
    }

    handleChange(e) {
        let newEmploye = this.state.employe;
        newEmploye[e.target.name] = e.target.value;
        this.setState({
            employe: newEmploye
        });
    }

    HandleOnSubmit(event) {
        event.preventDefault();
        sendRequest(
            `/api/employees/${this.props.match.params.id}`,
            "PUT",
            this.state.employe
        )
            .then(response => {
                this.setState({
                    msg: "Employe edited successfully",
                    msgClass: "text-success"
                });
            })
            .catch(err => {
                this.setState({
                    msg: "fill all fields correctly",
                    msgClass: "text-danger"
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
                        name="first_name"
                        placeholder="First name"
                        type="text"
                        defaultValue={this.state.employe.first_name}
                        onChange={this.handleChange}
                    />
                    <input
                        name="last_name"
                        type="text"
                        placeholder="Last name"
                        onChange={this.handleChange}
                        defaultValue={this.state.employe.last_name}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-MAIL"
                        onChange={this.handleChange}
                        defaultValue={this.state.employe.email}
                    />

                    <select onChange={this.handleChange} name="company">
                        {this.state.companies.map(value => {
                            if (value.id === this.state.employe.company)
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
                        defaultValue={this.state.employe.phone}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Edit</button>
                </form>
            </React.Fragment>
        );
    }
}

export default EmployeEdit;
