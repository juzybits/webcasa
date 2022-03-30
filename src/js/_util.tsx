// Given a WebcashWallet, format and return its master secret
export function formatMasterSecret(wallet: WebcashWallet): string {
	var secret = wallet.getContents().master_secret;
    var start = secret.slice(0, 4);
    var end = secret.slice(-4);
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

/*export function randomId(prefix: string) {
    prefix = prefix ? prefix+"-" : '';
    return prefix + Math.random().toString(36).replace(/[^a-z]+/g, 'x').substring(6);
}*/
