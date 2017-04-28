import { Component, Inject } from '@angular/core';
import { OPTIONS, ModalOptions } from './constants';

@Component({
    selector: 'modal-footer',
    template: `<footer [class]="options.footerClass">
        <ng-content></ng-content>
    </footer>`
})
export class ModalFooterComponent {

    private readonly options: ModalOptions

    constructor(
        @Inject(OPTIONS) options: ModalOptions,
    ) {
        this.options = options;
    }
}
