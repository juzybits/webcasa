import React from "react";

import { json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";
import { ItemTable } from "./ItemTable";

export class ViewSend extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            sendAmount: null,
            sendMemo: '',
            history: [], // TODO bubble up to App
        };
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.id]: target.value
        });
    }

    async handleSubmit() {
        event.preventDefault();
        const amount = this.state.sendAmount;
        const memo = this.state.sendMemo;

        var result = '';
        try {
            result = await this.props.wallet.pay(amount, memo);
        } catch (e) {
            result = `ERROR: ${e.message} | amount=${amount}, memo=${memo}`;
        } finally {
            this.setState({history: [...this.state.history, result]}); // TODO bubble up to App
            // TODO this.handleHistoryUpdate(history_entry);
        }
    }

    render() {
        return (
            <div id="ViewSend" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Send</h1>

                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="sendAmount">Amount</label>
                        <input type="number" id="sendAmount" min="0" step="0.000001" onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="sendMemo">Memo</label>
                        <input type="text" id="sendMemo" onChange={this.handleChange} />
                    </fieldset>
                    <button type="submit" className="pure-button pure-button-primary">Create payment</button>
                </form>

                <ItemTable title="History" items={this.state.history} />

            </div>
        );
    }
}
