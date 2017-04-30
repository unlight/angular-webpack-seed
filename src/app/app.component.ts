import { Component, ViewChild } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { ModalConfirmComponent } from '@epam/ngx-modal';

@Component({
    selector: 'app',
    template: `
    <a [routerLink]="['.', { outlets: { 'modal': 'x3'} }]">Modal</a>
    <a (click)="openConfirm()">Confirm</a>
    <modal-confirm #confirm
        title="Confirmation"
        content="Are you are sure?"></modal-confirm>
    <hr/>
    <router-outlet></router-outlet>
<router-outlet name="modal"></router-outlet>
    `,
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    title = 'App';
    @ViewChild(ModalConfirmComponent) private confirm: ModalConfirmComponent;

    constructor(
        configService: ConfigService,
    ) {
    }

    private openConfirm() {
        this.confirm.open();
    }
}
