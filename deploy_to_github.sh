npm run build-github
cd dist/github

git init .
git remote add origin git@github.com:wayfzbee/webcasa-dist.git
git add .
git commit -am"init"
git push -f -u origin master
