import React from "react";

import { formatDate, json, renderQR, makeURL } from "./_util";
import { List, Row } from "./Common";

export class FormSend extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.showQR = this.showQR.bind(this);
        this.onSendAmountMax = this.onSendAmountMax.bind(this);
        this.state = {
            sendAmount: '',
            sendMemo: '',
        };
    }

    onSendAmountMax() {
        event.preventDefault();
        this.setState({sendAmount: this.props.wallet.getBalance()});
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
        this.showQR();
    }

    componentDidMount() {
        this.showQR();
    }

    showQR() {
        if (!this.props.lastSend) {
            return;
        }
        const url = makeURL({receive: this.props.lastSend.webcash, memo: this.props.lastSend.memo});
        renderQR("qr-send", url);
    }

    render() {
        const btnSendMax = <a href="#" id="btn-send-max" onClick={this.onSendAmountMax}>max</a>;
        return (
            <div id="FormSend">
                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="sendAmount">Amount ({btnSendMax})</label>
                        <input type="number" id="sendAmount" min="0.000001" max="210000000000" step="0.000001"
                               required onChange={this.onChange} value={this.state.sendAmount}
                               spellCheck='false' autoCorrect='off' autoComplete='off'/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="sendMemo">Memo</label>
                        <input type="text" id="sendMemo" onChange={this.onChange} value={this.state.sendMemo}
                               maxLength="64"
                               spellCheck='false' autoCorrect='off' autoComplete='off'/>
                    </fieldset>
                    <div className="centered">
                        <button type="submit" className="pure-button pure-button-primary">Create payment</button>
                    </div>
                </form>

                <LastResult last={this.props.lastSend} />

                <History logs={this.props.wallet.log} />

            </div>
        );
    }
}

function LastResult(props) {
    if (!props.last) {
        return '';
    }
    let contents = '';
    let clazz = '';
    if (!props.last.error) {
        contents =
        <React.Fragment>
            <Row contents={props.last.webcash} title="Success! Here is the new secret" />
            <div className="qr-wrapper"><canvas id="qr-send"></canvas></div>
        </React.Fragment>;
        clazz = 'success';
    } else {
        contents = props.last.error;
        clazz = 'failure';
    }

    return <div className={`ActionResult SendResult ${clazz}`}>
        {contents}
    </div>;
}

function History(props) {
    let key = 0;
    const history = props.logs
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
    return <List title="History" items={history} />;
}
