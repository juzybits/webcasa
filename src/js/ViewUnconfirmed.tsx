import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List } from "./List";

export class ViewUnconfirmed extends React.Component {
    render() {
        const wallet = this.props.wallet;
        const unconfirmed = wallet.getContents().unconfirmed;
        return (
            <div id="ViewUnconfirmed" className="pure-u card">

                <BalanceIndicator wallet={wallet} />

                <h1>Unconfirmed</h1>

                <List items={unconfirmed} />

            </div>
        );
    }
}
