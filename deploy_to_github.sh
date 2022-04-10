rm -Rf dist/
rm -Rf .parcel-cache/

npx parcel build src/index.html --no-source-maps --public-url https://wayfzbee.github.io/webcasa-dist/
cd dist/

git init .
git remote add origin git@github.com:wayfzbee/webcasa-dist.git
git add .
git commit -am"init"
git push -f -u origin master
