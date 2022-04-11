rm -Rf dist/
rm -Rf .parcel-cache/

npm exec parcel build src/index.html --no-source-maps
firebase serve # test it locally
# firebase deploy
