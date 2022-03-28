import React from "react";

import { formatTimestamp } from "./_util";

export class ViewLog extends React.Component {

    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            activeItem: null
        };
    }

    handleItemClick(item) {
        this.setState({activeItem: item})
    }

    componentDidMount() {
        this.handleItemClick(this.props.logs[0]);
    }

    render() {
        return (
            <div id="ViewLog">
                <div id="list" className="pure-u-1">
                    <ItemList logs={this.props.logs} onClick={this.handleItemClick} />
                </div>

                <div id="main" className="pure-u-1">
                    <ContentPanel item={this.state.activeItem} />
                </div>

            </div>
        );
    }
}

// TODO: paginate
// TODO: search
// TODO: sorting
function ItemList(props) {
    var key = 0;
    return props.logs.map((item) => (
        <div key={key++} className="email-item pure-g">
            <div className="pure-u-3-4" onClick={() => props.onClick(item)}>
                <h5 className="email-name">{formatTimestamp(item.timestamp)}</h5>
                <h4 className="email-subject">{item.type} {item.amount}</h4>
                <p className="email-desc">
                    <ItemDescription item={item} />
                </p>
            </div>
        </div>
    ));
}

function ItemDescription(props) {
    const log = props.item;
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
    const body = JSON.stringify(props.item);
    return (
        <div className="email-content">
            <div className="email-content-header pure-g">
                <div className="pure-u-1-2">
                    <h1 className="email-content-title">Memo for third transfer</h1>
                    <p className="email-content-subtitle">
                        From <a>John Doe</a> at <span>Fri Mar 25 11:49:03</span>
                    </p>
                </div>

                <div className="email-content-controls pure-u-1-2">
                    <button className="secondary-button pure-button">Inspect</button>
                    <button className="secondary-button pure-button">Delete</button>
                </div>
            </div>

            <div className="email-content-body">
                {body}
            </div>
        </div>
    );
}
