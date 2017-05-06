import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { APP_PROVIDERS } from './app.providers';
import { ConfigStaticLoader, ConfigLoader, ConfigModule } from '@ngx-config/core';
import { APP_ROUTES } from './app.routes';
import { HomeModule } from './home/home.module';
import { WelcomeModule } from './welcome/welcome.module';
import { APP_TRANSLATION } from './app.translation';
import { HttpModule } from '@angular/http';

export function configFactory(): ConfigLoader {
    const config = require('./app.config');
    return new ConfigStaticLoader(config);
}

@NgModule({
    imports: [
        BrowserModule,
        APP_ROUTES,
        ConfigModule.forRoot({ provide: ConfigLoader, useFactory: configFactory }),
        HomeModule,
        WelcomeModule,
        APP_TRANSLATION,
		HttpModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    providers: APP_PROVIDERS
})
export class AppModule { }
