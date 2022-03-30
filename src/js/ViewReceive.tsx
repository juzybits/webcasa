import React from "react";

import { json, tooltip } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";
import { ItemTable } from "./ItemTable";

export class ViewReceive extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            receiveWebcash: null,
            receiveMemo: '',
            history: []
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
        const webcash = this.state.receiveWebcash;
        const memo = this.state.receiveMemo;
        // console.log("-----")
        // let result = await this.props.wallet.insert(webcash, memo);
        // console.log(json(result));
    }

    render() {
        return (
            <div id="ViewReceive" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Receive</h1>

                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="receiveWebcash">Webcash</label>
                        <input type="text" id="receiveWebcash" onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="receiveMemo">Memo</label>
                        <input type="text" id="receiveMemo" onChange={this.handleChange} />
                    </fieldset>
                    <button type="submit" className="pure-button pure-button-primary">Insert in wallet</button>
                </form>

                <ItemTable title="History" items={this.state.history} />

            </div>
        );
    }
}
