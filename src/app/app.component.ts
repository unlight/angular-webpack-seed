import { Component, ViewChild } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { ModalConfirmComponent } from '@epam/ngx-modal';

@Component({
    selector: 'app',
    template: `
    <a [routerLink]="['.', { outlets: { 'modal': 'x3'} }]">Modal</a> |
    <a [routerLink]="['.', { outlets: { 'modal': ''} }]">Modal 2</a> |
    <a (click)="openConfirm()">Confirm</a> |
    <modal-confirm #confirm
        title="Confirmation"
        okayLabel="OK"
        cancelLabel="CANCEL"
        content="Are you are sure?"></modal-confirm>
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

    protected openConfirm() {
        this.confirm.open();
        this.confirm.okay.subscribe(() => {
            console.log('Okay...'); // eslint-disable-line no-console
        });
    }
}
