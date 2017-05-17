import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { APP_PROVIDERS, APP_CONFIG, APP_TRANSLATION } from './app.providers';
import { APP_ROUTES } from './app.routes';
import { HomeModule } from './home/home.module';
import { WelcomeModule } from './welcome/welcome.module';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        APP_ROUTES,
        HomeModule,
        WelcomeModule,
		HttpModule,
        APP_CONFIG,
        APP_TRANSLATION,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    providers: APP_PROVIDERS
})
export class AppModule { }
