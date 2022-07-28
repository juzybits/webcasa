## How to run locally
```
npm install
npm run serve
```

## How to deploy to production
```
npm run build-firebase
firebase serve # preview
firebase deploy
```

## How to add new icons
- Upload `src/css/icons/config.json` to https://fontello.com/
- Make changes and download the new .zip config file
- Replace the contents of src/css/icons/ (optionally with `scripts/replace_icons.sh`)
