// Given a WebcashWallet, format and return its master secret
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

export function tooltip(text: string): void {
    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    setTimeout(() => tooltip.style.display = "none", 1500);
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

/*export function randomId(prefix: string) {
    prefix = prefix ? prefix+"-" : '';
    return prefix + Math.random().toString(36).replace(/[^a-z]+/g, 'x').substring(6);
}*/
