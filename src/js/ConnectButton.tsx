export function ConnectButton() {
    return (
        <div id="connect_page" className="pure-u">
            <input type="file" id="wallet_file" name="wallet_file" onChange={readFile}/>
        </div>
    );
}

function readFile(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function() {
    var wallet = JSON.parse(reader.result);
    console.log(wallet);
        // TODO: export wallet
    };

    reader.onerror = function() {
        console.log(reader.error);
    };

    reader.readAsText(file);
}
