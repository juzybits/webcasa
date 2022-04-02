import React from "react";

import { formatDate, json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";
import { List, makeItemRow } from "./List";

export class ViewSend extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    // TODO: move to App.tsx
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
            this.props.handleModifyWallet();
        }
    }

    render() {
        let key = 0;
        const history = this.props.wallet.log
            .filter((x) => x.type === "payment" )
            .slice(0).reverse().map((x) => {
                const ts = !x.timestamp ? null : formatDate(new Date(Number(x.timestamp)));
                return <div className="list-item" key={key++}>
                    {makeItemRow('timestamp', ts)}
                    {makeItemRow('amount', x.amount)}
                    {makeItemRow('memo', x.memo)}
                    {makeItemRow('webcash', x.webcash, true)}
                </div>;
            });
        return (
            <div id="ViewSend" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Send</h1>

                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="sendAmount">Amount</label>
                        <input type="number" id="sendAmount" min="0" max="0.01" step="0.000001" onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="sendMemo">Memo</label>
                        <input type="text" id="sendMemo" onChange={this.handleChange} />
                    </fieldset>
                    <button type="submit" className="pure-button pure-button-primary">Create payment</button>
                </form>

                <List title="History" items={history} />

            </div>
        );
    }
}
