# WebCasa

WebCasa is a non-custodial browser wallet for [Webcash](https://webcash.org/)™. It lets you send and receive webcash tokens.

The wallet is a single-page serverless app. It uses React to build a user interface around the [webcashjs](https://github.com/kanzure/webcashjs) library.

Live site: [webcasa.app](https://webcasa.app/)

## How to run locally
```
pnpm install
pnpm run serve
```

## How to deploy (Firebase)
```
pnpm run build-firebase
pnpm run preview-prod
pnpm run deploy-prod
```

## How to add new icons
- Upload `src/css/icons/config.json` to https://fontello.com/
- Make changes and download the new .zip config file
- Replace the contents of src/css/icons/ (optionally with `scripts/replace_icons.sh`)
