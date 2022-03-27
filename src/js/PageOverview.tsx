import React from "react";

export class PageOverview extends React.Component {
    render() {

        var balance = this.props.wallet.getBalance().toString();
        var depths = JSON.stringify(this.props.wallet.walletdepths, null, 4);
        return (
            <div id="PageOverview" className="pure-u">
                <pre>
                balance: {balance}
                <br/>
                depths: {depths}
                </pre>
            </div>
        );
    }
}
