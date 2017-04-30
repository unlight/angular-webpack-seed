import { Component, Input, Inject, EventEmitter } from '@angular/core';
import { ModalOptions, OPTIONS } from './constants';

@Component({
    selector: 'modal-header',
    template: `<header [class]="options.headerClass">
        <button (click)="closeEventEmitter.next($event)"
            [class]="options.buttonCloseClass"
            [innerHTML]="options.buttonCloseContent"></button>
        <h1>{{title}}</h1>
        <ng-content></ng-content>
    </header>`
})
export class ModalHeaderComponent {

    @Input() public title: string;
    public closeEventEmitter: EventEmitter<any> = new EventEmitter();
    private readonly options: ModalOptions

    constructor(
        @Inject(OPTIONS) options: ModalOptions,
    ) {
        this.options = options;
    }
}
