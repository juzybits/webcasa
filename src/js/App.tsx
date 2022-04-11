/** App logic and state **/

import React from "react";
import { WebcashWalletLocalStorage } from "webcash";

import { shorten } from "./_util";
import { ActionResult } from "./Common";
import { FormReceive } from "./FormReceive";
import { FormSend } from "./FormSend";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { ViewCheck } from "./ViewCheck";
import { ViewHistory } from "./ViewHistory";
import { ViewRecover } from "./ViewRecover";
import { ViewSecrets } from "./ViewSecrets";
import { ViewSettings } from "./ViewSettings";
import { ViewTerms } from "./ViewTerms";
import { ViewTransfers } from "./ViewTransfers";

export class App extends React.Component {

    constructor(props) {
        super(props);

        this.onAcceptTerms = this.onAcceptTerms.bind(this);
        this.onChangeView = this.onChangeView.bind(this);
        this.onCreateWallet = this.onCreateWallet.bind(this);
        this.onUploadWallet = this.onUploadWallet.bind(this);
        this.onDownloadWallet = this.onDownloadWallet.bind(this);
        this.onCheckWallet = this.onCheckWallet.bind(this);
        this.onRecoverWallet = this.onRecoverWallet.bind(this);
        this.onReceiveWebcash = this.onReceiveWebcash.bind(this);
        this.onSendAmount = this.onSendAmount.bind(this);

        let wallet = WebcashWalletLocalStorage.load();
        if (!wallet) {
            wallet = new WebcashWalletLocalStorage();
            wallet.setLegalAgreementsToTrue();
            wallet.save();
        }

        this.state = {
            view: 'Transfers',
            wallet: wallet,
            downloaded: true,
            lastReceive: '',
            lastSend: '',
            lastCheck: [],
            lastRecover: [],
            termsAccepted: false,
        };

        const dis = this;
        window.addEventListener("beforeunload", function(e) {
            if (dis.state.locked || !dis.state.downloaded) {
                e.preventDefault();
                // TODO: this doesn't work (default message is shown)
                return e.returnValue = dis.state.locked
                    ? "Please wait for the process to complete"
                    : "You didn't download your updated wallet. Are you sure you want to exit?";
            }
        });
    }

    onAcceptTerms() {
        this.setState({termsAccepted: true});
    }

    onChangeView(view) {
        if (this.state.locked) {
            alert("Please wait for the process to complete");
        } else {
            this.setState({view: view});
        }
    }

    private replaceWallet(wallet: WebcashWallet): bool {
        this.setState({
            wallet: wallet,
            downloaded: true,
            locked: false,
            lastReceive: '',
            lastSend: '',
        });
    }

    private saveModifiedWallet(alreadySaved=false) {
        if (!alreadySaved) {
            this.state.wallet.save();
        }
        this.setState({
            wallet: this.state.wallet, // force repaint
            downloaded: false,
        });
    }

    /* Settings (wallet operations) */

    private confirmOverwriteWallet(): bool {
        const balance = this.state.wallet.getBalance();
        if (balance.isZero()) {
            return true;
        }
        const master = shorten(this.state.wallet.master_secret);
        return confirm(`This will DELETE your current wallet '${master}' (₩ ${balance})`+
            "\n\nDo you wish to continue?");
    }

    onCreateWallet(event) {
        if (!this.confirmOverwriteWallet()) {
            return;
        }
        const wallet = new WebcashWalletLocalStorage();
        wallet.setLegalAgreementsToTrue(); // already agreed on 1st page load
        wallet.save();
        this.replaceWallet(wallet);
    }

