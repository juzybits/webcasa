import React from "react";

import { List, Row } from "./Common";
import { json } from "./_util";

// TODO: search
// TODO: sorting
// TODO: pagination
export class ViewHistory extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let key = 0;
        const logs = this.props.logs.slice(-100).reverse().map((x) => {
            return <div className="list-item" key={key++}>
                <Row title='type' contents={x.type} />
                <Row title='amount' contents={x.amount} />
                <Row title='memo' contents={x.memo} />
                <Row title='timestamp' contents={x.timestamp} />
                <Row title='webcash' contents={x.webcash} isWebcash={true} />
                <Row title='input_webcash' contents={x.input_webcash} isWebcash={true} />
                <Row title='output_webcash' contents={x.output_webcash} isWebcash={true} />
                <Row title='new_webcash' contents={x.new_webcash} isWebcash={true} />
            </div>;
        });
        const wallet = this.props.wallet;

        return (
        <div className="view-wrapper">
            <header className="header">
                <h1>History</h1>
            </header>
            <div id="ViewHistory" className="card">
                <label style={{fontSize: '0.9em'}}>* only the last 100 log entries are shown</label>
                <List items={logs} />

            </div>
        </div>
        );
    }
}
