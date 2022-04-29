/** App logic and state **/

import React from "react";
import CryptoJS from 'crypto-js'
import { WebcashWallet, SecretWebcash } from "webcash";

import { shorten } from "./_util";
import { ActionResult } from "./Common";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { ViewCheck } from "./ViewCheck";
import { ViewExternalReceive } from "./ViewExternalReceive";
import { ViewHistory } from "./ViewHistory";
import { ViewPassword } from "./ViewPassword";
import { ViewRecover } from "./ViewRecover";
import { ViewSecrets } from "./ViewSecrets";
import { ViewSettings } from "./ViewSettings";
import { ViewTerms } from "./ViewTerms";
import { ViewTransfers } from "./ViewTransfers";

/**
 * Optionally encrypted with a password.
 * When no password is provided, this class works like WebcashWalletLocalStorage.
 *
 * TODO: sha256 password
 */
export class CasaWallet extends WebcashWallet {
    private static locStoKey = 'wallet';
    private password;

    constructor(walletData: Partial<WebcashWalletData> = {}, password?: string) {
        super(walletData);
        this.password = password;
    }

    public static create(walletdata: Partial<WebcashWalletData> = {}, password?: string): WebcashWallet {
        const wallet = new CasaWallet(walletdata, password);
        wallet.save();
        return wallet;
    }

    public save(): boolean {
        const contents = this.getContents();
        const json = JSON.stringify(contents, null, 4);
        const encrypted = this.password ? CryptoJS.AES.encrypt(json, this.password) : json;
        window.localStorage.setItem(CasaWallet.locStoKey, encrypted.toString());
        console.log("(webcasa) Saved wallet to localStorage");
        return true;
    }

    public static load(password?: string): WebcashWallet | undefined {
        const encrypted = window.localStorage.getItem(CasaWallet.locStoKey);
        if (encrypted) {
            const decrypted = password ? CryptoJS.AES.decrypt(encrypted, password) : encrypted;
            const parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
            let wallet = new CasaWallet(parsed, password);
            console.log("(webcasa) Loaded wallet from localStorage");
            return wallet;
        } else {
            console.warn("(webcasa) Couldn't load wallet from localStorage");
            return;
        }
    }
}

export class App extends React.Component {

    constructor(props) {
        super(props);

        /* User actions */

        this.onAcceptTerms = this.onAcceptTerms.bind(this);
        this.onChangeView = this.onChangeView.bind(this);
        this.onCreateWallet = this.onCreateWallet.bind(this);
        this.onUploadWallet = this.onUploadWallet.bind(this);
        this.onDownloadWallet = this.onDownloadWallet.bind(this);
        this.onCheckWallet = this.onCheckWallet.bind(this);
        this.onRecoverWallet = this.onRecoverWallet.bind(this);
        this.onReceiveWebcash = this.onReceiveWebcash.bind(this);
        this.onSendAmount = this.onSendAmount.bind(this);

        /* State initialization */

        // TODO: ask for password if wallet is encrypted
        let wallet = CasaWallet.load();
        if (!wallet) {
            // Create and save a new wallet
            wallet = new CasaWallet();
            wallet.setLegalAgreementsToTrue(); // wallet-level accept
            wallet.save();
        } else if (!wallet.checkLegalAgreements()) {
            // Handle corner cases like old/corrupted wallets
            wallet.setLegalAgreementsToTrue(); // wallet-level accept
            wallet.save();
        }
        const conf = this.loadConfig();
        this.state = {
            wallet: wallet,
            // Ephemeral app state
            view: 'Transfers',
            locked: false,
            lastReceive: '',
            lastSend: null,
            lastCheck: [],
            lastRecover: [],
            externalAction: null,
            // Persistent app config
            downloaded: conf.downloaded ?? true,
            encrypted: conf.encrypted ?? false,
            termsAccepted: conf.termsAccepted ?? false, // site-level accept
        };

        /* On 1st visit - process URL parameters */

        const params = new URLSearchParams(window.location.search);
        const webcash_raw = params.get('receive');
        if (webcash_raw) {
            try {
                const webcash = SecretWebcash.deserialize(webcash_raw)
                const memo = params.get('memo') ?? '';
                this.state.externalAction = ['receive', {webcash: webcash, memo: memo}];
            } catch (err) {
                console.error(err);
            }
        }

        /* On page exit - alert about unsaved changes */

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

        // TODO: Undo this (Apr 29 2022)
        // TODO: if 'casa' in localStorage, move to 'config'
    }

    /* Helper methods */

