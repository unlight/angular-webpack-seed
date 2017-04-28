import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './app.errorhandler';

export const APP_PROVIDERS = [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useClass: AppErrorHandler },
];
