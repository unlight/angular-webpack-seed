import { Component } from '@angular/core';
import { ConfigService } from '@ngx-config/core';

@Component({
    selector: 'app',
    template: `
    <a [routerLink]="['.', { outlets: { 'modal': '33'} }]">Modal</a>
    <router-outlet></router-outlet>
<router-outlet name="modal"></router-outlet>
    `,
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    title = 'App';

    constructor(
        configService: ConfigService,
    ) {
    }
}
