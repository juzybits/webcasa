import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { ItemTable } from "./ItemTable";
import { json } from "./_util";

export class ViewWebcashes extends React.Component {
    render() {
        const wallet = this.props.wallet;
        const webcashes = wallet.getContents().webcash;
        return (
            <div id="ViewWebcashes" className="pure-u card">

                <BalanceIndicator wallet={wallet} />

                <h1>Webcashes</h1>

                <ItemTable items={webcashes} />

            </div>
        );
    }
}
