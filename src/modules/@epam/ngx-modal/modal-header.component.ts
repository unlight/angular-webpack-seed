import { Component, Input } from '@angular/core';

@Component({
    selector: 'modal-header',
    template: `
    <header class="ngx-modal-header">
        <!-- <button class="es-icon es-icon-close es-close"></button> TODO: close icon -->
        <h1>{{title}}</h1>
        <ng-content></ng-content>
    </header>
    `
})
export class ModalHeaderComponent {

    @Input() public title: string;
    @Input() public moduleId: string;
}


