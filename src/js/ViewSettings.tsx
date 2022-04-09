import React from "react";

import { shorten } from "./_util";
import { CopiableValue } from "./Common";

export class ViewSettings extends React.Component {
    render() {
        const balance = this.props.wallet.getBalance().toString();
        const data = this.props.wallet.getContents();
        const fullMaster = this.props.wallet.getContents().master_secret;
        const abbrMaster = shorten(fullMaster)
        const walletButtons = !this.props.downloaded
        ?
            <button className="pure-button last-button unsaved"
                    onClick={this.props.onDownloadWallet}>Save changes</button>
        :
            <React.Fragment>
                <button className="pure-button"
                        onClick={this.props.onDownloadWallet}>Save</button>

                <label className="pure-button" htmlFor="bc-file-input">Load</label>
                <input type="file" id="bc-file-input" className="connect-file-input" name="connect-file-input"
                       onChange={this.props.onUploadWallet} style={{display: 'none'}}/>

                <button className="pure-button" onClick={this.props.onCreateWallet}>New</button>

                <button className="pure-button" onClick={()=>this.props.onChangeView('Recover')}>Recover</button>

                <button className="pure-button last-button" onClick={()=>this.props.onChangeView('Check')}>Check</button>

            </React.Fragment>;
        return (
            <div id="ViewSettings" className="pure-u card">
                <fieldset id="wallet-buttons">
                    <legend>MANAGE WALLET</legend>
                    {walletButtons}
                </fieldset>

                <div className="clear"></div>

                <fieldset>
                    <legend>INFO</legend>
                    <div className="setting">
                        <label>master secret</label>
                        <CopiableValue contents={fullMaster} short={abbrMaster}/>
                    </div>
                    <div className="setting">
                        <label>balance</label>
                        <CopiableValue contents={balance}/>
                    </div>
                    <div className="setting">
                        <label>version</label>{data.version}
                    </div>
                    <div className="setting">
                        <label>accept <a target="_blank" href="https://webcash.org/terms">terms</a></label>
                        <TermsCheckbox accepted={data.legalese.terms} />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>DEPTHS</legend>
                    <div className="setting depth">
                        <label>RECEIVE depth</label>{data.walletdepths.RECEIVE}
                    </div>
                    <div className="setting depth">
                        <label>PAY depth</label>{data.walletdepths.PAY}
                    </div>
                    <div className="setting depth">
                        <label>CHANGE depth</label>{data.walletdepths.CHANGE}
                    </div>
                    <div className="setting depth">
                        <label>MINING depth</label>{data.walletdepths.MINING}
                    </div>
                </fieldset>

            </div>
        );
    }
}

function TermsCheckbox(props) {
    const checked = props.accepted === true;
    return <input type="checkbox" id="terms-checkbox" defaultChecked={checked} disabled></input>
}
