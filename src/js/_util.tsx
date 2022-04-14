/** Helper functions (non-React) **/

import QRCode from 'qrcode';

// TODO: turn into a React component
export function tooltip(text: string): void {
    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    setTimeout(() => tooltip.style.display = "none", 1500);
}

export function makeURL(params): string {
    const query = '?' + new URLSearchParams(params).toString();
    const url = new URL(window.location.origin + window.location.pathname + query);
    return url.href;
}

export function renderQR(elementId: string, contents: string): bool {
    const canvas = document.getElementById(elementId)
    if (!canvas) {
        console.error(`(renderQR) Element #${elementId} not found!`);
        return false;
    }
    QRCode.toCanvas(canvas, contents, (err) => {
        if (err) {
            console.error("(renderQR)", err);
        }
        console.debug("(renderQR) Rendered with contents:", contents);
    });
    return true;
}

export function shorten(text: string, slice: number = 4): string {
    var start = text.slice(0, slice);
    var end = text.slice(-1*slice);
    return `${start}...${end}`;
}

export function formatTimestamp(ts: string): string {
    if (!ts) {
        return '';
    }
    return ts.slice(0, -10);
}

export function json(value: any): string {
    return JSON.stringify(value, null, 4);
}

export function formatDate(date: Date): string {
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    return date.toLocaleString("en-IE", options);
}

export function isMobile() {
    return isVisible(document.getElementById('this-is-mobile'))
}

// https://github.com/jquery/jquery/blob/main/src/css/hiddenVisibleSelectors.js
function isVisible( elem ) {
    return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};

/*export function randomId(prefix: string) {
    prefix = prefix ? prefix+"-" : '';
    return prefix + Math.random().toString(36).replace(/[^a-z]+/g, 'x').substring(6);
}*/
