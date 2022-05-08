import React from "react";

import { formatBalance, formatDate, json } from "./_util";
import { FormReceive, HistoryReceive } from "./FormReceive";
import { FormSend, HistorySend } from "./FormSend";

export class ViewTransfers extends React.Component {

    constructor(props) {
        super(props)
        this.setTab = this.setTab.bind(this);
        this.state = { tab: 'Receive' };
    }

    setTab(tab) {
        this.setState({tab: tab});
    }

    componentDidMount() {
        const params = this.props.bufferedReceive;
        if (params) {
            this.props.onReceiveWebcash(params.webcash, params.memo);
        }
    }

    render() {
        const form = this.state.tab === 'Receive'
            ? <FormReceive
                    onReceiveWebcash={this.props.onReceiveWebcash}
                    lastReceive={this.props.lastReceive} />
            : <FormSend
                    wallet={this.props.wallet}
                    onSendAmount={this.props.onSendAmount}
                    lastSend={this.props.lastSend} />;

        const history = this.state.tab === 'Receive'
            ? <HistoryReceive log={this.props.wallet.log} />
            : <HistorySend log={this.props.wallet.log} />;

        const selectedReceive = this.state.tab === 'Receive' ? 'selected' : '';
        const selectedSend = this.state.tab === 'Send' ? 'selected' : '';
        const balance = formatBalance(this.props.wallet.getBalance());

        return (
        <div className="view-wrapper">
            <header className="header">
                <h1>Transfers</h1>
            </header>

            <div id="ViewTransfers" className="card">
                <div className="tabs">
                    <div className={`tab left ${selectedReceive}`} onClick={()=>this.setTab('Receive')}>
                        <i className='wide-icon icon-cloud-arrow-down-solid'></i>Receive
                    </div>
                    <div className={`tab right ${selectedSend}`} onClick={()=>this.setTab('Send')}>
                        <i className='wide-icon icon-cloud-arrow-up-solid'></i>Send
                    </div>
                </div>

                <div className="balance-indicator">
                    <label className="balance-amount"><i className="nav-icon icon-webcash"></i> {balance}</label>
                </div>

                <div className="tab-content">
                    {form}
                </div>
            </div>

            {history}
        </div>
        );
    }
}
