import { ErrorHandler, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';

export class AppErrorHandler extends ErrorHandler {

    constructor(
        @Inject(Injector) private injector: Injector
    ) {
        super();
    }

    private get router(): Router {
        return this.injector.get(Router);
    }

    /**
     * We can show toasted message here.
     * @param {any} err
     */
    handleError(err: any) { // eslint-disable-line
        console.error(err); // eslint-disable-line
    }
}
