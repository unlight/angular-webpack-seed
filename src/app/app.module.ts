import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { TranslationModule } from './translation.module';
import { APP_PROVIDERS } from './app.providers';
import { ConfigStaticLoader, ConfigLoader, ConfigModule } from '@ngx-config/core';
import { APP_ROUTES } from './app.routes';

export function configFactory(): ConfigLoader {
    const config = require('./app.config');
    return new ConfigStaticLoader(config);
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        APP_ROUTES,
        ConfigModule.forRoot({ provide: ConfigLoader, useFactory: configFactory }),
		TranslationModule,
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
