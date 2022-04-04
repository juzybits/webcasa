import React from "react";
import { WebcashWalletLocalStorage } from "webcash";

import { Navigation } from "./Navigation";
import { ViewHistory } from "./ViewHistory";
import { FormReceive } from "./FormReceive";
import { Header } from "./Header";
import { ViewTransfers } from "./ViewTransfers";
import { ViewRecover } from "./ViewRecover";
import { ViewSecrets } from "./ViewSecrets";
import { FormSend } from "./FormSend";
import { ViewSettings } from "./ViewSettings";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleUploadWallet = this.handleUploadWallet.bind(this);
        this.showView = this.showView.bind(this);
        this.handleDownloadWallet = this.handleDownloadWallet.bind(this);
        this.handleCreateWallet = this.handleCreateWallet.bind(this);
        this.handleModifyWallet = this.handleModifyWallet.bind(this);
        this.state = {
            view: 'Transfers',
            wallet: WebcashWalletLocalStorage.load() ?? new WebcashWalletLocalStorage(),
            saved: true, // did the user download the latest wallet file
        };
        this.state.wallet.setLegalAgreementsToTrue(); // TODO ask for user input
        this.state.wallet.save();
        var dat = this;
        window.addEventListener("beforeunload", function(e) {
            if (!dat.state.saved) {
                e.preventDefault();
                return e.returnValue = "You didn't download your updated wallet. Are you sure you want to exit?";
            }
        });
    }

    render() {
        var view = '';
        if ('Settings' === this.state.view) {
            view = <ViewSettings
                        wallet={this.state.wallet}
                        saved={this.state.saved}
                        showView={this.showView}
                        handleUploadWallet={this.handleUploadWallet}
                        handleDownloadWallet={this.handleDownloadWallet}
                        handleCreateWallet={this.handleCreateWallet}
                    />;
        } else
        if ('Transfers' === this.state.view) {
            view = <ViewTransfers wallet={this.state.wallet} handleModifyWallet={this.handleModifyWallet} />;
        } else
        if ('Secrets' === this.state.view) {
            view = <ViewSecrets wallet={this.state.wallet} />;
        } else
        if ('History' === this.state.view) {
            const logs = this.state.wallet.getContents().log;
            view = <ViewHistory wallet={this.state.wallet} logs={logs}/>;
        } else
        if ('Recover' === this.state.view) {
            view = <ViewRecover wallet={this.state.wallet} handleModifyWallet={this.handleModifyWallet} />;
            view = <ViewRecover
                        wallet={this.state.wallet}
                        showView={this.showView}
                        handleModifyWallet={this.handleModifyWallet}
                    />;
        }

        return (
            <div id="layout" className="content pure-g">

                <Navigation
                    wallet={this.state.wallet}
                    saved={this.state.saved}
                    handleDownloadWallet={this.handleDownloadWallet}
                    handleMenuClick={this.handleMenuClick}
                />

                <Header title={this.state.view} wallet={this.state.wallet} />

                {view}

                <div id="tooltip">Copied!</div>
                <div id="this-is-mobile"></div>
            </div>
        );
    }

    replaceWallet(wallet: WebcashWallet): bool {
        if (this.state.saved === false) {
            alert("First download the wallet (to avoid losing your recent changes)");
            return false;
        } else {
            this.setState({wallet: wallet});
            wallet.save();
            return true;
        }
    }

    handleMenuClick(itemName) {
        this.setState({view: itemName});
    }

    handleCreateWallet(event) {
        const wallet = new WebcashWalletLocalStorage();
        wallet.setLegalAgreementsToTrue(); // TODO ask for user input
        wallet.save();
        this.replaceWallet(wallet);
    }

    handleModifyWallet() {
        this.state.wallet.save();
        this.setState({
            saved: false,
            wallet: this.state.wallet // force repaint of navbar etc
        });
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

    showView(view) {
        this.setState({view: view});
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
        this.setState({saved: true});
    }

}
