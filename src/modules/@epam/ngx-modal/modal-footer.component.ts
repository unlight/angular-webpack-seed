import { Component, Input } from '@angular/core';

@Component({
    selector: 'modal-footer',
    template: `
    <footer [class]="className">
        <ng-content></ng-content>
    </footer>
  `
})
export class ModalFooterComponent {

    @Input() className = '';
}
