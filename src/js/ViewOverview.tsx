import React from "react";

import { getShortMasterSecret } from "./_util";

export class ViewOverview extends React.Component {
    render() {
        var balance = this.props.wallet.getBalance().toString();
        var data = this.props.wallet.getContents();
        return (
            <div id="ViewOverview" className="pure-u">
                <pre>
                    <br/> master secret: {getShortMasterSecret(this.props.wallet)}
                    <br/> balance: {balance}
                    <br/> version: {JSON.stringify(data.version, null, 4)}
                    <br/> terms: {data.legalese === true ? 'yes' :'no'}
                    <br/> depths: {JSON.stringify(data.walletdepths, null, 4)}
                    <br/> webcash: {data.webcash.length}
                    <br/> unconfirmed: {data.unconfirmed.length}
                    <br/> log: {data.log.length}
                </pre>
            </div>
        );
    }
}
