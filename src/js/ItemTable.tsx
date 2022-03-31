import React from "react";

import { tooltip } from "./_util"

export class ItemTable extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const text = event.target.getInnerHTML();

        navigator.clipboard.writeText(text).then(function() {
            tooltip("Copied to clipboard");
        }, function(err) {
        });

    }

    render() {
        if (this.props.items.length === 0) {
            return '';
        }

        let key = 0;
        const items = this.props.items.map( (item) =>
            <tr key={key++}>
                <td onClick={this.handleClick}>{item}</td>
            </tr>
        );
        const title = this.props.title ? <h2>{this.props.title}</h2> : '';
        return (
            <div className="ItemTable">
                {title}
                <table className="pure-table">
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>

        );
    }
}
