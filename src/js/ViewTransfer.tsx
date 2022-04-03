import React from "react";

import { json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";
import { List, makeItemRow } from "./List";
import { ActionResult } from "./Common";

export class ViewTransfer extends React.Component {
    private label = "Success! The new secret was saved";

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            lastResult: <ActionResult success={null} contents={null} label={this.label} />,
        };
    }

    handleChange(event) {
    }

    // TODO: move to App.tsx
    async handleSubmit() {
    }

    render() {
        const history = []; // TODO
        const subtitle = 'Send/Receive'; // TODO
        return (
            <div id="ViewTransfer" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Transfer</h1>

                <h2>{subtitle}</h2>

                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                </form>

                {this.state.lastResult}

                <List title="History" items={history} />

            </div>
        );
    }
}
