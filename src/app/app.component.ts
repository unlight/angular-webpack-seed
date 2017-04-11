import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app',
    template: `
    <div>
        <a [routerLink]="['/']">Home</a>
        <a [routerLink]="['welcome']">Welcome</a>
    </div>
    <router-outlet></router-outlet>`,
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    title = 'App';

    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
