import React from "react";
import { WebcashWallet } from "webcash";

import { Navigation } from "./Navigation";
import { ViewHistory } from "./ViewHistory";
import { ViewInfo } from "./ViewInfo";
import { ViewSend } from "./ViewSend";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.state = {
            view: 'Info',
            wallet: new WebcashWallet(),
        };
    }

    render() {
        var view = '';
        if ('Info' === this.state.view) {
            view = <ViewInfo wallet={this.state.wallet}/>;
        } else
        if ('Send' === this.state.view) {
            view = <ViewSend/>;
        } else
        if ('History' === this.state.view) {
            view = <ViewHistory/>;
        }

        return (
            <div id="layout" className="content pure-g">
                <Navigation
                    handleWalletUpload={this.handleWalletUpload}
                    handleMenuClick={this.handleMenuClick}
                    wallet={this.state.wallet}
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
                page: 'Info'
            });
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
    }
}
