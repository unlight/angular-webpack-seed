import { ModalComponent } from '@epam/ngx-modal';
import { ViewChild, Component } from '@angular/core';

@Component({
    template: `
<modal (onClose)="onClose()" isOpen="true">
    <modal-header [title]="'Heading'"></modal-header>
    <modal-content>
        Example Modal Content
        <a href="#">Link</a>
    </modal-content>
</modal>
    `
})
export class ExampleModalComponent {

    @ViewChild(ModalComponent) private modal: ModalComponent;

    constructor(
    ) {
    }

    onClose() {
        (this.modal.isOpen);
    }
}
