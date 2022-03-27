import React from "react";
import { WebcashWallet } from "webcash";
import { Navigation } from "./Navigation";
import { PageConnect } from "./PageConnect";
import { PageOverview } from "./PageOverview";
import { PageSend } from "./PageSend";
import { PageHistory } from "./PageHistory";

export class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.state = {
            wallet: null,
            activePage: 'connect',
        };
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
                activePage: 'overview'
            });
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
    }

    render() {
        var active = this.state.activePage;
        var page = '';

        if (active === 'connect') {
            page = <PageConnect onFileUpload={this.handleWalletUpload}/>;
        } else if (active === 'overview') {
            page = <PageOverview/>;
        } else if (active === 'send') {
            page = <PageSend/>;
        } else if (active === 'history') {
            page = <PageHistory/>;
        }

        return (
            <div id="layout" className="content pure-g">
                <Navigation/>
                {page}
            </div>
        );
    }
}

