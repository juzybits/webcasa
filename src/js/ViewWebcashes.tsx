import React from "react";

import { json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";

export class ViewWebcashes extends React.Component {
    render() {
        const wallet = this.props.wallet;
        const webcashes = wallet.getContents().webcash;
        return (
            <div id="ViewWebcashes" className="pure-u card">

                <BalanceIndicator wallet={wallet} />

                <h1>Webcashes</h1>

                <div>{json(webcashes)}</div>

            </div>
        );
    }
}
