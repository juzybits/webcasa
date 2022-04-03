import React from "react";

import { ActionResult } from "./Common";
import { BalanceIndicator } from "./BalanceIndicator";
import { formatDate, json } from "./_util";
import { List, makeItemRow } from "./List";
import { ViewReceive } from "./ViewReceive";
import { ViewSend } from "./ViewSend";

export class ViewTransfer extends React.Component {
    private label = "Success! The new secret was saved";

    constructor(props) {
        super(props)
        this.handleClickTab = this.handleClickTab.bind(this);
        this.state = { action: 'Receive' };
    }

    handleClickTab(event) {
        this.setState({action: event.target.innerHTML});
    }

    render() {
        const tabContent = this.state.action === 'Receive'
            ? <ViewReceive wallet={this.props.wallet} handleModifyWallet={this.props.handleModifyWallet} />
            : <ViewSend    wallet={this.props.wallet} handleModifyWallet={this.props.handleModifyWallet} />;
        const selectedReceive = this.state.action === 'Receive' ? 'selected' : '';
        const selectedSend = this.state.action === 'Send' ? 'selected' : '';

        const history = []; // TODO
        return (
            <div id="ViewTransfer" className="pure-u card">

                <BalanceIndicator wallet={this.props.wallet} />

                <h1>Transfer</h1>

                <div className="tabbed">

                    <div className="tabs">
                        <div className={`tab left ${selectedReceive}`} onClick={this.handleClickTab}>Receive</div>
                        <div className={`tab right ${selectedSend}`} onClick={this.handleClickTab}>Send</div>
                    </div>

                    <div className="clear"></div>

                    <div className="tab-content">{tabContent}</div>

                </div>

            </div>
        );
    }
}
