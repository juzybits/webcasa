import React from "react";

import { formatDate, json } from "./_util";
import { List, Row } from "./Common";

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
                    <Row title='timestamp' contents={ts} />
                    <Row title='amount' contents={x.amount} />
                    <Row title='memo' contents={x.memo} />
                    <Row title='webcash' contents={x.webcash} isWebcash={true} />
                </div>;
            });
        const btnSendMax = <a href="#" id="btn-send-max" onClick={this.onSendAmountMax}>max</a>;
        return (
            <div id="FormSend">

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="sendAmount">Amount ({btnSendMax})</label>
                        <input type="number" id="sendAmount" min="0.000001" max="210000000000" step="0.000001"
                               required onChange={this.onChange} value={this.state.sendAmount}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="sendMemo">Memo</label>
                        <input type="text" id="sendMemo" onChange={this.onChange} value={this.state.sendMemo}/>
                    </fieldset>
                    <div className="centered">
                        <button type="submit" className="pure-button pure-button-primary">Create payment</button>
                    </div>
                </form>

                {this.props.lastSend}

                <List title="History" items={history} />

            </div>
        );
    }
}
