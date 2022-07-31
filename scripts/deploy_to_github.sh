#!/usr/bin/env bash
#
# Deploy WebCasa to a GitHub repo, to host the app on GitHub Pages
#
# Usage:
# npm run build-github
# ./scripts/deploy_to_github.sh

REPO=git@github.com:juzybits/webcasa-dist.git
DIST=dist/github

if [[ ! -d $DIST ]]; then
	echo "($0) ERROR | '$DIST' is not a directory"
	exit 1
fi

cd $DIST

git init .
git remote add origin $REPO
git add .
git commit -am"init"
git push -f -u origin master
