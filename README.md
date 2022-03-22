# Code Coverage

installing Code Coverage with Angular+2


## Instrument Application Code -

- Install ngx-build-plus to extends the Angular CLI's build process and instrument the code
  `npm i -D ngx-build-plus`

- Add webpack coverage config file coverage.webpack.js to cypress folder

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        include: require('path').join(__dirname, '..', 'src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/
        ]
      }
    ]
  }
};
```

- Update serve object inside angular.json to use ngx-build with extra config

`"builder": "ngx-build-plus:dev-server",`

and

`"extraWebpackConfig": "./cypress/coverage.webpack.js"` for all environments in there.

- Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting

`npm i -D istanbul-instrumenter-loader --legacy-peer-deps`

###### --legacy-peer-deps: ignore all peerDependencies when installing, In the new version of npm (v7), by default, npm install will fail when it encounters conflicting peerDependencies.

When the app starts with `ng serve` or `ng serve --open`, you should see the coverage information under window.**coverage** information.

- Exclude files
  If you want to exclude files from coverage, for example src/main.ts, add an object named nyc to package.json following the nyc CLI configuration.

```
"nyc": {
    "exclude": [
      "src/main.ts"
    ]
  }
```

then use the following command in the terminal of your project: -

`npx nyc report --reporter=lcov`

## Save the code coverage collected during Cypress tests - [code-coverage](https://www.npmjs.com/package/@cypress/code-coverage)

`npm install -D @cypress/code-coverage`

Add to your cypress/support/index.js file
`import '@cypress/code-coverage/support'`

Register tasks in your cypress/plugins/index.js file

```
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  return config
}
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running E2E tests in headed mode

Run `ng e2e`

## Running E2E tests in headless mode

Run `npm run cypress:run`
