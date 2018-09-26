import React, { Component } from "react";
import sendRequest from "../../dataService";

class CompanyAdd extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state = {
            msg: "Edit Company",
            msgClass: "text-warning",
            company: {}
        };
        this.inputFile = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let newCompany = this.state.company;
        newCompany[e.target.name] = e.target.value;
        this.setState({
            company: newCompany
        });
    }

    componentDidMount() {
        sendRequest(`/api/companies/${this.props.match.params.id}`,this.props.changeAuth).then(
            res => {
                this.setState({ company: res.data });
            }
        ).catch(err => {
            this.props.changeAuth(false);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let logo = this.inputFile.current.files[0];
        let formData = new FormData();
        formData.append("logo", logo);
        if (!logo) {
            let result = this.state.company;

            sendRequest(
                `/api/companies/${this.props.match.params.id}`,
                "PUT",
                result
            ).then(res => {
                this.setState({
                    msg: "Company edited successfully",
                    msgClass: "text-success"
                });
                console.log("company created", res);
            }).catch(err => {
                this.props.changeAuth(false);
            });

            return;
        }
        sendRequest("/api/logo", "POST", formData, true, {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        }).then(response => {
            let result = this.state.company;
            result["logo"] = response.data.path;
            sendRequest(
                `/api/companies/${this.props.match.params.id}`,
                "PUT",
                result
            )
                .then(res => {
                    this.setState({
                        msg: "Company edited successfully",
                        msgClass: "text-success"
                    });
                })
                .catch(err => {
                    this.setState({
                        msg: "Fill all fields correctly",
                        msgClass: "text-danger"
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
                        defaultValue={this.state.company.name}
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-MAIL"
                        defaultValue={this.state.company.email}
                        onChange={this.handleChange}
                    />
                    <input name="logo" type="file" ref={this.inputFile} />
                    <input
                        name="website"
                        type="url"
                        placeholder="website"
                        defaultValue={this.state.company.website}
                    />
                    <button type="submit">Edit</button>
                </form>
            </React.Fragment>
        );
    }
}

export default CompanyAdd;
