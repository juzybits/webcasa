import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";

export function Header(props) {
    return (
        <header id="Header" className="card">
            <h1>{props.title}</h1>
        </header>
    );
}
