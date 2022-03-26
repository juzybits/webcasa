function WidgetConnect() {
  return <input type="file" id="wallet_file" name="wallet_file" onChange={readFile}/>;
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
