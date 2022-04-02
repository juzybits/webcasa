import React from "react";

import { tooltip } from "./_util"

export class List extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.items.length === 0) {
            return '';
        }
        const title = this.props.title ? <h2>{this.props.title}</h2> : '';
        return (
            <div className="list">
                {title}
                <div className="list-body">
                    {this.props.items}
                </div>
            </div>
        );
    }
}

export class CopiableValue extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        navigator.clipboard
            .writeText(this.props.contents)
            .then( () => tooltip("Copied to clipboard") )
            .catch( (err) => console.error(`ERROR when trying to copy to clipboard: ${err}`) );
    }
    render() {
        return (
            <div className="CopiableValue" onClick={this.handleClick}>
                {this.props.short ?? this.props.contents}
            </div>
        );
    }
}
