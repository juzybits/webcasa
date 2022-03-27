import React from "react";

import { ButtonConnect } from "./ButtonConnect";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.handleWalletUpload = this.handleWalletUpload.bind(this);
        this.state = { visible: false }
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    handleWalletUpload(event) {
        this.props.handleWalletUpload(event);
    }

    render() {
        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🐮 CowCash</label>

                <a href="#" id="menuToggle" onClick={this.toggleVisibility}>☰</a>

                <div className="nav-inner">
                    <ButtonConnect onFileUpload={this.handleWalletUpload}/>

                    <div className="pure-menu">
                        <ul className="pure-menu-list">
                            <MenuItem name="Wallet"/>
                            <MenuItem name="Send"/>
                            <MenuItem name="History"/>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

class MenuItem extends React.Component {
    render() {
        const name = this.props.name;
        return (
            <li className="pure-menu-item"><a href="#" className="pure-menu-link">{name}</a></li>
        );
    }
}
