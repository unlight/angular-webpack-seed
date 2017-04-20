angular-webpack-seed
====================
This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###
* Quick summary
* Version

### How do I get set up? ###
* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###
* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###
* Repo owner or admin
* Other community or team contact

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
* Fastest typescript compilation (because of transpileOnly)
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
| Task                        | Description                                                            |
|:----------------------------|:-----------------------------------------------------------------------|
| `npm run start`             | Prepare and start local dev server                                     |
| `npm run build:vendors`     | Prepare 3rd party libraries for application                            |
| `npm run server`            | Local dev server                                                       |
| `npm run server:dashboard`  | Local dev server in dashboard mode                                     |
| `npm run clean`             | Clean generated folders                                                |
| `npm run eslint`            | Lint code (single run mode)                                            |
| `npm run gulp eslint:watch` | ESLint in watch mode                                                   |
| `npm run t`                 | Run unit testing in single run mode                                    |
| `npm run tests:w`           | Run unit testing in watch mode                                         |
| `npm run up`                | Update all dependencies one by one running tests after each            |
| `npm run tschk`             | Run typescript compile but do not emit files (useful for typechecking) |
| `npm run tschk:w`           | tschk in watch mode                                                    |
| `npm run build`             | Build application, but not dependencies                                |
| `npm run build:vendors`     | Prepare dependencies for linking                                       |
| `npm run build:all`         | Sequence of build:vendors > build                                      |
| `npm run coverage`          | Run test coverage with verbose reporing                                |
| `npm run coverage:debug`    | Run coverage task in debug mode                                        |
| `npm run p`                 | Run tasks in parallel                                                   |


DEVELOPMENT TIPS
---
* Do not disable cache in devtools (network tab): this improves speed significantly, use Ctrl + F5 to clean cache.
* Try to add new external libraries (npm modules) to vendor libs list (`entry.list`) and do `npm run build:vendor-libs`

RESOURCES
---
* [Configuration utility for Angular](https://github.com/unlight/ngx-config)
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

KNOWN ISSUES
---
* Cannpt use component css tostring with aot https://github.com/UltimateAngular/aot-loader/issues/12
  (workaround disable sourcemaps)

TODO
---
* stryker: dll plugin
* gulp script copy *.sass *.html to build/source, or maybe compile by gulp-typescript
* https://github.com/unlight/angular-webpack-seed/issues
* ngrx redux example
* husky scripts

DEBUG
---
```
inspect node_modules/webpack-dev-server/bin/webpack-dev-server
inspect --debug-exception node_modules/webpack/bin/webpack.js --env.prod --display-modules
inspect --debug-exception node_modules/webpack/bin/webpack.js
```
