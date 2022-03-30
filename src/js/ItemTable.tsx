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
        let key = 0;
        const items = this.props.items.map( (item) =>
            <tr key={key++}>
                <td onClick={this.handleClick}>{item}</td>
            </tr>
        );
        return (
            <div className="ItemTable">
                <table className="pure-table pure-table-striped">
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>

        );
    }
}
