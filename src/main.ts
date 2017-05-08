require('core-js/modules/es6.object.assign');
// require('core-js/es6');
require('core-js/es7/reflect');
require('core-js/es7/array');

// require('zone.js/dist/zone');

require('./app.scss');

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, NgModule, ApplicationRef } from '@angular/core';
import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
    // enableProdMode();
    // platformBrowserDynamic().bootstrapModule(AppModule);
} else {

    const { removeNgStyles, createNewHosts, bootloader } = require('@angularclass/hmr') as any;
    const { AppComponent } = require('./app/app.component') as any;

    @NgModule({
        imports: [AppModule],
        bootstrap: [AppComponent]
    })
    class MainModule {

        constructor(
            private readonly appRef: ApplicationRef
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

    const sixflix = require('sixflix');
    debugger;
    if (!sixflix() || !Object.assign) {
        console.log('No support es6');
        // import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
        require.ensure([], () => {
            require('core-js/es6');
            require('zone.js/dist/zone');
            const {platformBrowserDynamic} = require('@angular/platform-browser-dynamic');
            platformBrowserDynamic().bootstrapModule(MainModule);
        });
    } else {
        console.log('support es6');
        const {platformBrowserDynamic} = require('@angular/platform-browser-dynamic');
        platformBrowserDynamic().bootstrapModule(MainModule);
    }

    // Boot on document ready.
    // bootloader(() => {
    //     return platformBrowserDynamic().bootstrapModule(MainModule);
    // });
}
