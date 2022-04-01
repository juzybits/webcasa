import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List, CopiableValue } from "./List";
import { json } from "./_util";

// TODO: search
// TODO: sorting
// TODO: pagination
export class ViewLog extends React.Component {
    render() {
        var key = 0;
        const logs = this.props.logs.slice(0).reverse().map((x) =>
                <div className="list-item" key={key++}>
                    <div className="list-item-row">
                        <label className="item-label">type:</label>
                        <CopiableValue contents={x.type} />
                    </div>
                    <div className="list-item-row">
                        <label className="item-label">amount:</label>
                        <CopiableValue contents={x.amount} />
                    </div>
                    <div className="list-item-row">
                        <label className="item-label">memo:</label>
                        <CopiableValue contents={x.memo} />
                    </div>
                    <div className="list-item-row">
                        <label className="item-label">time:</label>
                        <CopiableValue contents={x.timestamp} />
                    </div>
                    <div className="list-item-row">
                        <label className="item-label">webcash:</label>
                        <CopiableValue contents={x.webcash} />
                    </div>
                    <div className="list-item-row">
                        <label className="item-label">outputs:</label>
                        <CopiableValue contents={json(x.output_webcash)} />
                    </div>
                    <div className="list-item-row">
                        <label className="item-label">new_webcash:</label>
                        <CopiableValue contents={json(x.input_webcash)} />
                    </div>
                    <div className="list-item-row">
                        <label className="item-label">inputs:</label>
                        <CopiableValue contents={json(x.input_webcash)} />
                    </div>
                </div>
            );
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
