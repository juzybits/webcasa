import React from "react";
import { WebcashWallet } from "webcash";

import { Navigation } from "./Navigation";
import { ViewHistory } from "./ViewHistory";
import { ViewOverview } from "./ViewOverview";
import { ViewLog } from "./ViewLog";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.state = {
            view: 'Overview',
            wallet: new WebcashWallet(),
        };
    }

    render() {
        var view = '';
        if ('Overview' === this.state.view) {
            view = <ViewOverview wallet={this.state.wallet}/>;
        } else
        if ('Log' === this.state.view) {
            view = <ViewLog/>;
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
                page: 'Overview'
            });
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
    }
}
