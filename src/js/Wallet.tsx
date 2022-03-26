import React from "react";
import { Navigation } from "./Navigation";
import { ConnectButton } from "./ConnectButton";
import { History } from "./History";

export class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            version: '',
            legalese: {},
            log: [],
            webcash: [],
            unconfirmed: [],
            master_secret: '',
            wallet_depths: {},
        }
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
    }

    handleWalletUpload(event) {
        // TODO
        this.setState({
        });
    }

    render() {
        return (
            <div id="layout" className="content pure-g">
                <Navigation/>
                <ConnectButton/>
                <History/>
            </div>
        );
    }
}

