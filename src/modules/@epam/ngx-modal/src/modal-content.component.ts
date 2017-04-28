import { Component, Input } from '@angular/core';

@Component({
    selector: 'modal-content',
    template: `
    <main [class]="className">
        <ng-content></ng-content>
    </main>
    `
})
export class ModalContentComponent {

    @Input() className = 'ngx-modal-content';
}
