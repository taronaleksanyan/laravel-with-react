import React, { Component } from "react";
import sendRequest from "../../dataService";

class CompanyAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Create new Company",
            msgClass: "text-primary",
            newCompany: {}
        };
        this.inputFile = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let newCompany = this.state.newCompany;
        newCompany[e.target.name] = e.target.value;
        this.setState({
            newCompany: newCompany
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let logo = this.inputFile.current.files[0];
        let formData = new FormData();
        formData.append("logo", logo);
        sendRequest("/api/logo", "POST", formData, true, {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        }).then(response => {
            let result = this.state.newCompany;
            result["logo"] = response.data.path;
            sendRequest("/api/companies", "POST", result).then(res => {
                this.setState({
                    msg: "Company created successfully",
                    msgClass: "text-success"
                });
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <form
                    onSubmit={this.handleSubmit}
                    name="ads"
                    className="container mt-5"
                >
                    <h2 className={this.state.msgClass}>{this.state.msg}</h2>
                    <input
                        name="name"
                        placeholder="Name"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-MAIL"
                        onChange={this.handleChange}
                    />
                    <input name="logo" type="file" ref={this.inputFile} />
                    <input
                        name="website"
                        type="url"
                        placeholder="website"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Add</button>
                </form>
            </React.Fragment>
        );
    }
}

export default CompanyAdd;
