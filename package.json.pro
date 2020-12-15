{
  "name": "cart-system-hexipi",
  "version": "0.1.0",
  "main": "./lib/CartSystem.js",
  "types": "./lib/CartSystem.d.ts",
  "dependencies": {
    "bootstrap": "^4.5.0",
    "color-functions-hexipi": "^0.1.7",
    "jquery": "^3.5.1",
    "react-js-snackbar": "^1.0.4",
    "reactstrap": "^8.7.1",
    "uniqid": "^5.2.0"
  },
  "scripts": {
    "prebuild": "tsc",
    "build": "webpack"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "peerDependencies": {
    "color-functions-hexipi": "^0.1.7",
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  },
  "devDependencies": {
    "@types/node": "^14.14.13",
    "@types/prop-types": "^15.7.3",
    "@types/react-dom": "^17.0.0",
    "@types/reactstrap": "^8.7.2",
    "@types/uniqid": "^5.2.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^3.6.0",
    "path": "^0.12.7",
    "prop-types": "^15.7.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "source-map-loader": "^1.1.3",
    "style-loader": "^1.2.1",
    "svg-url-loader": "^6.0.0",
    "ts-loader": "^8.0.12",
    "typescript": "^4.1.3",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "files": [
    "lib/**/*"
  ],
  "description": "This is a React.JS UI cart system that can be placed on any react app!",
  "author": "Jose A. Alvarado",
  "homepage": "https://github.com/HexiPi/cart-system",
  "license": "MIT"
}
