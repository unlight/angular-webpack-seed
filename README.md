angular-webpack-seed
====================
Angular X single page application starter.

STACK
---
* Angular 4+
* TypeScript 2
* Webpack 2
* Karma / NightmareJS 2 (Electron)
* Stryker
* Gulp 4
* ESLint with useful plugins

FEATURES
---
* Fastest typescript compilation (because of transpileOnly)
* Faster unit testing (NightmareJS runs 2 times faster than PhantomJS)
* Hot reload, HMR (Hot Module Replacement)
* AoT (with routes lazy loading)
* Mutation testing
* Conditional linting for source and spec files

QUICK START
---
```
git clone https://github.com/unlight/angular-webpack-seed && cd angular-webpack-seed
npm i 
npm run start
```

HUSKY
---
* Install: `npm i husky`
* Uninstall: `npm r husky`

TASKS
---
| Task                        | Description                                                            |
|:----------------------------|:-----------------------------------------------------------------------|
| `npm run start`             | Prepare and start local dev server                                     |
| `npm run build:vendors`     | Prepare npm dependencies for linking                                   |
| `npm run server`            | Local dev server                                                       |
| `npm run server:dashboard`  | Local dev server in dashboard mode                                     |
| `npm run clean`             | Clean generated folders                                                |
| `npm run eslint`            | Lint code (single run mode)                                            |
| `npm run gulp eslint:watch` | ESLint in watch mode                                                   |
| `npm run t`                 | Run unit testing in single run mode                                    |
| `npm run test:all`          | Sequence of eslint, tschk and coverage tasks                           |
| `npm run test:w`            | Run unit testing in watch mode                                         |
| `npm run up`                | Update all dependencies one by one running tests after each            |
| `npm run tschk`             | Run typescript compile but do not emit files (useful for typechecking) |
| `npm run tschk:w`           | tschk in watch mode                                                    |
| `npm run build`             | Build application, but not dependencies                                |
| `npm run build:all`         | Sequence of build:vendors and build tasks                              |
| `npm run build:release`     | Clean rebuild all                                                      |
| `npm run coverage`          | Run test coverage with verbose reporing                                |
| `npm run coverage:debug`    | Run coverage task in debug mode                                        |
| `npm run p "t1" "t2"`       | Run tasks in parallel                                                  |
| `npm run stryker`           | Run mutation tests                                                     |

DEVELOPMENT TIPS
---
* Do not disable cache in devtools (network tab): this improves speed significantly, use Ctrl + F5 to clean cache.
* Try to add new external libraries (npm modules) to vendor libs list (`entry.list`) and do `npm run build:vendor-libs`

RESOURCES
---
* [Configuration utility for Angular](https://github.com/ngx-config/core)
* [An Angular 2 module for mocking components](https://github.com/cnunciato/ng2-mock-component)
* [Angular X spy object (mock, stub) helper](https://github.com/unlight/spy-object)
* [Simple, fluent Http mocking for Angular 2](https://github.com/CodeSequence/respond-ng)
* [Simple testing patterns for Angular version 2+](https://github.com/juristr/angular-testing-recipes)
* [A curated list of awesome Angular 2 and Angular 4 resources](https://github.com/AngularClass/awesome-angular)
* [Catalog of Angular 2+ Components & Libraries](https://github.com/brillout/awesome-angular-components)
* [The internationalization (i18n) library for Angular 2+](https://github.com/ngx-translate/core)
* [Open modal window (dialog box) for your angular2 applications using bootstrap3](https://github.com/pleerock/ngx-modal)
* [Angular toastr ngx-toastr (formerly toastr-ng2)](https://github.com/scttcper/ngx-toastr)
* [Simple popover control for your angular2 applications using bootstrap3. Does not depend of jquery.](https://github.com/pleerock/ngx-popover)
* [Simple dropdown for your angular2 applications using bootstrap3.](https://github.com/pleerock/ngx-dropdown)
* [A set of modules that could be helpful for Angular application development.](https://github.com/Barryrowe/ngx-dev-utils)
* [Simple tooltip control for your angular2 applications using bootstrap3. Does not depend of jquery.](https://github.com/pleerock/ngx-tooltip)
* [Simple tabs control for your angular2 applications using bootstrap3](https://github.com/pleerock/ngx-tabs)
* [Simple pagination control for your angular2 applications using bootstrap3](https://github.com/pleerock/ngx-paginator)
* [Angular directives for displaying validation messages similar to these from AngularJs](https://github.com/DmitryEfimenko/ngx-messages)
* [A declarative validation errors module for reactive forms](https://github.com/UltimateAngular/ngxerrors)
* [Implementation of Angular 1.x $cookies service to Angular 2](https://github.com/salemdar/ngx-cookie)
* [An Angular component for a customizable date and time picker](https://github.com/RenovoSolutions/ngx-datetimepicker)
* [Angular 2+ (ngx) ng2 truncate module from Directive, Pipe and Service](https://github.com/doorgets/ng-truncate)
* [MapleSyrupGroup ngx-flash-messages](https://github.com/MapleSyrupGroup/ngx-flash-messages)
* [Angular2 + form validators](https://github.com/ReactiveCore-com/ngx-validation)
* [Angular X (2+) Async external scripts loading](https://github.com/zenkkor/ngx-asyncscripts)
* [Show busy/loading indicators on any promise, or on any Observable's subscription](https://github.com/devyumao/angular2-busy)
* [Component event delegation](https://gist.github.com/matthieu-D/c56ce33e844b1f6e6d692149c31bb83b)
* [Limitations with AoT](https://github.com/UltimateAngular/aot-loader/wiki/Limitations-with-AoT)
* [AoT Do's and Don'ts](https://github.com/rangle/angular-2-aot-sandbox#aot-dos-and-donts)
* [5 Rookie Mistakes to Avoid with Angular 2](http://angularjs.blogspot.ru/2016/04/5-rookie-mistakes-to-avoid-with-angular.html)
* [A reusable chart library for d3.js](https://github.com/nvd3-community/nvd3)
* [A Comprehensive Introduction to @ngrx/store](https://gist.github.com/btroncone/a6e4347326749f938510)
* [Class decorator that will automatically unsubscribe from observables and events](https://github.com/NetanelBasal/ngx-auto-unsubscribe)
* [Observable-based virtual scroll implementation in Angular](https://github.com/dinony/od-virtualscroll)
* [Angular Update Guide](https://angular-update-guide.firebaseapp.com/)
* [Intrinsic first flexbox grid](https://github.com/argyleink/ragrid)
* [Fast JiT compiler for Angular testing](https://github.com/Quramy/ngx-zombie-compiler)
* [A loading spinner for Angular 4](https://github.com/Zak-C/ngx-loading)
* [Singleton service for lazy loaded modules](https://github.com/manfredsteyer/lazy-loading-ng-conf/blob/master/src/app/auth/auth.module.ts#L16-L26)

KNOWN ISSUES
---
* Cannot use component css tostring with aot https://github.com/UltimateAngular/aot-loader/issues/12
  (workaround disable sourcemaps)
* Stryker: webpack cannot load plugins https://github.com/stryker-mutator/stryker-karma-runner/issues/20

TODO
---
* try https://prepack.io/
* https://github.com/unlight/angular-webpack-seed/issues
* ngrx redux example
  - https://github.com/CodeSequence/ngrx-workshop


DEBUG
---
```
inspect node_modules/webpack-dev-server/bin/webpack-dev-server
inspect --debug-exception node_modules/webpack/bin/webpack.js --env.prod --display-modules
inspect --debug-exception node_modules/webpack/bin/webpack.js
```
