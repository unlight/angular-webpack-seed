import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {

    constructor() {
        super(true);
    }

    handleError(err: any) { // eslint-disable-line
        console.error(err); // eslint-disable-line
    }
}
