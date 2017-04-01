import 'core-js/es6';
import 'core-js/es7';
import 'zone.js/dist/zone';
import './style.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, NgModule, ApplicationRef } from '@angular/core';
import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
    platformBrowserDynamic().bootstrapModule(AppModule);
} else {

    const { removeNgStyles, createNewHosts, bootloader } = require('@angularclass/hmr');
    const { AppComponent } = require('./app/app.component');

    @NgModule({
        imports: [AppModule],
        bootstrap: [AppComponent]
    })
    class MainModule {

        constructor(
            private readonly appRef: ApplicationRef
        ) { }

        hmrOnInit(store) {
            // https://github.com/angularclass/angular2-hmr
        }

        hmrOnDestroy(store) {
            var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
            store.disposeOldHosts = createNewHosts(cmpLocation)
            removeNgStyles();
        }

        hmrAfterDestroy(store) {
            store.disposeOldHosts()
            delete store.disposeOldHosts;
        }
    }
    // Boot on document ready.
    bootloader(function main() {
        return platformBrowserDynamic().bootstrapModule(MainModule);
    });

    // if (module.hot) {
    //     module.hot.accept(err => {
    //         debugger;
    //     });
    // }
}
