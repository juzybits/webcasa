import React from "react";

import { ButtonConnect } from "./ButtonConnect";
import { formatMasterSecret } from "./_util";

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
        const menuItems = ["Wallet", "Send", "Receive", "Log", "Webcashes", "Unconfirmed"].map((item) =>
            <MenuItem key={item} name={item} wallet={this.props.wallet} onClick={this.props.handleMenuClick}/>
        );
        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🏠 WebCasa</label>

                <a href="#" id="menuToggle" onClick={this.toggleVisibility}>☰</a>

                <div className="nav-inner">
                    <ButtonConnect
                        saved={this.props.saved}
                        label={formatMasterSecret(this.props.wallet)}
                        wallet={this.props.wallet}
                        handleUploadWallet={this.props.handleUploadWallet}
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

    let clazz = '';
    let count = ''; // add counts like: "Log (72)"
    if ("Log" === props.name) {
        count = props.wallet.getContents().log.length;
        clazz = ' menu-divider';
    } else
    if ("Webcashes" === props.name) {
        count = props.wallet.getContents().webcash.length;
    } else
    if ("Unconfirmed" === props.name) {
        count = props.wallet.getContents().unconfirmed.length;
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
