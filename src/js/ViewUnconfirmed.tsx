import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { ItemTable } from "./ItemTable";
import { json } from "./_util";

export class ViewUnconfirmed extends React.Component {
    render() {
        const wallet = this.props.wallet;
        const unconfirmed = wallet.getContents().unconfirmed;
        return (
            <div id="ViewUnconfirmed" className="pure-u card">

                <BalanceIndicator wallet={wallet} />

                <h1>Unconfirmed</h1>

                <ItemTable items={unconfirmed} />

            </div>
        );
    }
}
