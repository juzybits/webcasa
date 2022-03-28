import React from "react";

import { formatTimestamp } from "./_util";

// TODO: paginate
// TODO: search
// TODO: sorting
export class ViewLog extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            activeItem: this.props.logs ? this.props.logs[0] : null,
            item2: null
        };
    }

    handleItemClick(item, item2) {
        if (this.state.item2) {
            this.state.item2.setActive(false);
        }
        this.setState({activeItem: item, item2: item2})
    }

    render() {
        var key = 0;
        const items = this.props.logs.map((item) =>
            <Item key={key++} item={item} onClick={this.handleItemClick} />
        );
        return (
            <div id="ViewLog">
                <div id="list" className="pure-u-1">
                    {items}
                </div>

                <div id="main" className="pure-u-1">
                    <ContentPanel item={this.state.activeItem} />
                </div>
            </div>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            active: false
        };
    }
    setActive(val: bool) {
        this.setState({active: val})
    }
    handleClick() {
        this.setActive(true);
        this.props.onClick(this.props.item, this)
    }
    render() {
        const item = this.props.item;
        const clazz = this.state.active ? ' email-item-unread' : '';
        return (
            <div className={"email-item pure-g"+clazz}>
                <div className="pure-u-3-4" onClick={this.handleClick}>
                    <h5 className="email-name">{formatTimestamp(item.timestamp)}</h5>
                    <h4 className="email-subject">{item.type} {item.amount}</h4>
                    <p className="email-desc">
                        <ItemDescription item={item} />
                    </p>
                </div>
            </div>
        );
    }
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
    const item = props.item;
    if (!item) {
        return '';
    }

    return (
        <div className="email-content">
            <div className="email-content-header pure-g">
                <div className="pure-u-1">
                    <h1 className="email-content-title">{item.type} {item.amount}</h1>
                    <p className="email-content-subtitle">
                        <span>{formatTimestamp(item.timestamp)}</span>
                    </p>
                </div>
            </div>

            <div className="email-content-body">
                <textarea value={JSON.stringify(item, null, 4)} readOnly />
            </div>
        </div>
    );
}
