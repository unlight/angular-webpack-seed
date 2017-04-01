import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {

    constructor() {
        super(true);
    }

    handleError(err: any) {
        throw err;
    }
}
