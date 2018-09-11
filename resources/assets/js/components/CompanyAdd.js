import React, { Component } from "react";
import Nav from "./Nav";
import sendRequest from "./dataService";
class CompanyAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Create new Company",
            msgClass: "text-primary"
        };
        this.HandleOnSubmit = this.HandleOnSubmit.bind(this);
    }

    HandleOnSubmit(event) {
        event.preventDefault();
        let form = document.forms.namedItem("ads");
        let formData = new FormData(form);
        sendRequest("/api/companies/store", "POST", formData).then(
            response => {
                this.setState({
                    msg: response.data.msg,
                    msgClass: "text-success"
                });
            }
        );
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
                    <input name="name" placeholder="Name" type="text" />
                    <input name="email" type="email" placeholder="E-MAIL" />
                    <input name="logo" type="file" ref={this.inputFile} />
                    <input name="website" type="url" placeholder="website" />
                    <button type="submit">Add</button>
                </form>
            </React.Fragment>
        );
    }
}

export default CompanyAdd;
