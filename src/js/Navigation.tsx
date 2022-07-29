import React from "react";

import { shorten, isMobile } from "./_util";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.onClickToggleBtn = this.onClickToggleBtn.bind(this); // mobile-only
        this.onClickNavButton = this.onClickNavButton.bind(this); // mobile-only
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

    onClickNavButton(event) {
        event.preventDefault();
        this.props.onNavButtonClick();
        if (isMobile()) { // auto-close mobile menu
            this.toggleVisibility();
        }
    }

    render() {
        if (!this.props.wallet) {
            return '';
        }
        const menuItems = ["Transfers", "Settings", "Secrets", "History", "FAQ", "Donate"].map((item) =>
            <MenuItem key={item} name={item} wallet={this.props.wallet}
                      onClickChangeView={this.props.onChangeView} toggleMenu={this.toggleVisibility}/>
        );

        const btnIcon = this.props.encrypted ? 'icon-unlock-solid' : 'icon-lock-open-solid';
        const shortMasterSecret = shorten(this.props.wallet.getContents().master_secret);
        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🏠 WebCasa</label>
                <label id="logo-sub">for <a href="https://webcash.org" target="_blank">webcash</a></label>

                <a href="#" id="menuToggle" onClick={this.onClickToggleBtn}>☰</a>

                <div className="nav-inner">

                    <div id="nav-button">
                        <button className="pure-button" onClick={this.onClickNavButton}>
                            <i className={`button-icon ${btnIcon}`}></i>{shortMasterSecret}
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

                            <a className="social-icon" href="https://discord.com/invite/seYMuUyZus" target="_blank">
                                <i className={`nav-icon icon-discord`}></i>
                            </a>

                            <a className="social-icon" href="https://github.com/juzybits/webcasa" target="_blank">
                                <i className={`nav-icon icon-github`}></i>
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
        props.onClickChangeView(props.name);
        if (isMobile()) { // auto-close mobile menu
            props.toggleMenu();
        }
    };

    const wData = props.wallet.getContents();
    let clazz = '';
    let icon = '';
    if ("Transfers" === props.name) {
        icon = 'icon-send';
    } else
    if ("Settings" === props.name) {
        icon = 'icon-gear';
    } else
    if ("Secrets" === props.name) {
        icon = 'icon-key';
    } else
    if ("History" === props.name) {
        icon = 'icon-file-lines';
    } else
    if ("FAQ" === props.name) {
        icon = 'icon-circle-question-solid';
    } else
    if ("Donate" === props.name) {
        icon = 'icon-gift-solid';
    }

    return (
        <li className="pure-menu-item">
            <a href="#" className="pure-menu-link" onClick={onClick}>
                <i className={`nav-icon ${icon}`}></i>{props.name}
            </a>
        </li>
    );
}
