import React from "react";

import { formatBalance, shorten } from "./_util";
import { CopiableValue } from "./Common";

export class ViewSettings extends React.Component {
    render() {
        const balance = formatBalance(this.props.wallet.getBalance());
        const data = this.props.wallet.getContents();
        const fullMaster = this.props.wallet.getContents().master_secret;
        const abbrMaster = shorten(fullMaster);
        const export_btn_clazz = this.props.downloaded ? '' : 'unsaved';
        return (
        <div className="view-wrapper">
            <header className="header">
                <h1>Settings</h1>
            </header>

            <div id="ViewSettings" className="card">

                    <fieldset className="wallet-buttons">
                        <legend>WALLET FILE</legend>
                        <button className={`pure-button ${export_btn_clazz}`} onClick={this.props.onDownloadWallet}>
                            <i className='button-icon icon-download-solid'></i>Export
                        </button>

                        <label className="pure-button btn-orange" htmlFor="bc-file-input">
                            <i className='button-icon icon-upload-solid'></i>Import
                        </label>
                        <input type="file" id="bc-file-input" className="connect-file-input" name="connect-file-input"
                               onChange={this.props.onUploadWallet} style={{display: 'none'}}/>

                        <button className="pure-button btn-orange" onClick={this.props.onCreateWallet}>
                            <i className='button-icon icon-trash-can-solid'></i>Delete
                        </button>
                    </fieldset>

                    <fieldset className="wallet-buttons">
                        <legend>ADVANCED</legend>
                        <button className="pure-button wide" onClick={()=>this.props.onChangeView('Password')}>
                            <i className='button-icon icon-unlock-solid'></i>Set password
                        </button>
                        <button className="pure-button wide" onClick={()=>this.props.onChangeView('Check')}>
                            <i className='button-icon icon-list-check-solid'></i>Check webcash
                        </button>
                        <button className="pure-button wide" onClick={()=>this.props.onChangeView('Recover')}>
                            <i className='button-icon icon-hammer-solid'></i>Recover wallet
                        </button>
                    </fieldset>

                <div className="clear"></div>

                <fieldset>
                    <legend>WALLET INFO</legend>
                    <div className="setting">
                        <label>master secret</label>
                        <CopiableValue contents={fullMaster} short={abbrMaster}/>
                    </div>
                    <div className="setting">
                        <label>balance</label>{balance}
                    </div>
                    <div className="setting">
                        <label>version</label>{data.version}
                    </div>
                    <div className="setting">
                        <label>accept <a target="_blank" href="https://webcash.org/terms">terms</a></label>
                        <TermsCheckbox accepted={data.legalese.terms} />
                    </div>
                    <div className="setting divider">
                    </div>
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

                <fieldset id="local-webcasa">
                    <legend>SELF-HOSTING</legend>
                    <p>You can run WebCasa.app on our own laptop.</p>
                    <p>Simply download the .zip file below and open <tt>index.html</tt> on a browser to get started.</p>
                    <a className="pure-button" download href="/webcasa.zip"><i className='button-icon icon-download-solid'></i>Download app</a>
                </fieldset>

            </div>
        </div>
        );
    }
}

function TermsCheckbox(props) {
    const checked = props.accepted === true;
    return <input type="checkbox" id="terms-checkbox" defaultChecked={checked} disabled></input>
}
