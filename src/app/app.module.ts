import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { APP_PROVIDERS } from './app.providers';
import { ConfigStaticLoader, ConfigLoader, ConfigModule } from '@ngx-config/core';
import { APP_ROUTES } from './app.routes';
import { ModalModule } from '@epam/ngx-modal';
import { ExampleModalComponent } from '@epam/ngx-modal/example/example-modal.component';

export function configFactory(): ConfigLoader {
    const config = require('./app.config'); // eslint-disable-line import/max-dependencies
    return new ConfigStaticLoader(config);
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot(),
        APP_ROUTES,
        ConfigModule.forRoot({ provide: ConfigLoader, useFactory: configFactory })
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        ExampleModalComponent,
    ],
    bootstrap: [AppComponent],
    providers: APP_PROVIDERS
})
export class AppModule { }