    private loadConfig() {
        const data = window.localStorage.getItem('config');
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }

    private saveConfig() {
        console.debug("(webcasa) saving config")
        const state = {
            downloaded: this.state.downloaded,
            encrypted: this.state.encrypted,
            termsAccepted: this.state.termsAccepted,
        };
        window.localStorage.setItem('config', JSON.stringify(state, null, 4));

    }

    private replaceWallet(wallet: WebcashWallet): bool {
        this.setState({
            wallet: wallet,
            downloaded: true,
            encrypted: false,
            locked: false,
            lastReceive: '',
            lastSend: null,
        }, this.saveConfig);
    }

    private saveModifiedWallet(alreadySaved=false) {
        if (!alreadySaved) {
            this.state.wallet.save();
        }
        this.setState({
            wallet: this.state.wallet, // force repaint
            downloaded: false,
        }, this.saveConfig);
    }

    /* Handle navigation */

    onAcceptTerms() {
        this.setState({termsAccepted: true}, this.saveConfig);
    }

    onChangeView(view) {
        if (this.state.locked) {
            alert("Please wait for the process to complete");
        } else {
            this.setState({view: view});
        }
    }

    /* Handle Settings (wallet operations) */

    private confirmOverwriteWallet(): bool {
        const balance = this.state.wallet.getBalance();
        if (balance.isZero()) {
            return true;
        }
        const master = shorten(this.state.wallet.master_secret);
        return confirm(`This will DELETE your current wallet '${master}' (₩ ${balance})`+
            "\n\nDo you want to continue?");
    }

    onCreateWallet(event) {
        if (!this.confirmOverwriteWallet()) {
            return;
        }
        const wallet = new CasaWallet();
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
            const wallet = new CasaWallet(walletData);
            wallet.setLegalAgreementsToTrue(); // user could have uploaded a wallet without accepted terms
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
        this.setState({downloaded: true}, this.saveConfig);
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
                : new CasaWallet({"master_secret": masterSecret});
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

    onSetPassword(password: string = ''/*, autolock: number = 15*/) { // TODO
        console.log("webcasa TODO: setting password to:", password);
    }

    /* Handle Transfers (webcash operations) */

    async onReceiveWebcash(webcash, memo) {
        try {
            const new_webcash = await this.state.wallet.insert(webcash, memo);
            this.setState({ lastReceive: <ActionResult success={true} contents={new_webcash} title="Success! The new secret was saved" /> });
            this.saveModifiedWallet();
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (webcash=${webcash}, memo=${memo})`}</div>;
            this.setState({ lastReceive: <ActionResult success={false} contents={errMsg} title='' /> });
        } finally {
            if (this.state.externalAction) {
                this.setState({
                    externalAction: null,
                    view: 'Transfers',
                });
                window.history.pushState({}, '', window.location.origin + window.location.pathname);
            }
        }
    }

    async onSendAmount(amount, memo) {
        try {
            const webcash = await this.state.wallet.pay(amount, memo);
            this.setState({ lastSend: {webcash: webcash, memo: memo, error: null} });
            this.saveModifiedWallet();
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (amount=${amount}, memo=${memo})`}</div>;
            this.setState({ lastSend: {webcash: null, memo: null, error: errMsg} });
        }
    }

    /* Render */

    render() {
        let view = '';
        let blur = '';

        // Preempt with modal if there's an external action (e.g. '?receive=...')
        if (this.state.externalAction) {
            blur = 'blur';
            const action = this.state.externalAction[0];
            if (action === 'receive') {
                const params = this.state.externalAction[1];
                view = <ViewExternalReceive webcash={params.webcash} memo={params.memo}
                            onReceiveWebcash={this.onReceiveWebcash} />;
            }
        } else
        // Preempt with modal if terms are not accepted
        if (!this.state.termsAccepted) {
            blur = 'blur';
            view = <ViewTerms onAcceptTerms={this.onAcceptTerms} />;
        } else
        // Regular view rendering
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
        } else
        if ('Password' === this.state.view) {
            view = <ViewPassword
                        wallet={this.state.wallet}
                        onSetPassword={this.onSetPassword}
                        onChangeView={this.onChangeView}
                    />;
        }

        return (
            <div id="layout" className={`content pure-g ${blur}`}>
                <Navigation
                    wallet={this.state.wallet}
                    onDownloadWallet={this.onDownloadWallet}
                    onChangeView={this.onChangeView}
                />

                {view}

                <div id="tooltip">Copied!</div>
                <div id="this-is-mobile"></div>
            </div>
        );
    }

}
