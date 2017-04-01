import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppErrorHandler } from './app.errorhandler';
import { AboutComponent } from './about/about.component';
import { AboutModule } from './about/about.module';

const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent
        // loadChildren: () => {
        //     return new Promise((resolve, reject) => {
        //         FuseBox.import('./about.module.js', () => {
        //             const { AboutModule } = FuseBox.import('./app/about/about.module');
        //             resolve(AboutModule);
        //         });
        //     });
        // }
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AboutModule,
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
