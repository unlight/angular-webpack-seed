import { Component, Input, Inject } from '@angular/core';
import { ModalOptions, OPTIONS } from './constants';

@Component({
    selector: 'modal-header',
    template: `<header [class]="options.headerClass">
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
