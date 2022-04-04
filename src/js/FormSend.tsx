import React from "react";

import { formatDate, json } from "./_util";
import { List, makeItemRow } from "./List";
import { ActionResult } from "./Common";

export class FormSend extends React.Component {
    private label = "Success! Here is the new secret";

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            sendAmount: null,
            sendMemo: '',
            lastResult: <ActionResult success={null} contents={null} label={this.label} />,
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

        try {
            const webcash = await this.props.wallet.pay(amount, memo);
            this.setState({ lastResult: <ActionResult success={true} contents={webcash} label={this.label} /> });
            this.props.handleModifyWallet();
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (amount=${amount}, memo=${memo})`}</div>;
            this.setState({ lastResult: <ActionResult success={false} contents={errMsg} label={this.label} /> });
        }
    }

    render() {
        let key = 0;
        const history = this.props.wallet.log
            .filter((x) => x.type === "payment" )
            .slice(-100).reverse().map((x) => {
                const ts = !x.timestamp ? null : formatDate(new Date(Number(x.timestamp)));
                return <div className="list-item" key={key++}>
                    {makeItemRow('timestamp', ts)}
                    {makeItemRow('amount', x.amount)}
                    {makeItemRow('memo', x.memo)}
                    {makeItemRow('webcash', x.webcash, true)}
                </div>;
            });
        return (
            <div id="FormSend" className="pure-u">

                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="sendAmount">Amount</label>
                        <input type="number" id="sendAmount" min="0.000001" max="210000000000" step="0.000001" onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="sendMemo">Memo</label>
                        <input type="text" id="sendMemo" onChange={this.handleChange} />
                    </fieldset>
                    <div className="centered">
                        <button type="submit" className="pure-button pure-button-primary">Create payment</button>
                    </div>
                </form>

                {this.state.lastResult}

                <List title="History" items={history} />

            </div>
        );
    }
}