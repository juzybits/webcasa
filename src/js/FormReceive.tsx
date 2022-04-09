import React from "react";

import { json } from "./_util";
import { List, makeItemRow } from "./Common";

export class FormReceive extends React.Component {

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            receiveWebcash: '',
            receiveMemo: '',
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
        const webcash = this.state.receiveWebcash;
        const memo = this.state.receiveMemo;
        await this.props.onReceiveWebcash(webcash, memo);
    }

    render() {
        var key = 0;
        const history = this.props.wallet.log
            .filter((x) => x.type === "receive" || x.type === "insert" )
            .slice(-100).reverse().map((x) => {
                const ts = !x.timestamp ? null : new Date(x.timestamp).toUTCString();
                return <div className="list-item" key={key++}>
                    {makeItemRow('timestamp', ts)}
                    {makeItemRow('amount', x.amount)}
                    {makeItemRow('memo', x.memo)}
                    {makeItemRow('webcash', x.webcash, true)}
                    {makeItemRow('new_webcash', x.new_webcash, true)}
                </div>;
            });
        const lastResult = this.props.lastReceive==='' ? '' : <div className="last-result">
            <h3>Last result:</h3>
            {this.props.lastReceive}
        </div>;
        return (
            <div id="FormReceive" className="pure-u">

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="receiveWebcash">Webcash</label>
                        <input type="text" id="receiveWebcash" onChange={this.onChange}
                               required autoFocus value={this.state.receiveWebcash} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="receiveMemo">Memo</label>
                        <input type="text" id="receiveMemo" onChange={this.onChange} value={this.state.receiveMemo} />
                    </fieldset>
                    <div className="centered">
                        <button type="submit" className="pure-button pure-button-primary">Insert in wallet</button>
                    </div>
                </form>

                {lastResult}

                <List title="History" items={history} />

            </div>
        );
    }
}
