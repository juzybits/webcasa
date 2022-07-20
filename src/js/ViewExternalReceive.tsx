import React from "react";

import { tooltip, renderQR, makeURL } from "./_util";

export class ViewExternalReceive extends React.Component {
    constructor(props) {
        super(props)
        this.onClickCopy = this.onClickCopy.bind(this);
        this.onClickInsert = this.onClickInsert.bind(this);
        this.showQR = this.showQR.bind(this);
    }

    onClickCopy(event) {
        navigator.clipboard
            .writeText(this.props.webcash.toString())
            .then( () => tooltip("Copied!") )
            .catch( (err) => console.error(`ERROR when trying to copy to clipboard: ${err}`) );
    }

    async onClickInsert() {
        event.preventDefault();
        this.props.onExternalInsert();
    }

    componentDidMount() {
        this.showQR();
    }

    showQR() {
        const url = makeURL({receive: this.props.webcash, memo: this.props.memo});
        this.setState({qrURL: url});
        renderQR("qr-external-receive", url);
    }

    render() {
        const webcash = this.props.webcash;
        const memo = this.props.memo;
        return (
        <div id="ViewExternalReceive" className="modal external-action">
            <label className="modal-logo"><a href="/">🏠 WebCasa</a></label>
            <div className="modal-card">
                <h1>Found webcash 🤑</h1>
                <div className="balance-indicator">
                    <label className="balance-amount"><i className="nav-icon icon-webcash"></i> {webcash.amount.toString()}</label>
                </div>
                <div className="memo">
                    {memo}
                </div>
                <div className="qr-wrapper"><canvas id="qr-external-receive"></canvas></div>
                <button className="pure-button" onClick={this.onClickInsert}>
                    <i className='button-icon icon-cloud-arrow-down-solid'></i>&nbsp;Insert in wallet
                </button>
                <button className="pure-button" onClick={this.onClickCopy}>
                    <i className='button-icon icon-copy'></i>Copy to clipboard
                </button>
            </div>
        </div>
        );
    }
}
