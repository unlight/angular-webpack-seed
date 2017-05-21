/* eslint-disable import/max-dependencies */
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigStaticLoader, ConfigLoader, ConfigModule } from '@ngx-config/core';
import { AppErrorHandler } from './app.errorhandler';

export const APP_PROVIDERS = [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useClass: AppErrorHandler },
];

export const APP_TRANSLATION = TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
    }
});

// AoT requires an exported function for factories.
export function createTranslateLoader(http: Http): TranslateHttpLoader {
    return new TranslateHttpLoader(http, 'i18n/', '.json');
}

export const APP_CONFIG = ConfigModule.forRoot({ provide: ConfigLoader, useFactory: configFactory });

export function configFactory(): ConfigLoader {
    const config = require('./app.config');
    return new ConfigStaticLoader(config);
}
