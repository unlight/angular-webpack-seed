/// <reference path="typings.d.ts" />
require('core-js/es6');
require('core-js/es7');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/proxy.js');
require('zone.js/dist/sync-test.js');
require('zone.js/dist/jasmine-patch.js');
require('zone.js/dist/async-test.js');
require('zone.js/dist/fake-async-test.js');
require('rxjs/Rx');

import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

const requireContext = require.context('./', true, /\.spec\.ts$/);
requireContext.keys().forEach(id => {
    requireContext(id);
});
