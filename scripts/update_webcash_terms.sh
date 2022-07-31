#!/usr/bin/env bash
#
# Download terms from webcash.org and update the relevant file in the repo

URL=https://webcash.org/terms/text
TXT=src/js/webcash_terms.txt
JS=src/js/webcash_terms.jsx

echo "Downloading $URL"
curl -s -o $TXT $URL
echo "export const WEBCASH_TERMS = \`$(cat $TXT | sed 's/"/\\"/g')\`;" > $JS
rm $TXT
