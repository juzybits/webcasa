import React from "react";
import { WebcashWallet } from "webcash";

import { Navigation } from "./Navigation";
import { ButtonConnect } from "./ButtonConnect";
import { ViewHistory } from "./ViewHistory";
import { ViewInfo } from "./ViewInfo";
import { ViewSend } from "./ViewSend";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.state = {
            view: 'info',
            wallet: new WebcashWallet(),
        };
    }

    render() {
        var view = '';
        if ('connect' === this.state.view) {
            view = <ButtonConnect onFileUpload={this.handleWalletUpload}/>;
        } else
        if ('info' === this.state.view) {
            view = <ViewInfo wallet={this.state.wallet}/>;
        } else
        if ('send' === this.state.view) {
            view = <ViewSend/>;
        } else
        if ('history' === this.state.view) {
            view = <ViewHistory/>;
        }

        return (
            <div id="layout" className="content pure-g">
                <Navigation/>
                {view}
            </div>
        );
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
                page: 'info'
            });
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
    }
}
