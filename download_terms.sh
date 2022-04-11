txt=src/js/webcash_terms.txt
js=src/js/webcash_terms.jsx
echo "Downloading https://webcash.org/terms/text"
curl -s -o $txt https://webcash.org/terms/text
echo "export const WEBCASH_TERMS = \`$(cat $txt | sed 's/"/\\"/g')\`;" > $js
rm $txt
