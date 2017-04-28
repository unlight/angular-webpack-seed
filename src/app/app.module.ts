import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { APP_PROVIDERS } from './app.providers';
import { ConfigStaticLoader, ConfigLoader, ConfigModule } from '@ngx-config/core';
import { routes } from './app.routes';

import config = require('./app.config');

export function configFactory(): ConfigLoader {
    return new ConfigStaticLoader(config);
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routes,
        ConfigModule.forRoot({ provide: ConfigLoader, useFactory: configFactory })
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
    ],
    bootstrap: [AppComponent],
    providers: APP_PROVIDERS
})
export class AppModule { }
