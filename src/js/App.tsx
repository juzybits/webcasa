import React from "react";
import { WebcashWalletLocalStorage } from "webcash";

import { ActionResult } from "./Common";
import { FormReceive } from "./FormReceive";
import { FormSend } from "./FormSend";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { ViewHistory } from "./ViewHistory";
import { ViewRecover } from "./ViewRecover";
import { ViewSecrets } from "./ViewSecrets";
import { ViewSettings } from "./ViewSettings";
import { ViewTransfers } from "./ViewTransfers";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeView = this.onChangeView.bind(this);
        this.onCreateWallet = this.onCreateWallet.bind(this);
        this.onUploadWallet = this.onUploadWallet.bind(this);
        this.onDownloadWallet = this.onDownloadWallet.bind(this);
        this.onRecoverWallet = this.onRecoverWallet.bind(this);
        this.onReceiveWebcash = this.onReceiveWebcash.bind(this);
        this.onSendAmount = this.onSendAmount.bind(this);

        this.state = {
            view: 'Transfers',
            wallet: WebcashWalletLocalStorage.load() ?? new WebcashWalletLocalStorage(),
            downloaded: true,
            lastReceive: '',
            lastSend: '',
        };

        this.state.wallet.setLegalAgreementsToTrue(); // TODO ask for user input
        this.state.wallet.save(); // TODO clean up this process

        var dat = this;
        window.addEventListener("beforeunload", function(e) {
            if (!dat.state.downloaded) {
                e.preventDefault();
                return e.returnValue = "You didn't download your updated wallet. Are you sure you want to exit?";
            }
        });
    }

    onChangeView(view) {
        this.setState({view: view});
    }

    /* Settings (wallet operations) */

    private replaceWallet(wallet: WebcashWallet): bool {
        if (this.state.downloaded === false) {
            alert("First download the wallet (to avoid losing your recent changes)");
            return false;
        } else {
            this.setState({
                wallet: wallet,
                downloaded: true,
                lastReceive: '',
                lastSend: '',
            });
            wallet.save();
            return true;
        }
    }

    onCreateWallet(event) {
        const wallet = new WebcashWalletLocalStorage();
        wallet.setLegalAgreementsToTrue(); // already agreed on 1st page load
        this.replaceWallet(wallet);
    }

    onUploadWallet(event) {
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

    onDownloadWallet(event) {
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
        this.setState({downloaded: true});
    }

    async onRecoverWallet(masterSecret, gapLimit) {
        // TODO: render console output in box
        // var oldLog = window.console.log;
        // window.console.log = function(msg) {
        //     alert(msg);
        //     oldLog.apply(console, arguments);
        // };
        try {
            let wallet = new WebcashWalletLocalStorage({"master_secret": masterSecret});
            wallet.setLegalAgreementsToTrue();
            await wallet.recover(gapLimit);
            await Promise.resolve(); // is this needed?
            console.log("Found balance", wallet.getBalance().toFixed(8));
            this.replaceWallet(wallet);
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (masterSecret=${masterSecret}, gapLimit=${gapLimit})`}</div>;
            // this.setState({ lastResult: <ActionResult success={false} contents={errMsg} label={this.label} /> });
        } finally {
            // window.log = oldLog;
        }
    }

    /* Transfers (webcash operations) */

    private saveWallet() {
        this.state.wallet.save();
        this.setState({
            downloaded: false,
            wallet: this.state.wallet // force repaint of navbar etc
        });
    }

    async onReceiveWebcash(webcash, memo) {
        try {
            const new_webcash = await this.state.wallet.insert(webcash, memo);
            this.setState({ lastReceive: <ActionResult success={true} contents={new_webcash} label="Success! The new secret was saved" /> });
            this.saveWallet();
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (webcash=${webcash}, memo=${memo})`}</div>;
            this.setState({ lastReceive: <ActionResult success={false} contents={errMsg} label='' /> });
        }
    }

    async onSendAmount(amount, memo) {
        try {
            const webcash = await this.state.wallet.pay(amount, memo);
            this.setState({ lastSend: <ActionResult success={true} contents={webcash} label="Success! Here is the new secret" /> });
            this.saveWallet();
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (amount=${amount}, memo=${memo})`}</div>;
            this.setState({ lastSend: <ActionResult success={false} contents={errMsg} label='' /> });
        }
    }

    render() {
        var view = '';
        if ('Settings' === this.state.view) {
            view = <ViewSettings
                        wallet={this.state.wallet}
                        downloaded={this.state.downloaded}
                        onChangeView={this.onChangeView}
                        onUploadWallet={this.onUploadWallet}
                        onDownloadWallet={this.onDownloadWallet}
                        onCreateWallet={this.onCreateWallet}
                    />;
        } else
        if ('Transfers' === this.state.view) {
            view = <ViewTransfers
                wallet={this.state.wallet}
                onReceiveWebcash={this.onReceiveWebcash} lastReceive={this.state.lastReceive}
                onSendAmount={this.onSendAmount} lastSend={this.state.lastSend}
            />;
        } else
        if ('Secrets' === this.state.view) {
            view = <ViewSecrets wallet={this.state.wallet} />;
        } else
        if ('History' === this.state.view) {
            const logs = this.state.wallet.getContents().log;
            view = <ViewHistory wallet={this.state.wallet} logs={logs}/>;
        } else
        if ('Recover' === this.state.view) {
            view = <ViewRecover wallet={this.state.wallet}
                        onRecoverWallet={this.onRecoverWallet}
                        onChangeView={this.onChangeView} />;
        }

        return (
            <div id="layout" className="content pure-g">

                <Navigation
                    wallet={this.state.wallet}
                    downloaded={this.state.downloaded}
                    onDownloadWallet={this.onDownloadWallet}
                    onChangeView={this.onChangeView}
                />

                <Header title={this.state.view} wallet={this.state.wallet} />

                {view}

                <div id="tooltip">Copied!</div>
                <div id="this-is-mobile"></div>
            </div>
        );
    }

}
