angular-webpack-seed
====================
Angular 2 seed project

STACK
---
* Webpack 2
* TypeScript 2
* Angular 4+
* Karma / Nightmare 2 (Electron based)
* Gulp 4
* ESLint with some plugins

FEATURES
---
* Fastest typescripts compilation (because of --isolatedModules)
* Faster unit testing (NightmareJS runs 2 times than PhantomJS)
* Hot reload, HMR (Hot Module Replacement)

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

RESOURCES
---
* [Configuration utility for Angular](https://github.com/nglibs/config)
* [An Angular 2 module for mocking components](https://github.com/cnunciato/ng2-mock-component)
* [Simple, fluent Http mocking for Angular 2](https://github.com/CodeSequence/respond-ng)
* [Simple testing patterns for Angular version 2+](https://github.com/juristr/angular-testing-recipes)

TODO
---
* angular2 mocks lib
* aot
* more postcss plugin
* separate css file (text extract plugin)
* test isolated modules

DEBUG
---
```
inspect node_modules/webpack-dev-server/bin/webpack-dev-server
```
