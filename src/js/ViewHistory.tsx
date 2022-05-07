import React from "react";

import { List, Row, NothingYet } from "./Common";
import { json } from "./_util";

export class ViewHistory extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <div className="view-wrapper">

            <header className="header">
                <h1>History</h1>
            </header>

            <div id="ViewHistory" className="card">
                <NothingYet cond={this.props.logs.length===0} msg="Nothing here yet." />
                <History logs={this.props.logs} />
            </div>

        </div>
        );
    }
}

function History(props) {
    if (props.logs.length === 0) {
        return '';
    }
    let key = 0;
    const logs = props.logs.slice(-100).reverse().map((x) => {
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
    return <React.Fragment>
        <label style={{fontSize: '0.9em'}}>* only the last 100 log entries are shown</label>
        <List items={logs} />
    </React.Fragment>;
}
