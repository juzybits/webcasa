import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { ItemTable } from "./ItemTable";
import { json } from "./_util";

// TODO: search
// TODO: sorting
// TODO: pagination
export class ViewLog extends React.Component {
    render() {
        var key = 0;
        const logs = this.props.logs.map((log) =>
            <pre key={key++}>{json(log)}</pre>
        );
        const wallet = this.props.wallet;
        return (
            <div id="ViewLog" className="pure-u card">

                <BalanceIndicator wallet={wallet} />

                <h1>Log</h1>

                <ItemTable items={logs} />

            </div>
        );
    }
}
