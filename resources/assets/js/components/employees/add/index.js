import React, { Component } from "react";
import sendRequest from "../../dataService";

class EmployeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Create new Employe",
            msgClass: "text-primary",
            employe: {},
            companies: []
        };
        this.HandleOnSubmit = this.HandleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        sendRequest("/api/companies").then(res => {
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

        sendRequest(`/api/employees`, "POST", this.state.employe).then(
            response => {
                this.setState({
                    msg: "Employe Created successfully",
                    msgClass: "text-success"
                });
            }
        ).catch(err => {
            this.props.changeAuth(false);
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
                        onChange={this.handleChange}
                    />
                    <input
                        name="last_name"
                        type="text"
                        placeholder="Last name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-MAIL"
                        onChange={this.handleChange}
                    />
                    <select onChange={this.handleChange} name="company">
                        {this.state.companies.map(value => {
                            return (
                                <option key={value.id} value={value.id}>
                                    {value.name}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Add</button>
                </form>
            </React.Fragment>
        );
    }
}

export default EmployeAdd;
