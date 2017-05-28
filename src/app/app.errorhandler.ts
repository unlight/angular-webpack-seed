import { ErrorHandler, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../modules/ngx-error-handler';

export class AppErrorHandler extends ErrorHandler {

    errorHandlerService: any;

    constructor(
        @Inject(Injector) private injector: Injector,
    ) {
        super();
        this.errorHandlerService = new ErrorHandlerService();
    }

    private get router(): Router {
        return this.injector.get(Router);
    }

    // private get errorHandlerService() {
    //     return this.injector.get(ErrorHandlerService);
    // }

    /**
     * We can show toasted message here.
     * @param {any} err
     */
    handleError(err: any) { // eslint-disable-line
        console.error(err); // eslint-disable-line
        this.errorHandlerService.handleError(err);
    }
}
