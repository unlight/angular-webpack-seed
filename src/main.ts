require('core-js/es6');
require('core-js/es7/reflect');
require('core-js/es7/array');
require('zone.js/dist/zone');

require('./app.scss');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, NgModule, ApplicationRef } from '@angular/core';
import { AppModule } from './app/app.module';

/// #if prod
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
/// #else
import { removeNgStyles, createNewHosts, bootloader } from '@angularclass/hmr';
import { AppComponent } from './app/app.component';

@NgModule({
    imports: [AppModule],
    bootstrap: [AppComponent]
})
class MainModule {

    constructor(
        private readonly appRef: ApplicationRef,
    ) { }

    hmrOnInit(store: any) { // eslint-disable-line class-methods-use-this
        // https://github.com/angularclass/angular2-hmr
    }

    hmrOnDestroy(store: any) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        removeNgStyles();
    }

    hmrAfterDestroy(store: any) { // eslint-disable-line class-methods-use-this
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
// Boot on document ready.
bootloader(() => {
    return platformBrowserDynamic().bootstrapModule(MainModule);
});
/// #endif
