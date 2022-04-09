import React from "react";

import { tooltip, shorten } from "./_util";

export class List extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.items.length === 0) {
            return '';
        }
        const title = this.props.title ? <h2>{this.props.title}</h2> : '';
        return (
            <div className="list">
                {title}
                <div className="list-body">
                    {this.props.items}
                </div>
            </div>
        );
    }
}

export function makeItemRow(title: string, content: any, isWebcash=false) {
    if (!content) {
        return '';
    }
    title = !title ? '' : <label className="item-row-title">{title}:</label>;
    content = isWebcash ? webcashToCopiableValues(content) : <CopiableValue contents={content}/>;
    return (
        <div className="list-item-row">
            {title}
            {content}
        </div>
    );
}

export class CopiableValue extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        navigator.clipboard
            .writeText(this.props.contents)
            .then( () => tooltip("Copied!") )
            .catch( (err) => console.error(`ERROR when trying to copy to clipboard: ${err}`) );
    }
    render() {
        return (
            <div className="CopiableValue" onClick={this.onClick}>
                {this.props.short ?? this.props.contents}
            </div>
        );
    }
}

function webcashToCopiableValues(val) {
    let values: array;
    if (Array.isArray(val)) {
        values = val;
    } else
    if (typeof val === 'string') {
        values = [val];
    } else {
        return '';
    }

    let key = 0;
    let copiableValues = values.map((x) => {
        const parts = x.split(':');
        const short = parts[0] + ':' + parts[1] + ':' + shorten(parts[2], 3);
        return <CopiableValue key={key++} contents={x} short={short}/>;
    });

    return <div className="copiable-panel">{copiableValues}</div>
}
