target_dir=dist/github
if [[ ! -d $target_dir ]]; then
	echo "($0) ERROR | '$target_dir' is not a directory"
	exit 1
fi

cd $target_dir

git init .
git remote add origin git@github.com:wayfzbee/webcasa-dist.git
git add .
git commit -am"init"
git push -f -u origin master
