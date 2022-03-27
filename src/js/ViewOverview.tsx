import React from "react";

import { getShortMasterSecret } from "./_util";

export class ViewOverview extends React.Component {
    render() {
        const balance = this.props.wallet.getBalance().toString();
        const data = this.props.wallet.getContents();
        return (
            <div id="ViewOverview" className="pure-u">
            <table className="pure-table">
            <tbody>
                <tr><td>master secret:</td><td><pre>{getShortMasterSecret(this.props.wallet)}</pre></td></tr>
                <tr><td>balance:</td><td>{balance}</td></tr>
                <tr><td>depths:</td><td>{JSON.stringify(data.walletdepths,null,4)}</td></tr>
                <tr><td>log:</td><td>{data.log.length}</td></tr>
                <tr><td>webcashes:</td><td>{data.webcash.length}</td></tr>
                <tr><td>unconfirmed:</td><td>{data.unconfirmed.length}</td></tr>
                <tr><td>terms accepted:</td><td>{data.legalese===true?'yes':'no'}</td></tr>
                <tr><td>version:</td><td>{JSON.stringify(data.version,null,4)}</td></tr>
            </tbody>
            </table>
            </div>
        );
    }
}
