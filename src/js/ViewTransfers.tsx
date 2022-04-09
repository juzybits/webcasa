import React from "react";

import { formatDate, json } from "./_util";
import { FormReceive } from "./FormReceive";
import { FormSend } from "./FormSend";

export class ViewTransfers extends React.Component {

    constructor(props) {
        super(props)
        this.onClickTab = this.onClickTab.bind(this);
        this.state = { action: 'Receive' };
    }

    onClickTab(event) {
        this.setState({action: event.target.innerHTML});
    }

    render() {
        const tabContent = this.state.action === 'Receive'
            ? <FormReceive
                    wallet={this.props.wallet}
                    onReceiveWebcash={this.props.onReceiveWebcash}
                    lastReceive={this.props.lastReceive} />
            : <FormSend
                    wallet={this.props.wallet}
                    onSendAmount={this.props.onSendAmount}
                    lastSend={this.props.lastSend} />;
        const selectedReceive = this.state.action === 'Receive' ? 'selected' : '';
        const selectedSend = this.state.action === 'Send' ? 'selected' : '';
        const balance = this.props.wallet.getBalance().toString();

        return (
            <div id="ViewTransfers" className="pure-u card">

                <div className="tabs">
                    <div className={`tab left ${selectedReceive}`} onClick={this.onClickTab}>Receive</div>
                    <div className={`tab right ${selectedSend}`} onClick={this.onClickTab}>Send</div>
                </div>

                <div id="BalanceIndicator">
                    <label id="balance">₩ {balance}</label>
                </div>

                <div className="tab-content">{tabContent}</div>

            </div>
        );
    }
}
