        import React from "react";

import { shorten, isMobile } from "./_util";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this); // mobile-only
        this.state = { visible: false }
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    makeButton() {
        const clazz = !this.props.downloaded ? 'unsaved' : '';
        const label = !this.props.downloaded ? 'Save changes' : shorten(this.props.wallet.getContents().master_secret);
        return <button className={`pure-button ${clazz}`} onClick={this.props.handleDownloadWallet}>{label}</button>
    }

    render() {
        const menuItems = ["Transfers", "Settings", "Secrets", "History"].map((item) =>
            <MenuItem key={item} name={item} wallet={this.props.wallet}
                      onClick={this.props.handleChangeView} toggleMenu={this.toggleVisibility}/>
        );

        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🏠 WebCasa</label>

                <a href="#" id="menuToggle" onClick={this.toggleVisibility}>☰</a>

                <div className="nav-inner">

                    <div id="nav-button">
                        {this.makeButton()}
                    </div>

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
        if (isMobile()) { // auto-close mobile menu
            props.toggleMenu();
        }
    };

    const wData = props.wallet.getContents();
    let clazz = '';
    let count = '';
    let icon = '';
    if ("Transfers" === props.name) {
        icon = 'icon-right-left';
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
            <a href="#" className="pure-menu-link" onClick={handleClick}>
                <i className={`nav-icon ${icon}`}></i>{props.name}{count}
            </a>
        </li>
    );
}
