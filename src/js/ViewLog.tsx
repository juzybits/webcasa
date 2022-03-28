import React from "react";

import { formatTimestamp } from "./_util";

// TODO: paginate
// TODO: search
// TODO: sorting
export class ViewLog extends React.Component {
    constructor(props) {
        super(props);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.state = {
            listItem: null,
            logEntry: null,
        };
    }

    handleListItemClick(item) {
        this.state.listItem && this.state.listItem.setActive(false);
        item.setActive(true);
        this.setState({listItem: item, logEntry: item.getLogEntry()});
    }

    render() {
        var key = 0;
        const listItems = this.props.logs.map((log) =>
            <Item key={key++} log={log} onClick={this.handleListItemClick} />
        );
        return (
            <div id="ViewLog">
                <div id="list" className="pure-u-1">
                    {listItems}
                </div>

                <div id="main" className="pure-u-1">
                    <ContentPanel count={this.props.logs.length} log={this.state.logEntry} />
                </div>
            </div>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false };
    }
    setActive(active: bool) {
        this.setState({active: active})
    }
    getLogEntry() {
        return this.props.log;
    }
    render() {
        const log = this.props.log;
        const clazz = this.state.active ? ' email-item-unread' : '';
        return (
            <div className={"email-item pure-g"+clazz} onClick={() => this.props.onClick(this)}>
                <div className="pure-u-3-4">
                    <h5 className="email-name">{formatTimestamp(log.timestamp)}</h5>
                    <h4 className="email-subject">{log.type} {log.amount}</h4>
                    <p className="email-desc">
                        <ItemDescription log={log} />
                    </p>
                </div>
            </div>
        );
    }
}

function ItemDescription(props) {
    const log = props.log;
    const memo = !log.memo ? '' : <React.Fragment> <br/>memo: <i>"{log.memo}"</i> </React.Fragment>;
    const inputs = log.input_webcash ?? log.input_webcashes ?? [];
    const outputs = log.output_webcash ?? [];
    const inCount = (typeof inputs === 'string') ? 1 : inputs.length;
    const outCount = (typeof outputs === 'string') ? 1 : outputs.length;
    return (
        <React.Fragment>
            in={inCount}, out={outCount}
            {memo}
        </React.Fragment>
    );
}

function ContentPanel(props) {
    const log = props.log;
    if (!log) {
        return <div>There are <b>{props.count}</b> logs in your wallet.</div>
    }

    return (
        <div className="email-content">
            <div className="email-content-header pure-g">
                <div className="pure-u-1">
                    <h1 className="email-content-title">{log.type} {log.amount}</h1>
                    <p className="email-content-subtitle">
                        <span>{formatTimestamp(log.timestamp)}</span>
                    </p>
                </div>
            </div>

            <div className="email-content-body">
                <textarea value={JSON.stringify(log, null, 4)} readOnly />
            </div>
        </div>
    );
}
