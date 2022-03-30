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
                    handleWalletUpload={this.props.handleWalletUpload}
                    handleCreateWallet={this.props.handleCreateWallet}
                    handleDownloadWallet={this.props.handleDownloadWallet}
                />

                <table className="pure-table wallet-table">
                <tbody>
                    <tr><td>master secret:</td><td>{formatMasterSecret(this.props.wallet)}</td></tr>
                    <tr><td>version:</td><td>{json(data.version)}</td></tr>
                    <tr><td>terms accepted:</td><td>{data.legalese===true?'yes':'no'}</td></tr>
                    <tr><td>log:</td><td>{data.log.length}</td></tr>
                    <tr><td>webcashes:</td><td>{data.webcash.length}</td></tr>
                    <tr><td>unconfirmed:</td><td>{data.unconfirmed.length}</td></tr>
                    <tr><td>depths:</td><td><tt>{json(data.walletdepths)}</tt></td></tr>
                </tbody>
                </table>

            </div>
        );
    }
}

function WalletControls(props) {
        return (
            <div className="wallet-buttons">
                <label className="pure-button wallet-button" htmlFor="wc-file-input">Load</label>
                <input type="file" id="wc-file-input" name="connect-file-input" className="connect-file-input"
                    onChange={props.handleWalletUpload}/>

                <button className="pure-button wallet-button"
                    onClick={props.handleCreateWallet}>New</button>

                <button className="pure-button wallet-button"
                    onClick={props.handleDownloadWallet}>Download</button>
            </div>
        )
}
