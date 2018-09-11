import React, { Component } from "react";
import Nav from "./Nav";
import dataService from "./dataService";
class CompanyAdd extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state = {
            msg: "Edit Company",
            msgClass: "text-warning",
            company: {}
        };
        this.HandleOnSubmit = this.HandleOnSubmit.bind(this);
    }

    componentDidMount() {
        dataService.sendRequest(`/api/companies/${this.props.match.params.id}`).then(res => {
            this.setState({company:res.data});
        });
    }

    HandleOnSubmit(event) {
        alert('s');
        event.preventDefault();
        let form = document.forms.namedItem("ads");
        let formData = new FormData(form); 
        dataService.sendRequest(
                `/api/companies/${this.props.match.params.id}`,
                'PUT',
                {name:'h'}
            )
            .then(response => {
                this.setState({
                    msg: response.data,
                    msgClass: "text-success"
                });
            });
    }

    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <form
                    onSubmit={this.HandleOnSubmit}
                    name="ads"
                    className="container mt-5"
                >
                    <h2 className={this.state.msgClass}>{this.state.msg}</h2>
                    <input
                        name="name"
                        placeholder="Name"
                        type="text"
                        defaultValue={this.state.company.name}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="E-MAIL"
                        defaultValue={this.state.company.email}
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
