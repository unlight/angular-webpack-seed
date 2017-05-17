import { Component } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`,
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    title = 'App';

    constructor(
        configService: ConfigService,
        translate: TranslateService,
    ) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
