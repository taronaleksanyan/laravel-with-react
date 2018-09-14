import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PaginateButton extends Component {
    constructor(props) {
        super(props);
        this.loadNext = this.loadNext.bind(this);
    }
    loadNext(event) {
        this.props.nextPage(event);
    }

    generateArray(last) {
        let result = [];
        for (let i = 1; i <= last; i++) {
            result.push(i);
        }
        return result;
    }

    generateButtons() {
        let buttonsArray = this.generateArray(this.props.count);
        buttonsArray = buttonsArray.map((value, index) => {
            return (
                <Link
                    className="btn btn-default"
                    key={index}
                    to={`/${this.props.item}?page=${index + 1}`}
                    onClick={this.loadNext}
                >
                    {index + 1}
                </Link>
            );
        });
        return buttonsArray;
    }

    render() {
        let buttons = this.generateButtons();
        return <div className="mt-3"> {buttons} </div>;
    }
}
