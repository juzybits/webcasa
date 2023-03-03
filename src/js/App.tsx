/** App logic and state **/

import React from "react";
import CryptoJS from 'crypto-js'
import { WebcashWallet, SecretWebcash } from "webcash";

import { formatBalance, makePassword, shorten } from "./_util";
import { ActionResult } from "./Common";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { ViewCheck } from "./ViewCheck";
import { ViewExternalReceive } from "./ViewExternalReceive";
import { ViewAbout } from "./ViewAbout";
import { ViewHistory } from "./ViewHistory";
import { ViewPassword } from "./ViewPassword";
import { ViewRecover } from "./ViewRecover";
import { ViewSecrets } from "./ViewSecrets";
import { ViewSettings } from "./ViewSettings";
import { ViewTerms } from "./ViewTerms";
import { ViewTransfers } from "./ViewTransfers";
import { ViewUnlock } from "./ViewUnlock";

/**
 * Optionally encrypted with a password.
 * When no password is provided, this class works like WebcashWalletLocalStorage.
 */
export class CasaWallet extends WebcashWallet {
    private static locStoKey = 'wallet';
    private password;

    constructor(walletData: Partial<WebcashWalletData> = {}, password?: string) {
        super(walletData);
        this.password = password;
    }

    public static exists(): bool {
        return null !== window.localStorage.getItem(CasaWallet.locStoKey);
    }

    public setPassword(password: string|null) {
        this.password = password;
    }
    public getPassword(): string|null {
        return this.password;
    }

    public save(): boolean {
        const contents = this.getContents();
        const json = JSON.stringify(contents, null, 4);
        const encrypted = this.password ? CryptoJS.AES.encrypt(json, this.password) : json;
        window.localStorage.setItem(CasaWallet.locStoKey, encrypted.toString());
        console.debug("(webcasa) Wallet saved to localStorage");
        return true;
    }

    public static load(password?: string): WebcashWallet|undefined {
        const rawWallet = window.localStorage.getItem(CasaWallet.locStoKey);
        if (!rawWallet) {
            console.warn("(webcasa) Wallet not found in localStorage");
            return;
        }

        let wallet;
        if (!password) {
            wallet = new CasaWallet(JSON.parse(rawWallet));
        } else {
            try {
                const strWallet = CryptoJS.AES.decrypt(rawWallet, password).toString(CryptoJS.enc.Utf8);
                wallet = new CasaWallet(JSON.parse(strWallet), password);
            } catch(err) {
                console.warn("(webcasa) Incorrect password when loading wallet");
                return;
            }
        }
        console.log("(webcasa) Wallet loaded from localStorage");
        return wallet;
    }

}

export class App extends React.Component {

    private static defaultState = {
        inProgress: false,
        lastReceive: '',
        lastSend: null,
        lastCheck: [],
        lastRecover: [],
    };

    constructor(props) {
        super(props);

        /* User actions */

        this.onAcceptTerms = this.onAcceptTerms.bind(this);
        this.onChangeView = this.onChangeView.bind(this);
        this.onCheckWallet = this.onCheckWallet.bind(this);
        this.onCreateWallet = this.onCreateWallet.bind(this);
        this.onDownloadWallet = this.onDownloadWallet.bind(this);
        this.onExternalInsert = this.onExternalInsert.bind(this);
        this.onNavButtonClick = this.onNavButtonClick.bind(this);
        this.onReceiveWebcash = this.onReceiveWebcash.bind(this);
        this.onRecoverWallet = this.onRecoverWallet.bind(this);
        this.onSendAmount = this.onSendAmount.bind(this);
        this.resetLastSend = this.resetLastSend.bind(this);
        this.resetLastReceive = this.resetLastReceive.bind(this);
        this.onSetPassword = this.onSetPassword.bind(this);
        this.onUnlockWallet = this.onUnlockWallet.bind(this);
        this.onUploadWallet = this.onUploadWallet.bind(this);

        /* On 1st visit - process URL parameters */

        let externalReceive = null;
        const params = new URLSearchParams(window.location.search);
        const webcash_raw = params.get('receive');
        if (webcash_raw) {
            try {
                const webcash = SecretWebcash.deserialize( decodeURI(webcash_raw) )
                const memo = params.get('memo') ?? '';
                externalReceive = { webcash: webcash, memo: decodeURI(memo) };
            } catch (err) {
                console.error(err);
            }
        }

        /* State initialization */

        const conf = this.loadConfig();
        this.state = {
            wallet: (CasaWallet.exists() && !conf.encrypted) ? CasaWallet.load() : null,
            // Ephemeral app state
            ...App.defaultState,
            view: 'Transfers',
            externalReceive: externalReceive,
            bufferedReceive: null,
            bufferedRecover: null,
            // Persistent app config
            encrypted: conf.encrypted ?? false,
            termsAccepted: conf.termsAccepted ?? false, // site-level accept
        };

        /* On page exit - alert if in progress */

        const dis = this;
        window.addEventListener("beforeunload", function(e) {
            if (dis.state.inProgress) {
                e.preventDefault();
                e.returnValue = "Are you sure?";
                return "Are you sure?";
            }
        });
    }

