import React from "react";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.state = { visible: false }
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        return (
            <div id="nav" className={"pure-u " + (this.state.visible ? "active" : '')}>

                <label id="logo">🐮 CowCash</label>

                <a href="#" id="menuToggle" onClick={this.toggleVisibility}>☰</a>

                <div className="nav-inner">
                    {/*<button className="primary-button pure-button">Connect</button>*/}
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
