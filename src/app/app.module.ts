import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppErrorHandler } from './app.errorhandler';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from '@epam/ngx-modal';
import { ExampleModalComponent } from '@epam/ngx-modal/example/example-modal.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'feature', loadChildren: './feature/feature.module#FeatureModule' },
    { path: ':code', outlet: 'modal', component: ExampleModalComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        ModalModule
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ErrorHandler, useClass: AppErrorHandler },
    ]
})
export class AppModule { }