    /* Helper methods */

    private loadConfig() {
        // If 'casa' in localStorage, rename to 'config' // TODO: delete this (May 7)
        const dataLegacy = window.localStorage.getItem('casa');
        if (dataLegacy) {
            window.localStorage.setItem('config', dataLegacy);
            window.localStorage.removeItem('casa');
        }

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
            encrypted: this.state.encrypted,
            termsAccepted: this.state.termsAccepted,
        };
        window.localStorage.setItem('config', JSON.stringify(state, null, 4));

    }

    private resetAppState(state={}) {
        this.setState({...App.defaultState, ...state}, this.saveConfig);
    }

    /* Handle navigation */

    onExternalInsert() {
        this.setState({
            externalReceive: null,
            bufferedReceive: this.state.externalReceive,
            view: 'Transfers',
        });
        window.history.pushState({}, '', window.location.origin + window.location.pathname);
    }

    onAcceptTerms() {
        const state = {
            termsAccepted: true
        };
        let wallet = this.state.wallet;
        if (!wallet) {
            wallet = new CasaWallet();
            wallet.setLegalAgreementsToTrue();
            wallet.save();
            state.wallet = wallet;
        }
        this.setState(state, this.saveConfig);
    }

    onChangeView(view) {
        if (this.state.inProgress) {
            alert("Please wait for the process to complete");
        } else {
            this.setState({view: view});
        }
    }

    onNavButtonClick() {
        if (this.state.encrypted) {
            this.resetAppState({wallet: null});
        } else {
            this.onChangeView('Password');
        }
    }

    /* Handle Settings (wallet operations) */

    private confirmOverwriteWallet(): bool {
        const balance = formatBalance(this.state.wallet.getBalance());
        const master = shorten(this.state.wallet.master_secret);
        return confirm(`This will DELETE your wallet '${master}'` +
            `\nBalance: ₩ ${balance}` +
            "\n\nDo you want to continue?");
    }

    onCreateWallet(event) {
        if (!this.confirmOverwriteWallet()) {
            return;
        }
        const wallet = new CasaWallet({}, this.state.wallet.getPassword());
        wallet.setLegalAgreementsToTrue(); // already agreed on 1st page load
        wallet.save();
        this.resetAppState({wallet: wallet});
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
            const wallet = new CasaWallet(walletData, dis.state.wallet.getPassword());
            wallet.setLegalAgreementsToTrue(); // user could have uploaded a wallet without accepted terms
            wallet.save();
            dis.resetAppState({
                wallet: wallet,
                view: 'Recover',
                bufferedRecover: true,
            });
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
        event.target.value = '';
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
    }

    async onCheckWallet() {
        this.setState({lastCheck: [], inProgress: true});

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
            await this.state.wallet.check();
            await Promise.resolve(); // needed?
            this.state.wallet.save();
            this.resetAppState({wallet: this.state.wallet});
            console.log("(webcasa) Done! New balance:", formatBalance(this.state.wallet.getBalance()));
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message}`}</div>;
            this.setState({ lastCheck: <ActionResult success={false} contents={errMsg} /> });
        } finally {
            window.console.log = realLog;
            this.setState({inProgress: false});
        }
    }

    async onRecoverWallet(masterSecret, gapLimit, sweep_payments) {
        const sameSecret = masterSecret === this.state.wallet.master_secret;
        if (!sameSecret && !this.confirmOverwriteWallet()) {
            return;
        }

        this.setState({lastRecover: [], inProgress: true});

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
            console.log("(webcasa) Recovering wallet")

            const password = this.state.wallet.getPassword();
            const walletData = { master_secret: masterSecret };
            if (sameSecret) { // preserve history
                walletData.log = this.state.wallet.getContents().log;
            }
            const wallet = new CasaWallet(walletData, password);
            wallet.setLegalAgreementsToTrue();
            await wallet.recover(gapLimit, sweep_payments);
            await Promise.resolve();
            wallet.save();
            this.resetAppState({wallet: wallet});
            console.log("(webcasa) Done! New balance:", formatBalance(wallet.getBalance()));
        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (masterSecret=${masterSecret}, gapLimit=${gapLimit}, sweep_payments=${sweep_payments})`}</div>;
            this.setState({ lastRecover: <ActionResult success={false} contents={errMsg} /> });
        } finally {
            window.console.log = realLog;
            this.setState({
                inProgress: false,
                bufferedRecover: null,
            });
        }
    }

    onSetPassword(password: string|null) {
        const pw = makePassword(password);
        this.state.wallet.setPassword(pw);
        this.state.wallet.save();
        this.setState({encrypted: !!pw}, this.saveConfig);
    }

    onUnlockWallet(password): string {
        let err = '';
        const pw = makePassword(password);
        const wallet = CasaWallet.load(pw);
        if (!wallet) {
            err = "Incorrect password";
        } else {
            this.setState({wallet: wallet});
        }
        return err;
    }

    resetLastSend() {
        this.setState({lastSend: null});
    }

    resetLastReceive() {
        this.setState({lastReceive: null});
    }

    /* Handle Transfers (webcash operations) */

    async onReceiveWebcash(webcash, memo) {
        try {
            const new_webcash = await this.state.wallet.insert(webcash, memo);
            this.state.wallet.save();
            this.setState({
                wallet: this.state.wallet, // force repaint
                lastReceive: <ActionResult success={true} contents={new_webcash} title="Success! The new secret was saved" />,
            }, this.saveConfig);
        } catch (e) {
            // Save the wallet just in case. If there was a network failure or something, there
            // might be new information in the wallet that could help a recovery in the future.
            this.state.wallet.save();
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (webcash=${webcash}, memo=${memo})`}</div>;
            this.setState({ lastReceive: <ActionResult success={false} contents={errMsg} title='' /> });
        } finally {
            if (this.state.bufferedReceive) {
                this.setState({ bufferedReceive: null });
            }
        }
    }

    async onSendAmount(amount, memo) {
        try {
            const webcash = await this.state.wallet.pay(amount, memo);
            this.state.wallet.save();
            this.setState({
                wallet: this.state.wallet, // force repaint
                lastSend: {webcash: webcash, memo: memo, error: null},
            }, this.saveConfig);
        } catch (e) {
            // Save the wallet just in case. If there was a network failure or something, there
            // might be new information in the wallet that could help a recovery in the future.
            this.state.wallet.save();
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (amount=${amount}, memo=${memo})`}</div>;
            this.setState({ lastSend: {webcash: null, memo: null, error: errMsg} });
        }
    }

    /* Render */

    render() {
        let view = '';
        let blur = '';

        // Preempt with modal if there's an external action ('?receive=...')
        if (this.state.externalReceive) {
            blur = 'blur';
            view = <ViewExternalReceive
                webcash={this.state.externalReceive.webcash}
                memo={this.state.externalReceive.memo}
                onExternalInsert={this.onExternalInsert}
            />;
        } else
        // Show password modal if wallet is encrypted
        if (this.state.encrypted && !this.state.wallet) {
            blur = 'blur';
            view = <ViewUnlock onUnlockWallet={this.onUnlockWallet} />;
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
                bufferedReceive={this.state.bufferedReceive}
                resetLastSend={this.resetLastSend} resetLastReceive={this.resetLastReceive}
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
            view = <ViewRecover
                        wallet={this.state.wallet}
                        onChangeView={this.onChangeView}
                        onRecoverWallet={this.onRecoverWallet}
                        lastRecover={this.state.lastRecover}
                        bufferedRecover={this.state.bufferedRecover}
                    />;
        } else
        if ('Check' === this.state.view) {
            view = <ViewCheck wallet={this.state.wallet} onChangeView={this.onChangeView}
                        onCheckWallet={this.onCheckWallet} lastCheck={this.state.lastCheck}/>;
        } else
        if ('Password' === this.state.view) {
            view = <ViewPassword
                        hasPassword={!!this.state.wallet.password}
                        onSetPassword={this.onSetPassword}
                        onChangeView={this.onChangeView}
                    />;
        } else
        if ('About' === this.state.view) {
            view = <ViewAbout />;
        }

        return (
            <div id="layout" className={`content pure-g ${blur}`}>
                <Navigation
                    wallet={this.state.wallet}
                    onNavButtonClick={this.onNavButtonClick}
                    onChangeView={this.onChangeView}
                    encrypted={this.state.encrypted}
                />

                {view}

                <div id="tooltip">Copied!</div>
                <div id="this-is-mobile"></div>
            </div>
        );
    }

}
