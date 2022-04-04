import React from "react";

export class BalanceIndicator extends React.Component {
    render() {
        const balance = this.props.wallet.getBalance().toString();
        return (
            <div id="BalanceIndicator">
                <label id="balance">Balance: {balance}</label>
            </div>
        );
    }
}
