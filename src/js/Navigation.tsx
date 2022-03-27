import React from "react";

import { getShortMasterSecret } from "./_util";
import { ButtonConnect } from "./ButtonConnect";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.state = { visible: false }
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    handleMenuClick(itemName) {
        this.props.handleMenuClick(itemName);
    }

    handleWalletUpload(event) {
        this.props.handleWalletUpload(event);
    }

    render() {
        const menuItems = ["Overview", "History"].map((item) =>
            <MenuItem key={item} name={item} onClick={this.handleMenuClick}/>
        );
        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🐮 CowCash</label>

                <a href="#" id="menuToggle" onClick={this.toggleVisibility}>☰</a>

                <div className="nav-inner">
                    <ButtonConnect
                        onFileUpload={this.handleWalletUpload}
                        buttonLabel={getShortMasterSecret(this.props.wallet)}
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

class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.onClick(this.props.name);
    }

    render() {
        return (
            <li className="pure-menu-item">
                <a href="#" className="pure-menu-link" onClick={this.onClick}>{this.props.name}</a>
            </li>
        );
    }
}
