import { Input, Output, Component, ElementRef, EventEmitter, Inject, OnDestroy, Renderer, ViewChild } from '@angular/core';
import { contains } from './functions';
import { DOCUMENT } from '@angular/platform-browser';
import { focusableSelector, modalIsOpenClass } from './constants';

// TODO: Fix
// require('ngx-modal.css');

@Component({
    exportAs: 'modal',
    selector: 'modal',
    template: `
		<div class="ngx-modal-popup" [ngClass]="ngClassValues" >
            <section class="ngx-modal-popup-body" #body>
                <ng-content></ng-content>
            </section>
        </div>
  `
})
export class ModalComponent implements OnDestroy {

    @Input() public title: string; // unused
    @Input() public isOpen: boolean;
    @Input() public isNotification: boolean;
    public content: string; // unused
    @Output() public onClose: EventEmitter<any> = new EventEmitter();
    @Output() public onOpen: EventEmitter<any> = new EventEmitter();
    private removeOnKeyDown: Function;
    private removeOnClick: Function;
    @ViewChild('body') private body: ElementRef;

    // TODO: Fix
    get ngClassValues() {
        return { 'ngx-modal-open': this.isOpen, '-es-notification': this.isNotification };
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer, // TODO: Replace by Renderer2
        private el: ElementRef,
    ) {
    }

    close(event?: any): void {
        this.cleanUp();
        this.onClose.emit(event);
        this.isOpen = false;
    }

    open(event?: any): void {
        this.onOpen.emit(event);
        this.isOpen = true;
        this.doOnOpen();
    }

    ngOnDestroy() {
        this.cleanUp();
    }

    // Let tab navigation cycle in the popup body.
    private onTabKeyDown = (e: KeyboardEvent) => {
        if (!this.isOpen) {
            return;
        }
        let focusChanged = false;
        const focusable = <HTMLElement[]>[].slice.call(this.body.nativeElement.querySelectorAll(focusableSelector));
        const isFocusInFirst = (): boolean => {
            return !!(focusable && focusable.length && (e.target || e.srcElement) === focusable[0]);
        };
        const isFocusInLast = (): boolean => {
            return !!(focusable && focusable.length && (e.target || e.srcElement) === focusable[focusable.length - 1]);
        };
        const isFocusOutside = (): boolean => {
            return !(contains(this.body.nativeElement, <Node>(e.target || e.srcElement)));
        };
        const focusFirst = () => {
            if (focusable && focusable.length > 0) {
                focusable[0].focus(); // todo: use renderer2 for focus
                return true;
            }
            return false;
        };
        const focusLast = (): boolean => {
            if (focusable && focusable.length) {
                focusable[focusable.length - 1].focus();
                return true;
            }
            return false;
        };
        if (e.shiftKey) {
            if (isFocusOutside() || isFocusInFirst()) {
                focusChanged = focusLast();
            }
        } else {
            if (isFocusOutside() || isFocusInLast()) {
                focusChanged = focusFirst();
            }
        }
        if (focusChanged) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    private doOnOpen() {
        setTimeout(() => {
            this.renderer.invokeElementMethod(this.body.nativeElement, 'focus');
        });
        this.preventBackgroundScrolling();
        this.removeOnClick = this.renderer.listen(this.el.nativeElement, 'click', (e: MouseEvent) => {
            if (this.isOpen) {
                //overlay = this.el.nativeElement.querySelector('.es-popup'),
                const close = this.body.nativeElement.querySelector('.es-close');
                //if overlay or close button clicked
                /*(overlay && e.target === overlay) ||*/
                if (contains(close, <Element>e.target)) {
                    this.close(e);
                }
            }
        });
        this.removeOnKeyDown = this.renderer.listenGlobal('document', 'keydown', (e: KeyboardEvent) => {
            if (e.key) {
                switch (e.key) {
                    case 'Esc':
                    case 'Escape':
                        this.close(e);
                        break;
                    case 'Tab':
                        this.onTabKeyDown(e);
                        break;
                }
            }
        });
    }

    private cleanUp() {
        if (this.isOpen) {
            this.enableBackgroundScrolling();
            this.removeOnKeyDown();
            this.removeOnClick();
        }
    }

    private enableBackgroundScrolling() {
        this.backgroundScrolling(true);
    }

    private preventBackgroundScrolling() {
        this.backgroundScrolling(false);
    }

    private backgroundScrolling(value: boolean) {
        const body = this.document.querySelector('body');
        if (body) {
            this.renderer.setElementClass(body, modalIsOpenClass, !value);
        }
    }
}
