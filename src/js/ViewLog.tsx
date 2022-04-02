import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List, makeItemRow } from "./List";
import { json } from "./_util";

// TODO: search
// TODO: sorting
// TODO: pagination
export class ViewLog extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let key = 0;
        const logs = this.props.logs.slice(0).reverse().map((x) => {
            return <div className="list-item" key={key++}>
                {makeItemRow('type', x.type)}
                {makeItemRow('amount', x.amount)}
                {makeItemRow('memo', x.memo)}
                {makeItemRow('timestamp', x.timestamp)}
                {makeItemRow('webcash', x.webcash, true)}
                {makeItemRow('input_webcash', x.input_webcash, true)}
                {makeItemRow('output_webcash', x.output_webcash, true)}
                {makeItemRow('new_webcash', x.new_webcash, true)}
            </div>;
        });
        const wallet = this.props.wallet;
        return (
            <div id="ViewLog" className="pure-u card">

                <h1>Log</h1>

                <List items={logs} />

            </div>
        );
    }
}
