DIST_DIR=../dist

rm -Rf $DIST_DIR
npx parcel build src/index.html --no-source-maps --public-url https://wayfzbee.github.io/dist-cowcash
mv dist $DIST_DIR
cd $DIST_DIR

git init .
git remote add origin git@github.com:wayfzbee/dist-cowcash.git
git init .
git add .
git commit -am"Initial commit"
git push -f -u origin master