    onUploadWallet(event) {
        if (!this.confirmOverwriteWallet()) {
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
        const dis = this;
        reader.onload = function() {
            const walletData = JSON.parse(reader.result);
            const wallet = new WebcashWalletLocalStorage(walletData);
            wallet.save();
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

    async onCheckWallet() {
        this.setState({lastCheck: [], locked: true});

        // Capture console output from underlying wallet
        const realLog = window.console.log;
        const dis = this;
        const lastCheck = [];
        let key = 0;
        window.console.log = function() {
            realLog.apply(console, arguments);
            const logMessage = [...arguments].join(' ');
            lastCheck.push(<p key={key++}>{logMessage}</p>);
            dis.setState({lastCheck: lastCheck});
        };

        try {
            console.log("(webcasa) Checking wallet");
            await this.state.wallet.check(); // changes wallet contents but doesn't call save()
            await Promise.resolve(); // needed?
            this.saveModifiedWallet(); // TODO: do this only if wallet changed
            console.log("(webcasa) New balance:", this.state.wallet.getBalance().toString());
            console.log("(webcasa) Done!");
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message}`}</div>;
            this.setState({ lastCheck: <ActionResult success={false} contents={errMsg} /> });
        } finally {
            window.console.log = realLog;
            this.setState({locked: false});
        }
    }

    async onRecoverWallet(masterSecret, gapLimit) {
        const sameSecret = masterSecret === this.state.wallet.master_secret;
        if (!sameSecret && !this.confirmOverwriteWallet()) {
            return;
        }

        this.setState({lastRecover: [], locked: true});

        // Capture console output from underlying wallet
        const realLog = window.console.log;
        const dis = this;
        const lastRecover = [];
        let key = 0;
        window.console.log = function() {
            realLog.apply(console, arguments);
            if (arguments[0].startsWith('results =')) {
                return;
            }
            const logMessage = [...arguments].join(' ');
            lastRecover.push(<p key={key++}>{logMessage}</p>);
            dis.setState({lastRecover: lastRecover});
        };

        try {
            const wallet = sameSecret
                ? this.state.wallet
                : new WebcashWalletLocalStorage({"master_secret": masterSecret});
            const introMsg = sameSecret
                ? "(webcasa) Updating current wallet (same master secret)"
                : `(webcasa) Replacing current wallet with '${shorten(wallet.master_secret)}'`;
            console.log(introMsg)

            wallet.setLegalAgreementsToTrue();
            await wallet.recover(gapLimit); // changes wallet and calls save() (writes local storage)
            await Promise.resolve();
            console.log("(webcasa) Found balance:", wallet.getBalance().toString());

            if (!sameSecret) {
                this.replaceWallet(wallet);
            }
            this.saveModifiedWallet(true); // TODO: do this only if wallet changed
            console.log("(webcasa) Done!");
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (masterSecret=${masterSecret}, gapLimit=${gapLimit})`}</div>;
            this.setState({ lastRecover: <ActionResult success={false} contents={errMsg} /> });
        } finally {
            window.console.log = realLog;
            this.setState({locked: false});
        }
    }

    /* Transfers (webcash operations) */

    async onReceiveWebcash(webcash, memo) {
        try {
            const new_webcash = await this.state.wallet.insert(webcash, memo);
            this.setState({ lastReceive: <ActionResult success={true} contents={new_webcash} title="Success! The new secret was saved" /> });
            this.saveModifiedWallet();
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (webcash=${webcash}, memo=${memo})`}</div>;
            this.setState({ lastReceive: <ActionResult success={false} contents={errMsg} title='' /> });
        }
    }

    async onSendAmount(amount, memo) {
        try {
            const webcash = await this.state.wallet.pay(amount, memo);
            this.setState({ lastSend: <ActionResult success={true} contents={webcash} title="Success! Here is the new secret" /> });
            this.saveModifiedWallet();
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (amount=${amount}, memo=${memo})`}</div>;
            this.setState({ lastSend: <ActionResult success={false} contents={errMsg} title='' /> });
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
            view = <ViewRecover wallet={this.state.wallet} onChangeView={this.onChangeView}
                        onRecoverWallet={this.onRecoverWallet} lastRecover={this.state.lastRecover}/>;
        } else
        if ('Check' === this.state.view) {
            view = <ViewCheck wallet={this.state.wallet} onChangeView={this.onChangeView}
                        onCheckWallet={this.onCheckWallet} lastCheck={this.state.lastCheck}/>;
        }

        return (
            <div id="layout" className="content pure-g">
                <Navigation
                    wallet={this.state.wallet}
                    downloaded={this.state.downloaded}
                    onDownloadWallet={this.onDownloadWallet}
                    onChangeView={this.onChangeView}
                />


                {view}

                {this.state.termsAccepted ? '' : <ViewTerms />}
                <div id="tooltip">Copied!</div>
                <div id="this-is-mobile"></div>
            </div>
        );
    }

}
