import React from "react";
import { Navigation } from "./Navigation";
import { PageConnect } from "./PageConnect";
import { PageHistory } from "./PageHistory";

export class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.state = {
            wallet: null,
        }
    }

    handleWalletUpload(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        var dis = this;

        reader.onload = function() {
            var wallet = JSON.parse(reader.result);
            dis.state.wallet = wallet;
        };
        reader.onerror = function() {
            alert(reader.error);
        };
        reader.readAsText(file);
    }

    render() {
        return (
            <div id="layout" className="content pure-g">
                <Navigation/>
                <PageConnect onFileUpload={this.handleWalletUpload}/>
                {/*<PageWallet/>*/}
                {/*<PageSend/>*/}
                <PageHistory/>
            </div>
        );
    }
}

