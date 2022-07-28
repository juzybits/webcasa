#!/usr/bin/env bash
#
# Deploy WebCasa to a GitHub repo, to host the app on GitHub Pages
# (in this case, https://juzybits.github.io/webcasa-dist/)
#
# You must first build the project: `npm run build-github`

target_dir=dist/github
if [[ ! -d $target_dir ]]; then
	echo "($0) ERROR | '$target_dir' is not a directory"
	exit 1
fi

cd $target_dir

git init .
git remote add origin git@github.com:juzybits/webcasa-dist.git
git add .
git commit -am"init"
git push -f -u origin master
