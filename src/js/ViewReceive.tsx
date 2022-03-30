import React from "react";

import { formatMasterSecret, json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";

export class ViewReceive extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            receiveWebcash: null,
            receiveMemo: '',
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
    // TODO: call "insert" on wallet
    handleSubmit() {
        alert("Coming soon!");
        console.log(json(this.state));
        event.preventDefault();
    }

    render() {
        return (
            <div id="ViewReceive" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Receive</h1>

                <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="receiveWebcash">Webcash</label>
                        <input type="number" id="receiveWebcash" min="0" step="0.00000001" onChange={this.handleChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="receiveMemo">Memo</label>
                        <input type="text" id="receiveMemo" onChange={this.handleChange} />
                    </fieldset>
                    <button type="submit" className="pure-button pure-button-primary">Insert in wallet</button>
                </form>

            </div>
        );
    }
}
