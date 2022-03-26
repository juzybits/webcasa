import React from "react";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="nav" className="pure-u">

                <label id="logo">🐮 CowCash</label>

                <a href="#" id="menuLink">☰</a>

                <div className="nav-inner">
                    {/*<button className="primary-button pure-button">Connect</button> -->*/}
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

/*
function getElements() {
    return {
        menu: document.getElementById('nav'),
        menuLink: document.getElementById('menuLink')
    };
}

function toggleClass(element, className) {
    var classes = element.className.split(/\s+/);
    var length = classes.length;
    var i = 0;

    for (; i < length; i++) {
        if (classes[i] === className) {
            classes.splice(i, 1);
            break;
        }
    }
    // The className is not found
    if (length === classes.length) {
        classes.push(className);
    }

    element.className = classes.join(' ');
}

function toggleMenu() {
    var active = 'active';
    var elements = getElements();

    toggleClass(elements.menu, active);
}

function handleEvent(e) {
    var elements = getElements();

    if (e.target.id === elements.menuLink.id) {
        toggleMenu();
        e.preventDefault();
    } else if (elements.menu.className.indexOf('active') !== -1) {
        toggleMenu();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', handleEvent);
});
*/
