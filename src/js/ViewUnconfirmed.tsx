import React from "react";

import { json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";

export class ViewUnconfirmed extends React.Component {
    render() {
        const wallet = this.props.wallet;
        const unconfirmed = wallet.getContents().unconfirmed;
        return (
            <div id="ViewUnconfirmed" className="pure-u card">

                <BalanceIndicator wallet={wallet} />

                <h1>Unconfirmed</h1>

                <div>{json(unconfirmed)}</div>

            </div>
        );
    }
}
