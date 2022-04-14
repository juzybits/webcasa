const fs = require('fs');
const parser = require('node-html-parser');

// Read index.html contents

let root_txt = '';
try {
    root_txt = fs.readFileSync('dist/bundle/index.html', 'utf8')
} catch (err) {
    console.error(err);
    process.exit(1);
}

// Read JS file contents

const root = parser.parse(root_txt);
const script = root.querySelector('head script');
const script_src = script.getAttribute('src');
let   script_txt = ''; // contents of the JS file we want to inline
try {
    script_txt = fs.readFileSync(`dist/bundle/${script_src}`, 'utf8')
} catch (err) {
    console.error(err);
    process.exit(1);
}

// Modify HTML

script.remove();
const body = root.querySelector('body');
body.innerHTML += `<script>${script_txt}</script>`;

// Overwrite index.html

try {
    fs.writeFileSync('dist/bundle/index.html', root.toString());
} catch (err) {
    console.error(err);
    process.exit(1);
}
