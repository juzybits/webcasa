import React from "react";

import { getShortMasterSecret } from "./_util";
import { ButtonConnect } from "./ButtonConnect";

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
        const menuItems = ["Overview", "History"].map((item) =>
            <MenuItem key={item} name={item} onClick={this.props.handleMenuClick}/>
        );
        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🐮 CowCash</label>

                <a href="#" id="menuToggle" onClick={this.toggleVisibility}>☰</a>

                <div className="nav-inner">
                    <ButtonConnect
                        onFileUpload={this.props.handleWalletUpload}
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

function MenuItem(props) {
    const handleClick = function(event) {
        event.preventDefault();
        props.onClick(props.name);
    };
    return (
        <li className="pure-menu-item">
            <a href="#" className="pure-menu-link" onClick={handleClick}>{props.name}</a>
        </li>
    );
}
