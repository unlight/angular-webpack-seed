import { Component, Inject } from '@angular/core';
import { ModalOptions, OPTIONS } from './constants';

@Component({
    selector: 'modal-content',
    template: `<main [class]="options.contentClass">
        <ng-content></ng-content>
    </main>`
})
export class ModalContentComponent {

    private readonly options: ModalOptions

    constructor(
        @Inject(OPTIONS) options: ModalOptions,
    ) {
        this.options = options;
    }
}
