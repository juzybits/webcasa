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

                <div style={{clear: 'both'}}></div>

                <div id="wallet-group-main" className="wallet-group">
                    <div className="wallet-item">
                        <label>balance:</label>{balance}
                    </div>
                    <div className="wallet-item">
                        <label>master secret:</label>{formatMasterSecret(this.props.wallet)}
                    </div>
                    <div className="wallet-item">
                        <label>version:</label>{json(data.version)}
                    </div>
                    <div className="wallet-item">
                        <label>terms</label>{data.legalese.terms===true?'accepted':'not accepted'}
                    </div>
                </div>

                <div id="wallet-group-depths" className="wallet-group">
                    <div className="wallet-item depth">
                        <label>RECEIVE depth</label>{data.walletdepths.RECEIVE}
                    </div>
                    <div className="wallet-item depth">
                        <label>PAY depth</label>{data.walletdepths.PAY}
                    </div>
                    <div className="wallet-item depth">
                        <label>CHANGE depth</label>{data.walletdepths.CHANGE}
                    </div>
                    <div className="wallet-item depth">
                        <label>MINING depth</label>{data.walletdepths.MINING}
                    </div>
                </div>

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

                {buttonConnect}

                <button className="pure-button" onClick={this.props.handleCreateWallet}>New</button>

                <button className="pure-button"onClick={this.props.handleDownloadWallet}>Save</button>

            </React.Fragment>;

        return <div className="wallet-buttons">{fragment}</div>
    }

}
