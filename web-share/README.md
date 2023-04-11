# web-share

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup & Development

In the project directory, you can run:

### `yarn install`
Setup the necessary modules and packages for running the next commands.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Electron

### Electron Dev Env
`yarn start` followed by `yarn electron`.<br />
Runs the app based on local machine's OS.

### Electron Build
`yarn add -g electron-packager`.<br />
- For windows
`electron-packager . app --platform win32 --arch x64 --out dist/`<br />
- For MacOS
`electron-packager . app --platform darwin --arch x64 --out dist/`<br />
- For Linux
`electron-packager . app --platform linux --arch x64 --out dist/`<br />