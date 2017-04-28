import { Component } from '@angular/core';
import { ConfigService } from '@ngx-config/core';

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`,
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    title = 'App';

    constructor(
        configService: ConfigService,
    ) {
    }
}
