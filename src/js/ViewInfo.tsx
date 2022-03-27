import React from "react";

export class ViewInfo extends React.Component {
    render() {
        var balance = this.props.wallet.getBalance().toString();
        var data = this.props.wallet.getContents();
        return (
            <div id="ViewInfo" className="pure-u">
                <pre>
                    <br/> master secret: {this.prettySecret(data.master_secret)}
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

    prettySecret(secret) {
        var start = secret.slice(0, 4);
        var end = secret.slice(-4);
        return `${start}...${end}`;
    }
}
