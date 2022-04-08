import React from "react";

import { formatDate, json } from "./_util";
import { List, makeItemRow } from "./List";

export class FormSend extends React.Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSendAmountMax = this.onSendAmountMax.bind(this);
        this.state = {
            sendAmount: '',
            sendMemo: '',
        };
    }

    onChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.id]: target.value
        });
    }

    async onSubmit() {
        event.preventDefault();
        const amount = this.state.sendAmount;
        const memo = this.state.sendMemo;
        await this.props.onSendAmount(amount, memo);
    }

    onSendAmountMax() {
        event.preventDefault();
        this.setState({sendAmount: this.props.wallet.getBalance()});
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
        const btnSendMax = <a href="#" id="btn-send-max" onClick={this.onSendAmountMax}>max</a>;
        const lastResult = this.props.lastSend==='' ? '' : <div className="last-result">
            <h3>Last result:</h3>
            {this.props.lastSend}
        </div>;
        return (
            <div id="FormSend" className="pure-u">

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="sendAmount">Amount ({btnSendMax})</label>
                        <input type="number" id="sendAmount" min="0.000001" max="210000000000" step="0.000001"
                               required autoFocus onChange={this.onChange} value={this.state.sendAmount}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="sendMemo">Memo</label>
                        <input type="text" id="sendMemo" onChange={this.onChange} value={this.state.sendMemo}/>
                    </fieldset>
                    <div className="centered">
                        <button type="submit" className="pure-button pure-button-primary">Create payment</button>
                    </div>
                </form>

                {lastResult}

                <List title="History" items={history} />

            </div>
        );
    }
}
