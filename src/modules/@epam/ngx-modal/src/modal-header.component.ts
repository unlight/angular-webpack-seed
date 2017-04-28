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

    constructor(
        @Inject(OPTIONS) private readonly options: ModalOptions,
    ) { }
}
