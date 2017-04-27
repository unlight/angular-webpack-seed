import { ModalComponent } from '@epam/ngx-modal';
import { ViewChild, Component } from '@angular/core';

@Component({
    template: `
<modal>
    <modal-header [title]="'Example Title'"></modal-header>
    <modal-content>
        Example Modal Content
    </modal-content>
</modal>
    `
})
export class ExampleModalComponent {

    @ViewChild(ModalComponent) private modal: ModalComponent;

}
