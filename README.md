angular-webpack-seed
====================
Angular 2 seed project

STACK
---
* Angular 4+
* TypeScript 2
* Webpack 2
* Karma / NightmareJS 2 (Electron)
* Gulp 4
* ESLint with useful plugins

FEATURES
---
* Fastest typescripts compilation (because of transpileOnly)
* Faster unit testing (NightmareJS runs 2 times faster than PhantomJS)
* Hot reload, HMR (Hot Module Replacement)
* AoT (with routes lazy loading)

QUICK START
---
```
git clone https://github.com/unlight/angular-webpack-seed && cd angular-webpack-seed
npm i 
npm run start
```

TASKS
---
| Task             | Description                         |
|:-----------------|:------------------------------------|
| `npm run server`  | Local dev server                    |
| `npm run clean`  | Clean generated folders             |
| `npm run eslint` | Lint code (single run mode)         |
| `npm run t`      | Run unit testing in single run mode |

DEVELOPMENT TIPS
---
* Do not disable cache in devtools (network tab): this improves speed significantly, use Ctrl + F5 to clean cache.
* Add new external libraries (npm modules) to vendor libs list (`entry.list`) and do `npm run build:vendor-libs`

RESOURCES
---
* [Configuration utility for Angular](https://github.com/nglibs/config)
* [An Angular 2 module for mocking components](https://github.com/cnunciato/ng2-mock-component)
* [Simple, fluent Http mocking for Angular 2](https://github.com/CodeSequence/respond-ng)
* [Simple testing patterns for Angular version 2+](https://github.com/juristr/angular-testing-recipes)

TODO
---
* angular2 mocks lib
* more postcss plugin
* test isolated modules
* lazy load route (dev mode)
* automatic rebuild vendors when lib updated (gulp prerequisites)

DEBUG
---
```
inspect node_modules/webpack-dev-server/bin/webpack-dev-server
inspect --debug-exception node_modules/webpack/bin/webpack.js --env.prod --display-modules
inspect --debug-exception node_modules/webpack/bin/webpack.js
```
