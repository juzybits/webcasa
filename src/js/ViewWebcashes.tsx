import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List, makeItemRow } from "./List";

export class ViewWebcashes extends React.Component {
    render() {
        const wallet = this.props.wallet;
        const webcashes = wallet.getContents().webcash;
        var key = 0;
        const items = webcashes.slice(0).reverse().map((x) =>
                <React.Fragment key={key++}>{makeItemRow('', x, true)}</React.Fragment>);
        return (
            <div id="ViewWebcashes" className="pure-u card">

                <h1>Webcashes</h1>

                <List items={items} />

            </div>
        );
    }
}
