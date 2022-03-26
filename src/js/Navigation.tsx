export function Navigation() {
    return (
        <div id="nav" className="pure-u">
            <a href="#" id="menuLink">☰</a>
            <label id="logo">🐮 CowCash</label>
            <div className="nav-inner">
                {/*<button className="primary-button pure-button">Connect</button> -->*/}
                <div className="pure-menu">
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Wallet</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Send</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">History <span className="email-count">(2)</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
