import React from "react";

import { shorten, json } from "./_util";
import { BalanceIndicator } from "./BalanceIndicator";
import { CopiableValue } from "./List";

export class ViewWallet extends React.Component {
    render() {
        const balance = this.props.wallet.getBalance().toString();
        const data = this.props.wallet.getContents();
        const fullMaster = this.props.wallet.getContents().master_secret;
        const abbrMaster = shorten(fullMaster)
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
                    <div id="wallet-master" className="wallet-item">
                        <label>master secret</label>
                        <CopiableValue contents={fullMaster} short={abbrMaster}/>
                    </div>
                    <div className="wallet-item">
                        <label>balance</label>
                        <CopiableValue contents={balance}/>
                    </div>
                    <div className="wallet-item">
                        <label>version</label>{data.version}
                    </div>
                    <div className="wallet-item">
                        <label>accept <a target="_blank" href="https://webcash.org/terms">terms</a></label>
                        <TermsCheckbox accepted={data.legalese.terms} />
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

class WalletControls extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return !this.props.saved
        ?
            <div className="wallet-buttons">
                <button className="pure-button last-button unsaved"
                        onClick={this.props.handleDownloadWallet}>Save changes</button>
            </div>
        :
            <div className="wallet-buttons">

                <label className="pure-button" htmlFor="bc-file-input">Load</label>
                <input type="file" id="bc-file-input" className="connect-file-input" name="connect-file-input"
                       onChange={this.props.handleUploadWallet}/>

                <button className="pure-button" onClick={this.props.handleCreateWallet}>New</button>

                <button className="pure-button last-button"
                        onClick={this.props.handleDownloadWallet}>Save</button>

            </div>;
    }

}

function TermsCheckbox(props) {
    const checked = props.accepted === true;
    return <input type="checkbox" id="terms-checkbox" defaultChecked={checked} disabled></input>
}
