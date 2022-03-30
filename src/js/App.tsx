import React from "react";
import { WebcashWalletLocalStorage } from "webcash";

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
        this.handleUploadWallet = this.handleUploadWallet.bind(this);
        this.handleCreateWallet = this.handleCreateWallet.bind(this);
        this.state = {
            view: 'Wallet',
            wallet: WebcashWalletLocalStorage.load() ?? new WebcashWalletLocalStorage(),
            saved: true, // did the user download the latest wallet file
        };
    }

    render() {
        var view = '';
        if ('Wallet' === this.state.view) {
            view = <ViewWallet
                        wallet={this.state.wallet}
                        handleUploadWallet={this.handleUploadWallet}
                        handleCreateWallet={this.handleCreateWallet}
                    />;
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
                    handleUploadWallet={this.handleUploadWallet}
                    handleMenuClick={this.handleMenuClick}
                />
                {view}
            </div>
        );
    }

    replaceWallet(wallet: WebcashWallet): bool {
        if (this.state.saved === false) {
            alert("Please download your updated wallet first (so you don't lose the changes you made)");
            return false;
        } else {
            this.setState({ wallet: wallet });
            wallet.save();
            return true;
        }
    }

    handleMenuClick(itemName) {
        this.setState({view: itemName});
    }

    handleCreateWallet(event) {
        const wallet = new WebcashWalletLocalStorage();
        this.replaceWallet(wallet);
    }

    handleUploadWallet(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        const dis = this;

        reader.onload = function() {
            const walletData = JSON.parse(reader.result);
            const wallet = new WebcashWalletLocalStorage(walletData);
            dis.replaceWallet(wallet);
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
    }

}
