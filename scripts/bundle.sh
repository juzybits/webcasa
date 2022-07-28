#!/usr/bin/env bash
#
# Prepare a downloadable version of WebCasa so folks can self-host

if [[ $# -ne 1 ]]; then
	echo "($0) ERROR | Usage: $0 TARGET"
	exit 1
fi

target_dir="dist/$1"
if [[ ! -d $target_dir ]]; then
	echo "($0) ERROR | '$target_dir' is not a directory"
	exit 1
fi

echo -e "\n($0) Building 'bundle' target"
npm run build-bundle
echo -e "\n($0) Inlining JS into dist/bundle/index.html"
node scripts/bundle.inline.js

echo "($0) Zipping dist/bundle/ into webcasa.zip"
rm -rf webcasa
cp -r dist/bundle webcasa
zip -qr webcasa.zip webcasa
rm -rf webcasa

echo "($0) Moving webcasa.zip to $target_dir/"
mv webcasa.zip $target_dir/

rm -rf bundle dist/bundle
echo "($0) Done"
