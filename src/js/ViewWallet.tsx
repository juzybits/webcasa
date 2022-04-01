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
                    saved={this.props.saved}
                    handleUploadWallet={this.props.handleUploadWallet}
                    handleDownloadWallet={this.props.handleDownloadWallet}
                    handleCreateWallet={this.props.handleCreateWallet}
                />

                <div style={{clear: 'both'}} />

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
    }

    render() {
        const buttonConnect =
            <ButtonConnect
                saved={this.props.saved}
                label="Load"
                wallet={this.props.wallet}
                handleUploadWallet={this.props.handleUploadWallet}
                handleDownloadWallet={this.props.handleDownloadWallet}
            />;

        const fragment = !this.props.saved ? buttonConnect :
            <React.Fragment>

                <button className="pure-button" onClick={this.props.handleCreateWallet}>New</button>

                {buttonConnect}

                <button className="pure-button"onClick={this.props.handleDownloadWallet}>Save</button>

            </React.Fragment>;

        return <div className="wallet-buttons">{fragment}</div>
    }

}
