import React from "react";

import { json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";
import { List, CopiableValue, webcashToCopiableValues } from "./List";

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

                const row_timestamp = !x.timestamp ? '' :
                <div className="list-item-row">
                    <label className="item-label">time:</label>
                    <CopiableValue contents={new Date(Number(x.timestamp)).toUTCString()} />
                </div>;

                const row_amount = !x.amount ? '' :
                <div className="list-item-row">
                    <label className="item-label">amount:</label>
                    <CopiableValue contents={x.amount} />
                </div>;

                const row_memo = !x.memo ? '' :
                <div className="list-item-row">
                    <label className="item-label">memo:</label>
                    <CopiableValue contents={x.memo} />
                </div>;

                const row_webcash = !x.webcash ? '' :
                <div className="list-item-row">
                    <label className="item-label">webcash:</label>
                    {webcashToCopiableValues(x.webcash)}
                </div>;

                return <div className="list-item" key={key++}>
                    {row_timestamp}
                    {row_amount}
                    {row_memo}
                    {row_webcash}
                </div>
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
