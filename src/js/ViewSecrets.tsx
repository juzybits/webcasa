import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List, makeItemRow } from "./List";

export class ViewSecrets extends React.Component {
    render() {
        const wData = this.props.wallet.getContents();

        let key = 0;
        const webcashes = wData.webcash.slice(0).reverse().map((x) =>
                <React.Fragment key={key++}>{makeItemRow('webcash', x, true)}</React.Fragment>);

        key = 0;
        const unconfirmed = wData.unconfirmed.slice(0).reverse().map((x) =>
                <React.Fragment key={key++}>{makeItemRow('unconfirmed', x, true)}</React.Fragment>);
        return (
            <div id="ViewSecrets" className="pure-u card">
                <h1>Secrets</h1>

                <h2>Webcashes</h2>
                <List items={webcashes} />

                <h2>Unconfirmed</h2>
                <List items={unconfirmed} />

            </div>
        );
    }
}
