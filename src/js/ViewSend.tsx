import React from "react";

import { formatMasterSecret } from "./_util";

export class ViewSend extends React.Component {
    render() {
        const balance = this.props.wallet.getBalance().toString();
        const data = this.props.wallet.getContents();
        return (
            <div id="ViewSend" className="pure-u card">
                <h1>Send</h1>

            </div>
        );
    }
}
