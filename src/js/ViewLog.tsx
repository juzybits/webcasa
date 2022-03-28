import React from "react";

import { formatTimestamp } from "./_util";

export class ViewLog extends React.Component {
    makeItemDesc(log) {
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

    // TODO: paginate
    // TODO: search
    // TODO: sorting
    makeItems() {
        var key = 0;
        const logs = this.props.wallet.getContents().log;
        return logs.map((log) => (
            <div key={key++} className="email-item pure-g">
                <div className="pure-u-3-4">
                    <h5 className="email-name">{formatTimestamp(log.timestamp)}</h5>
                    <h4 className="email-subject">{log.type} {log.amount}</h4>
                    <p className="email-desc">
                        {this.makeItemDesc(log)}
                    </p>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div id="ViewLog">
                <div id="list" className="pure-u-1">
                    {this.makeItems()}
                </div>

                <div id="main" className="pure-u-1">
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
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p>
                                Aliquam ac feugiat dolor. Proin mattis massa sit amet enim iaculis tincidunt. Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris. Curabitur ornare arcu quis mi blandit laoreet. Vivamus imperdiet fermentum mauris, ac posuere urna tempor at. Duis pellentesque justo ac sapien aliquet egestas. Morbi enim mi, porta eget ullamcorper at, pharetra id lorem.
                            </p>
                            <p>
                                Donec sagittis dolor ut quam pharetra pretium varius in nibh. Suspendisse potenti. Donec imperdiet, velit vel adipiscing bibendum, leo eros tristique augue, eu rutrum lacus sapien vel quam. Nam orci arcu, luctus quis vestibulum ut, ullamcorper ut enim. Morbi semper erat quis orci aliquet condimentum. Nam interdum mauris sed massa dignissim rhoncus.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }


}
