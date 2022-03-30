import React from "react";
import { WebcashWallet } from "webcash";

import { Navigation } from "./Navigation";
import { ViewLog } from "./ViewLog";
import { ViewReceive } from "./ViewReceive";
import { ViewSend } from "./ViewSend";
import { ViewUnconfirmed } from "./ViewUnconfirmed";
import { ViewWallet } from "./ViewWallet";
import { ViewWebcashes } from "./ViewWebcashes";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.state = {
            view: 'Wallet',
            wallet: new WebcashWallet(),
        };
    }

    render() {
        var view = '';
        if ('Wallet' === this.state.view) {
            view = <ViewWallet wallet={this.state.wallet}
                            handleWalletUpload={this.handleWalletUpload}/>;
        } else
        if ('Send' === this.state.view) {
            view = <ViewSend wallet={this.state.wallet} />;
        } else
        if ('Receive' === this.state.view) {
            view = <ViewReceive wallet={this.state.wallet} />;
        } else
        if ('Log' === this.state.view) {
            const logs = this.state.wallet.getContents().log;
            view = <ViewLog logs={logs}/>;
        } else
        if ('Webcashes' === this.state.view) {
            view = <ViewWebcashes wallet={this.state.wallet} />;
        } else
        if ('Unconfirmed' === this.state.view) {
            view = <ViewUnconfirmed wallet={this.state.wallet} />;
        }

        return (
            <div id="layout" className="content pure-g">
                <div id="tooltip">Copied to clipboard</div>
                <Navigation
                    wallet={this.state.wallet}
                    handleWalletUpload={this.handleWalletUpload}
                    handleMenuClick={this.handleMenuClick}
                />
                {view}
            </div>
        );
    }

    handleMenuClick(itemName) {
        this.setState({view: itemName});
    }

    handleWalletUpload(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        var dis = this;

        reader.onload = function() {
            var walletMap = JSON.parse(reader.result);
            var walletObj = new WebcashWallet(walletMap);

            dis.setState({
                wallet: walletObj,
                page: 'Wallet'
            });
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
    }
}
