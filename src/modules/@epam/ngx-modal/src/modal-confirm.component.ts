import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'modal-confirm',
    template: `<modal (onOpen)="onOpen()" (onClose)="onClose()">
    <modal-header [title]="title"></modal-header>
    <modal-content>
        <div [innerHTML]="content"></div>
    </modal-content>
    <modal-footer>
        <div class="es-toolbar">
            <button id="modal-confirm-ok" type="button" class="es-button -es-primary -es-right"
                (click)="ok()">Okay</button>
            <button id="modal-confirm-cancel" type="button" class="es-button -es-right"
                (click)="cancel()" #confirmCancel>Cancel</button>
        </div>
    </modal-footer>
</modal>`
})
export class ModalConfirmComponent {

    @Input() title: string;
    @Input() studyName: string;
    @Input() content: string;
    result: Subject<boolean> = new Subject<boolean>();
    @ViewChild(ModalComponent) private modal: ModalComponent;
    @ViewChild('confirmCancel') private confirmCancel: ElementRef;

    open() {
        this.result.next(false);
        if (this.modal) {
            this.modal.open();
        }
    }

    get isOpen() {
        return this.modal.isOpen;
    }

    get okay() {
        return this.result.asObservable()
            .filter(value => value)
            .take(1);
    }

    close() {
        if (this.modal) {
            this.modal.close();
        }
    }

    private onClose() {

    }

    private ok() {
        this.result.next(true);
        this.close();
    }

    private cancel() {
        this.result.next(false);
        this.close();
    }

    private onOpen() {
        setTimeout(() => {
            const element = this.confirmCancel.nativeElement;
            element && element.focus && element.focus();
        });
    }
}
