import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { MODULE_ROUTES } from './welcome.routes';

@NgModule({
    imports: [
        MODULE_ROUTES,
    ],
    declarations: [
        WelcomeComponent,
    ],
})
export class WelcomeModule { }
