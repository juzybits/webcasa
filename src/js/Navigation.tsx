import React from "react";

import { ButtonDownload } from "./ButtonDownload";
import { shorten } from "./_util";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this); // mobile-only
        this.state = { visible: false }
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        const menuItems = ["Wallet", "Send", "Receive", "Secrets", "History"].map((item) =>
            <MenuItem key={item} name={item} wallet={this.props.wallet} onClick={this.props.handleMenuClick}/>
        );
        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🏠 WebCasa</label>

                <a href="#" id="menuToggle" onClick={this.toggleVisibility}>☰</a>

                <div className="nav-inner">
                    <ButtonDownload
                        saved={this.props.saved}
                        label={shorten(this.props.wallet.getContents().master_secret)}
                        wallet={this.props.wallet}
                        handleDownloadWallet={this.props.handleDownloadWallet}
                    />

                    <div className="pure-menu">
                        <ul className="pure-menu-list">
                            {menuItems}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

function MenuItem(props) {
    const handleClick = function(event) {
        event.preventDefault();
        props.onClick(props.name);
    };

    const wData = props.wallet.getContents();
    let clazz = '';
    let count = '';
    if ("Secrets" === props.name) {
        clazz = ' menu-divider';
        count = (wData.unconfirmed.length + wData.webcash.length) || '';
    } else
    if ("History" === props.name) {
        count = wData.log.length || '';
    }

    if (count !== '') {
        count = <span className="nav-count"> ({count})</span>;
    }

    return (
        <li className="pure-menu-item">
            <a href="#" className={"pure-menu-link"+clazz} onClick={handleClick}>{props.name}{count}</a>
        </li>
    );
}
