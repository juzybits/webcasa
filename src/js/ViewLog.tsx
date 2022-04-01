import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List } from "./List";
import { json } from "./_util";

// TODO: search
// TODO: sorting
// TODO: pagination
export class ViewLog extends React.Component {
    render() {
        var key = 0;
        const logs = this.props.logs.slice(0).reverse().map((x) =>
                <div key={key++}>
                    type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{x.type}<br/>
                    amount:&nbsp;&nbsp;&nbsp;{x.amount}<br/>
                    memo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{x.memo}<br/>
                    time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{x.timestamp}<br/>
                    webcash:&nbsp;&nbsp;{x.webcash}<br/>
                    outputs:&nbsp;&nbsp;{json(x.output_webcash)}<br/>
                    new_webcash&nbsp;{json(x.input_webcash)}<br/>
                    inputs:&nbsp;&nbsp;&nbsp;{json(x.input_webcash)}
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
