import React from "react";

import { ButtonConnect } from "./ButtonConnect";
import { formatMasterSecret, json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";

export class ViewWallet extends React.Component {
    render() {
        const balance = this.props.wallet.getBalance().toString();
        const data = this.props.wallet.getContents();
        return (
            <div id="ViewWallet" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Wallet</h1>

                <WalletControls
                    wallet={this.props.wallet}
                    handleUploadWallet={this.props.handleUploadWallet}
                    handleCreateWallet={this.props.handleCreateWallet}
                />

                <table className="pure-table wallet-table">
                <tbody>
                    <tr><td>master secret:</td><td>{formatMasterSecret(this.props.wallet)}</td></tr>
                    <tr><td>version:</td><td>{json(data.version)}</td></tr>
                    <tr><td>terms accepted:</td><td>{data.legalese===true?'yes':'no'}</td></tr>
                    <tr><td>log:</td><td>{data.log.length}</td></tr>
                    <tr><td>webcashes:</td><td>{data.webcash.length}</td></tr>
                    <tr><td>unconfirmed:</td><td>{data.unconfirmed.length}</td></tr>
                    <tr><td>depths:</td><td><pre>{json(data.walletdepths)}</pre></td></tr>
                </tbody>
                </table>

            </div>
        );
    }
}

export class WalletControls extends React.Component {
    constructor(props) {
        super(props)
        this.handleDownloadWallet = this.handleDownloadWallet.bind(this);
    }

    render() {
        return (
            <div className="wallet-buttons">
                <label className="pure-button wallet-button" htmlFor="wc-file-input">Load</label>
                <input type="file" id="wc-file-input" name="connect-file-input" className="connect-file-input"
                    onChange={this.props.handleUploadWallet}/>

                <button className="pure-button wallet-button"
                    onClick={this.props.handleCreateWallet}>New</button>

                <button className="pure-button wallet-button"
                    onClick={this.handleDownloadWallet}>Download</button>
            </div>
        );
    }

    handleDownloadWallet(event) {
        const filename = 'default_wallet.webcash';
        const contents = this.props.wallet.getContents();
        const jsonContents = JSON.stringify(contents, null, 4);

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonContents));
        element.setAttribute('download', filename);
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

}
