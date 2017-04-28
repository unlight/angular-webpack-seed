import { ModalComponent } from '@epam/ngx-modal';
import { ViewChild, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
<modal (onClose)="onClose()">
    <modal-header [title]="'Example Title'"></modal-header>
    <modal-content>
        Example Modal Content
    </modal-content>
</modal>
    `
})
export class ExampleModalComponent {

    @ViewChild(ModalComponent) private modal: ModalComponent;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        this.modal.open();
    }

    onClose() {
        this.router.navigate([{ outlets: { modal: null } }]);
    }
}
