import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List, CopiableValue, webcashToCopiableValues } from "./List";
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

            const row_type = !x.type ? '' :
            <div className="list-item-row">
                <label className="item-label">type:</label>
                <CopiableValue contents={x.type} />
            </div>;

            const row_amount = !x.amount ? '' :
            <div className="list-item-row">
                <label className="item-label">amount:</label>
                <CopiableValue contents={x.amount} />
            </div>;

            const row_memo = !x.memo ? '' :
            <div className="list-item-row">
                <label className="item-label">memo:</label>
                <CopiableValue contents={x.memo} />
            </div>;

            const row_timestamp = !x.timestamp ? '' :
            <div className="list-item-row">
                <label className="item-label">time:</label>
                <CopiableValue contents={x.timestamp} />
            </div>;

            const row_webcash = !x.webcash ? '' :
            <div className="list-item-row">
                <label className="item-label">webcash:</label>
                {webcashToCopiableValues(x.webcash)}
            </div>;

            const row_input_webcash = !x.input_webcash ? '' :
            <div className="list-item-row">
                <label className="item-label">inputs:</label>
                {webcashToCopiableValues(x.input_webcash)}
            </div>;

            const row_output_webcash = !x.output_webcash ? '' :
            <div className="list-item-row">
                <label className="item-label">outputs:</label>
                {webcashToCopiableValues(x.output_webcash)}
            </div>;

            const row_new_webcash = !x.new_webcash ? '' :
            <div className="list-item-row">
                <label className="item-label">new_webcash:</label>
                {webcashToCopiableValues(x.new_webcash)}
            </div>;
            return <div className="list-item" key={key++}>
                {row_type}
                {row_amount}
                {row_memo}
                {row_timestamp}
                {row_webcash}
                {row_input_webcash}
                {row_output_webcash}
                {row_new_webcash}
            </div>
        });
        const wallet = this.props.wallet;
        return (
            <div id="ViewLog" className="pure-u card">

                <BalanceIndicator wallet={wallet} />

                <h1>Log</h1>

                <List items={logs} />

            </div>
        );
    }
}
