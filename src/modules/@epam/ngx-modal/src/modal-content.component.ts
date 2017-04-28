import { Component, Input, Inject } from '@angular/core';
import { ModalOptions, OPTIONS } from './constants';

@Component({
    selector: 'modal-content',
    template: `<main [class]="options.contentClass">
        <ng-content></ng-content>
    </main>`
})
export class ModalContentComponent {

    constructor(
        @Inject(OPTIONS) private readonly options: ModalOptions,
    ) { }
}
