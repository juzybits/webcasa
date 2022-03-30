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
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.handleCreateWallet = this.handleCreateWallet.bind(this);
        this.handleDownloadWallet = this.handleDownloadWallet.bind(this);
        this.state = {
            view: 'Wallet',
            wallet: WebcashWalletLocalStorage.load() ?? new WebcashWalletLocalStorage(),
        };
    }

    render() {
        var view = '';
        if ('Wallet' === this.state.view) {
            view = <ViewWallet
                        wallet={this.state.wallet}
                        handleWalletUpload={this.handleWalletUpload}
                        handleCreateWallet={this.handleCreateWallet}
                        handleDownloadWallet={this.handleDownloadWallet}
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
                    handleWalletUpload={this.handleWalletUpload}
                    handleMenuClick={this.handleMenuClick}
                />
                {view}
            </div>
        );
    }

    // TODO: warn about replacing un-saved changes
    replaceWallet(wallet) {
        this.setState({ wallet: wallet });
        wallet.save();
    }

    handleMenuClick(itemName) {
        this.setState({view: itemName});
    }

    handleWalletUpload(event) {
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

    handleCreateWallet(event) {
        const wallet = new WebcashWalletLocalStorage();
        this.replaceWallet(wallet);
    }

    handleDownloadWallet(event) {
        const filename = 'default_wallet.webcash';
        const contents = this.state.wallet.getContents();
        const jsonContents = JSON.stringify(contents, null, 4);

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonContents));
        element.setAttribute('download', filename);
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

}
