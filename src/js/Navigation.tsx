        import React from "react";

import { shorten, isMobile } from "./_util";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.onClickToggleBtn = this.onClickToggleBtn.bind(this); // mobile-only
        this.toggleVisibility = this.toggleVisibility.bind(this); // mobile-only
        this.state = { visible: false }
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    onClickToggleBtn(event) {
        event.preventDefault();
        this.toggleVisibility();
    }

    render() {
        if (!this.props.wallet) {
            return '';
        }
        const menuItems = ["Transfers", "Settings", "Secrets", "History"].map((item) =>
            <MenuItem key={item} name={item} wallet={this.props.wallet}
                      onClick={this.props.onChangeView} toggleMenu={this.toggleVisibility}/>
        );

        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🏠 WebCasa<sup>(beta)</sup></label>

                <a href="#" id="menuToggle" onClick={this.onClickToggleBtn}>☰</a>

                <div className="nav-inner">

                    <div id="nav-button">
                        <button className="pure-button" onClick={this.props.onDownloadWallet}>
                            {shorten(this.props.wallet.getContents().master_secret)}
                        </button>
                    </div>

                    <div className="pure-menu">
                        <ul className="pure-menu-list">
                            {menuItems}
                        </ul>
                        <ul id="social">
                            <a className="social-icon" href="https://twitter.com/WebCasaApp" target="_blank">
                                <i className={`nav-icon icon-twitter`}></i>
                            </a>

                            <a className="social-icon" href="https://discord.com/invite/qf95KMqkPW" target="_blank">
                                <i className={`nav-icon icon-discord`}></i>
                            </a>

                            <a className="social-icon" href="https://webcash.org" target="_blank">
                                <i className={`nav-icon icon-webcash`}></i>
                            </a>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

function MenuItem(props) {
    const onClick = function(event) {
        event.preventDefault();
        props.onClick(props.name);
        if (isMobile()) { // auto-close mobile menu
            props.toggleMenu();
        }
    };

    const wData = props.wallet.getContents();
    let clazz = '';
    let count = '';
    let icon = '';
    if ("Transfers" === props.name) {
        icon = 'icon-send';
    } else
    if ("Settings" === props.name) {
        icon = 'icon-gear';
    } else
    if ("Secrets" === props.name) {
        icon = 'icon-key';
        count = (wData.unconfirmed.length + wData.webcash.length) || '';
    } else
    if ("History" === props.name) {
        icon = 'icon-file-lines';
        count = wData.log.length || '';
    }

    if (count !== '') {
        count = <span className="nav-count"> ({count})</span>;
    }

    return (
        <li className="pure-menu-item">
            <a href="#" className="pure-menu-link" onClick={onClick}>
                <i className={`nav-icon ${icon}`}></i>{props.name}{count}
            </a>
        </li>
    );
}
