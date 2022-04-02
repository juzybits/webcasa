import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List, makeItemRow } from "./List";

export class ViewUnconfirmed extends React.Component {
    render() {
        const wallet = this.props.wallet;
        const unconfirmed = wallet.getContents().unconfirmed;
        var key = 0;
        const items = unconfirmed.slice(0).reverse().map((x) =>
                <React.Fragment key={key++}>{makeItemRow('', x, true)}</React.Fragment>);
        return (
            <div id="ViewUnconfirmed" className="pure-u card">

                <h1>Unconfirmed</h1>

                <List items={items} />

            </div>
        );
    }
}
