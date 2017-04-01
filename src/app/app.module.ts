import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
];

class AppErrorHandler extends ErrorHandler {

    constructor() {
        super(true);
    }

    handleError(err: any) {
        throw err;
    }
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ErrorHandler, useClass: AppErrorHandler },
    ]
})
export class AppModule { }
