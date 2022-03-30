import React from "react";

import { formatMasterSecret, json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";

export class ViewSend extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            sendAmount: null,
            sendMemo: '',
        };
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.id]: target.value
        });
    }

    // TODO: validate
    // TODO: call "pay" on wallet
    handleSubmit() {
        alert("Coming soon!");
        console.log(json(this.state));
        event.preventDefault();
    }

    render() {
        return (
            <div id="ViewSend" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Send</h1>

                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="sendAmount">Amount</label>
                        <input type="number" id="sendAmount" min="0" step="0.00000001" onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="sendMemo">Memo</label>
                        <input type="text" id="sendMemo" onChange={this.handleChange} />
                    </fieldset>
                    <button type="submit" className="pure-button pure-button-primary">Create payment</button>
                </form>

            </div>
        );
    }
}
