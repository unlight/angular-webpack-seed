import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories.
export function createTranslateLoader(http: Http): TranslateHttpLoader {
    return new TranslateHttpLoader(http, 'i18n/', '.json');
}

export const APP_TRANSLATION = TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
    }
});
