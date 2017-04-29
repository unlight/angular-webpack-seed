import { Component, Input, Inject, EventEmitter } from '@angular/core';
import { ModalOptions, OPTIONS } from './constants';

@Component({
    selector: 'modal-header',
    template: `<header [class]="options.headerClass">
        <button [class]="options.headerCloseClass" [innerHTML]="options.headerCloseContent"></button>
        <h1>{{title}}</h1>
        <ng-content></ng-content>
    </header>`
})
export class ModalHeaderComponent {

    @Input() public title: string;
    private readonly options: ModalOptions

    constructor(
        @Inject(OPTIONS) options: ModalOptions,
    ) {
        this.options = options;
    }

}
