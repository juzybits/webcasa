import React from "react";

import { tooltip } from "./_util";

export class ViewExternalReceive extends React.Component {
    constructor(props) {
        super(props)
        this.onClickCopy = this.onClickCopy.bind(this);
        this.onClickInsert = this.onClickInsert.bind(this);
    }

    onClickCopy(event) {
        navigator.clipboard
            .writeText(this.props.webcash.toString())
            .then( () => tooltip("Copied!") )
            .catch( (err) => console.error(`ERROR when trying to copy to clipboard: ${err}`) );
    }

    async onClickInsert() {
        event.preventDefault();
        const webcash = this.props.webcash;
        const memo = this.props.memo ?? "";
        await this.props.onReceiveWebcash(webcash, memo);
    }

    render() {
        const webcash = this.props.webcash;
        const memo = this.props.memo;
        return (
        <div id="ViewExternalReceive" className="modal external-action">
            <label className="modal-logo">🏠 WebCasa<sup>(beta)</sup></label>
            <div className="modal-card">
                <h1>Found webcash 🤑</h1>
                <div className="balance-indicator">
                    <label className="balance-amount"><i className="nav-icon icon-webcash"></i> {webcash.amount.toString()}</label>
                </div>
                <div className="memo">
                    {memo}
                </div>
                <button className="pure-button" onClick={this.onClickInsert}>Insert in wallet</button>
                <button className="pure-button" onClick={this.onClickCopy}>Copy to clipboard</button>
            </div>
        </div>
        );
    }
}
