import { Component, Input, Inject } from '@angular/core';
import { OPTIONS, ModalOptions } from './constants';

@Component({
    selector: 'modal-footer',
    template: `<footer [class]="options.footerClass">
        <ng-content></ng-content>
    </footer>`
})
export class ModalFooterComponent {

    constructor(
        @Inject(OPTIONS) private readonly options: ModalOptions,
    ) { }
}
